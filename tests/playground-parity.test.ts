import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { getRegistry } from "@/lib/registry";

/**
 * A component must look the same in the studio as it does on its docs page.
 *
 * The two previews come from different files: `components/usage/…usage.tsx`
 * renders the docs demo, `components/playground/…playground.tsx` renders the
 * studio one, and they drifted badly: the harnesses were generated with
 * generic filler while the docs demos showed a notification feed, a
 * testimonial deck, a dock of real icons.
 *
 * Comparing rendered output would mean mounting thirty-four animated
 * components in jsdom, several of which need canvas or layout measurement.
 * Comparing the *visible copy* in the two sources catches the same drift for
 * none of that cost: change the words in one demo and forget the other, and
 * this fails.
 */

const ROOT = process.cwd();
const USAGE_DIR = path.join(ROOT, "components", "usage");
const PLAYGROUND_DIR = path.join(ROOT, "components", "playground");
const SHARED = path.join(PLAYGROUND_DIR, "demo-content.tsx");

/** Attribute values, imports and expressions are not user-visible copy. */
function stripNonCopy(source: string): string {
  return (
    source
      .replace(/^import[\s\S]*?from\s+["'][^"']+["'];?$/gm, "")
      .replace(/className=(?:\{[^}]*\}|"[^"]*"|'[^']*')/g, "")
      // `key`, `href`, `aria-*` and friends: attribute text is not copy.
      .replace(/\b[a-zA-Z-]+=(?:"[^"]*"|'[^']*')/g, "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "")
  );
}

/**
 * Human-readable phrases in a source file: JSX text nodes and string literals
 * long enough to be prose rather than a token.
 */
function extractCopy(source: string): Set<string> {
  const cleaned = stripNonCopy(source);
  const found = new Set<string>();

  // JSX text between tags.
  for (const [, text] of cleaned.matchAll(/>([^<>{}]+)</g)) {
    const trimmed = text!.replace(/\s+/g, " ").trim();
    if (trimmed.length >= 5 && /[a-z]{3}/i.test(trimmed)) found.add(trimmed);
  }

  // String literals, for data arrays like the marquee logos.
  for (const [, text] of cleaned.matchAll(/["']([^"'\n]{5,})["']/g)) {
    const trimmed = text!.replace(/\s+/g, " ").trim();
    if (/[a-z]{3}/i.test(trimmed) && !trimmed.includes("/")) found.add(trimmed);
  }

  // A hex colour or a CSS length is a prop value, not something the reader
  // reads. Both surfaces are free to differ on them; that is what the
  // controls are for.
  for (const value of [...found]) {
    if (/^#[0-9a-f]{3,8}$/i.test(value)) found.delete(value);
    if (/^-?[\d.]+(px|rem|em|%|s|ms|vh|vw)$/i.test(value)) found.delete(value);
    if (/^(rgba?|hsla?|var|calc)\(/i.test(value)) found.delete(value);
  }

  return found;
}

/**
 * Copy that only exists in the docs demo because it animates through it.
 *
 * A playground cannot both cycle a prop on a timer and let the reader set it:
 * the timer would overwrite whatever they typed a second later. Where the two
 * genuinely cannot agree, the control wins and the difference is written down
 * here rather than quietly tolerated by a looser check.
 */
const EXCEPTIONS: Record<string, { phrases: string[]; why: string }> = {
  "text/split-flap": {
    phrases: ["DEPARTURES", "NOW BOARDING", "ON TIME", "UI BEATS"],
    why: "The docs demo flips through a board of words on an interval. The studio gives `text` a control, so it shows one word and lets the reader change it.",
  },
  "button/ripple-button": {
    phrases: ["Subtle"],
    why: "The docs demo shows a second button to contrast a different rippleColor. That is a control in the studio, so a second button ignoring it would be the only thing on screen not answering the panel.",
  },
  "text/number-ticker": {
    phrases: ["Uptime"],
    why: "The docs demo shows two tickers to contrast decimals and a suffix. Both are controls here, so the studio shows the single instance the panel drives rather than one that ignores it.",
  },
};

const registry = getRegistry();
const shared = fs.existsSync(SHARED) ? fs.readFileSync(SHARED, "utf8") : "";
const sharedCopy = extractCopy(shared);

const pairs = registry
  .filter((entry) => entry.hasPlayground)
  .map((entry) => {
    const usagePath = path.join(
      USAGE_DIR,
      entry.category,
      `${entry.name}.usage.tsx`,
    );
    const harnessPath = path.join(
      PLAYGROUND_DIR,
      entry.category,
      `${entry.name}.playground.tsx`,
    );
    return {
      key: `${entry.category}/${entry.name}`,
      usage: fs.existsSync(usagePath)
        ? fs.readFileSync(usagePath, "utf8")
        : null,
      harness: fs.readFileSync(harnessPath, "utf8"),
    };
  });

describe("studio and docs previews stay in step", () => {
  it("covers every component that has a playground", () => {
    expect(pairs.length).toBeGreaterThan(0);
    expect(pairs.length).toBe(
      registry.filter((entry) => entry.hasPlayground).length,
    );
  });

  it.each(pairs)(
    "$key shows the same copy in both previews",
    ({ key, usage, harness }) => {
      expect(
        usage,
        "component has a playground but no usage example",
      ).not.toBeNull();

      const allowed = new Set(EXCEPTIONS[key]?.phrases ?? []);
      const usageCopy = extractCopy(usage!);
      // The harness may pull shared items out of `demo-content.tsx`, so that
      // module counts as part of what it renders.
      const harnessCopy = new Set([...extractCopy(harness), ...sharedCopy]);

      const missing = [...usageCopy].filter(
        (phrase) => !harnessCopy.has(phrase) && !allowed.has(phrase),
      );

      expect(
        missing,
        `the docs demo shows copy the studio does not:\n  ${missing.join("\n  ")}`,
      ).toEqual([]);
    },
  );

  it("every documented exception is still needed", () => {
    // An exception that no longer corresponds to a real difference is just a
    // hole in the rule, so it has to justify itself on every run.
    for (const [key, { phrases, why }] of Object.entries(EXCEPTIONS)) {
      const pair = pairs.find((candidate) => candidate.key === key);
      expect(
        pair,
        `exception for "${key}" names no such component`,
      ).toBeDefined();
      expect(
        why.length,
        `exception for "${key}" has no reason`,
      ).toBeGreaterThan(20);

      const usageCopy = extractCopy(pair!.usage!);
      const stale = phrases.filter((phrase) => !usageCopy.has(phrase));
      expect(
        stale,
        `these phrases are no longer in the ${key} docs demo, so the exception can go:\n  ${stale.join("\n  ")}`,
      ).toEqual([]);
    }
  });

  it("no harness still uses the retired generic filler", () => {
    // `stage.tsx` held "Supercharge your UI / Drag a control to see this
    // change" and was what made every wrapper component look identical.
    expect(fs.existsSync(path.join(PLAYGROUND_DIR, "stage.tsx"))).toBe(false);

    for (const { key, harness } of pairs) {
      expect(harness, `${key} still imports the generic stage`).not.toContain(
        "playground/stage",
      );
    }
  });
});

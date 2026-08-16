import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const APP = path.join(ROOT, "app");

/**
 * Guards for the two Open Graph failure modes that produce a green build, no
 * warning, and a broken link preview. Both were live in this repo, and neither
 * is caught by typecheck, lint, or `next build`.
 *
 * The comments in the affected `page.tsx` files explain the rule; these tests
 * are what actually enforce it.
 */

/** Every `page.tsx` under `app/`, as repo-relative paths. */
function pageFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "page.tsx") out.push(path.relative(ROOT, full));
    }
  };
  walk(APP);
  return out.sort();
}

/**
 * Whether the source declares an `openGraph` block of its own.
 *
 * Deliberately a source scan rather than an import of the metadata: half these
 * routes export `generateMetadata`, which needs resolved `params` and a request
 * scope to call, and the thing under test is what the file *declares*.
 */
function declaresOpenGraph(source: string): boolean {
  return /^\s*openGraph:\s*\{/m.test(source);
}

/** Whether the source sets `images` inside its metadata. */
function setsImages(source: string): boolean {
  return /^\s*images:\s*\[/m.test(source);
}

describe("open graph cards are not silently suppressed", () => {
  /*
   * Next's own docs claim file-based metadata wins:
   *
   *   "File-based metadata has the higher priority and will override the
   *    `metadata` object and `generateMetadata` function."
   *   next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md
   *
   * On 16.3.0 the reverse is true for `openGraph.images`. `/docs/[category]`
   * and `/blogs/[slug]` both had an `opengraph-image.tsx` generating a card
   * and an explicit `images` in the same segment, and the explicit value won,
   * so six category links and every blog post unfurled with a shared image
   * while their generated cards were built, prerendered, and never served.
   */
  it("never sets openGraph.images in a segment that generates a card", () => {
    const offenders = pageFiles().filter((page) => {
      const sibling = path.join(
        ROOT,
        path.dirname(page),
        "opengraph-image.tsx",
      );
      if (!fs.existsSync(sibling)) return false;
      return setsImages(fs.readFileSync(path.join(ROOT, page), "utf8"));
    });

    expect(
      offenders,
      `these segments have an opengraph-image.tsx that their own openGraph.images overrides:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  /*
   * Declaring `openGraph` in a child replaces the parent's rather than merging
   * into it, so a child that declares one without `images` inherits no image at
   * all. `/motion-studio` and all thirty-odd `/playground` routes shipped link
   * previews with no `og:image` for exactly this reason.
   */
  it("gives every route that declares openGraph an image to use", () => {
    const offenders = pageFiles().filter((page) => {
      const source = fs.readFileSync(path.join(ROOT, page), "utf8");
      if (!declaresOpenGraph(source) || setsImages(source)) return false;
      return !fs.existsSync(
        path.join(ROOT, path.dirname(page), "opengraph-image.tsx"),
      );
    });

    expect(
      offenders,
      `these routes declare openGraph without images and have no opengraph-image.tsx, so they render no og:image:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  /*
   * The root layout is what every route with no card of its own falls back to.
   * It is the one place an `images` entry belongs.
   */
  it("keeps a site-wide fallback image on the root layout", () => {
    const layout = fs.readFileSync(path.join(APP, "layout.tsx"), "utf8");
    expect(declaresOpenGraph(layout)).toBe(true);
    expect(setsImages(layout)).toBe(true);
  });
});

describe("open graph cards stay on brand", () => {
  const cards = (() => {
    const out: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.name === "opengraph-image.tsx")
          out.push(path.relative(ROOT, full));
      }
    };
    walk(APP);
    return out.sort();
  })();

  it("finds the generated cards", () => {
    expect(cards.length).toBeGreaterThan(0);
  });

  /*
   * The cards previously diverged: a static PNG on one route and a hand-rolled
   * dark layout on another, using a placeholder gradient square as a stand-in
   * logo and Tailwind default colours instead of the brand tokens. Routing all
   * of them through `OgCard` is what keeps a shared link recognisable whichever
   * page it points at.
   */
  it("renders every card through the shared OgCard", () => {
    for (const card of cards) {
      const source = fs.readFileSync(path.join(ROOT, card), "utf8");
      expect(source, card).toContain("OgCard");
      expect(source, card).toMatch(/from "@\/lib\/og-card"/);
    }
  });

  it("declares the metadata Next needs on every card", () => {
    for (const card of cards) {
      const source = fs.readFileSync(path.join(ROOT, card), "utf8");
      // Without these the route still renders but the tags lose their
      // dimensions and alt text.
      expect(source, card).toMatch(/export const alt =/);
      expect(source, card).toMatch(/export const size = OG_SIZE/);
      expect(source, card).toMatch(
        /export const contentType = OG_CONTENT_TYPE/,
      );
    }
  });

  /*
   * Satori resolves no CSS variables, so `lib/og.ts` is a hand-copied snapshot
   * of the `globals.css` dark block. A card that hardcodes its own hex is how
   * that snapshot starts drifting.
   */
  it("takes its colours from lib/og rather than inline hex", () => {
    for (const card of cards) {
      const source = fs.readFileSync(path.join(ROOT, card), "utf8");
      const hexes = source.match(/#[0-9a-fA-F]{3,8}\b/g) ?? [];
      expect(hexes, `${card} hardcodes ${hexes.join(", ")}`).toEqual([]);
    }
  });
});

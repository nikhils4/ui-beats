import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import componentConfigs from "@/content/docs";
import {
  getComponent,
  getComponentsByCategory,
  getNewestComponents,
  getRegistry,
  isCategory,
} from "@/lib/registry";
import { deriveControls, resolvePlaygroundConfig } from "@/lib/playground";
import { CATEGORY_ORDER } from "@/config/categories";
import { isRecentlyAdded, parseAddedAt } from "@/config/recency";

const ROOT = process.cwd();

describe("registry integrity", () => {
  const registry = getRegistry();

  it("exposes every documented component", () => {
    expect(registry).toHaveLength(componentConfigs.length);
    expect(registry.length).toBeGreaterThan(0);
  });

  it("has a unique name per component", () => {
    const names = registry.map((entry) => entry.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("only uses known categories", () => {
    for (const entry of registry) {
      expect(isCategory(entry.category)).toBe(true);
    }
  });

  it("resolves real source for every entry", () => {
    for (const entry of registry) {
      expect(entry.source, `${entry.name} source`).not.toBe("");
      expect(entry.usage, `${entry.name} usage`).not.toBe("");
    }
  });

  it("names the config file after the component", () => {
    // Guards the filename/name/category triple that the docs route, the
    // sidebar and the registry all key off.
    for (const entry of registry) {
      const file = path.join(
        ROOT,
        "content",
        "docs",
        entry.category,
        `${entry.name}.content.ts`,
      );
      expect(fs.existsSync(file), `missing ${file}`).toBe(true);
    }
  });

  it("documents at least one prop per component", () => {
    for (const entry of registry) {
      expect(entry.props.length, `${entry.name} has no props`).toBeGreaterThan(
        0,
      );
    }
  });

  /*
   * A control that cannot reach the values its own row documents.
   *
   * `inferRange` guesses a slider's bounds from the prop's name, and a name it
   * does not recognise falls back to a window starting at zero. That is right
   * for almost everything (sizes, counts, durations) and silently wrong for
   * the rare signed prop: Animated Beam's `curvature` is documented as
   * "positive bows up, negative bows down" and the slider stopped at 0, so
   * half the prop was undemonstrable. Nothing failed; the playground just
   * quietly disagreed with the props table beneath it.
   *
   * The description is the only declaration of intent available, which makes
   * this a keyword check rather than a type check. It is enough: the fix is a
   * `ranges` override in the content file, and this says when one is owed.
   */
  it("can reach the negative values a prop documents", () => {
    for (const entry of registry) {
      const config = resolvePlaygroundConfig(entry.name, entry.playground);
      const byProp = new Map(entry.props.map((prop) => [prop.prop, prop]));

      for (const control of deriveControls(entry.props, config)) {
        if (control.kind !== "number") continue;
        if (
          !/\bnegative\b/i.test(byProp.get(control.prop)?.description ?? "")
        ) {
          continue;
        }

        expect(
          control.min,
          `${entry.name}.${control.prop} documents negative values but its slider starts at ${control.min}`,
        ).toBeLessThan(0);
      }
    }
  });

  it("derives dependencies from the component source", () => {
    const flipCard = getComponent("card", "flip-card");
    expect(flipCard).toBeDefined();
    expect(flipCard?.dependencies).toContain("motion");
    // flip-card imports `@/lib/utils`, which maps to the shadcn `utils` item
    // rather than an npm package.
    expect(flipCard?.registryDependencies).toContain("utils");
    expect(flipCard?.dependencies).not.toContain("@/lib/utils");
  });

  it("never lists react as an installable dependency", () => {
    for (const entry of registry) {
      expect(entry.dependencies).not.toContain("react");
      expect(entry.dependencies).not.toContain("react-dom");
    }
  });

  it("builds an href that matches category and name", () => {
    for (const entry of registry) {
      expect(entry.href).toBe(`/docs/${entry.category}/${entry.name}`);
    }
  });

  it("returns undefined for unknown lookups", () => {
    expect(getComponent("card", "does-not-exist")).toBeUndefined();
    expect(getComponent("not-a-category", "flip-card")).toBeUndefined();
  });

  it("sorts components alphabetically within a category", () => {
    for (const category of CATEGORY_ORDER) {
      const titles = getComponentsByCategory(category).map((e) => e.title);
      expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
    }
  });
});

describe("credits", () => {
  it("uses an absolute https url", () => {
    for (const entry of getRegistry()) {
      if (!entry.credits) continue;
      expect(entry.credits.url, entry.name).toMatch(/^https:\/\//);
      expect(entry.credits.name.length, entry.name).toBeGreaterThan(0);
    }
  });

  it("marks tool-written components as tools", () => {
    // Guards against a tool being credited as a person, which would make the
    // page copy and the schema.org author type both wrong.
    for (const entry of getRegistry()) {
      if (entry.credits?.name === "Claude Code") {
        expect(entry.credits.kind, entry.name).toBe("tool");
      }
      if (entry.credits?.kind === "tool") {
        expect(entry.credits.url).toMatch(/^https:\/\//);
      }
    }
  });

  it("credits every component that has no human contributor", () => {
    // Every component should say where it came from, one way or another.
    const uncredited = getRegistry()
      .filter((entry) => !entry.credits)
      .map((entry) => entry.name);

    // Components carried over from before attribution was tracked.
    const grandfathered = [
      "smooth-reveal",
      "sparkling-grid",
      "subscribe-button",
      "glowing-card",
      "text-writer",
    ];

    expect(uncredited.sort()).toEqual(grandfathered.sort());
  });
});

describe("component preview map", () => {
  it("has an entry for every registry component", () => {
    // The preview map is the one place a new component still has to be
    // registered by hand; without this test a missing entry only shows up as
    // "No preview available" at runtime.
    const source = fs.readFileSync(
      path.join(ROOT, "components/website/component-preview.tsx"),
      "utf8",
    );

    for (const entry of getRegistry()) {
      expect(
        source.includes(`"${entry.category}/${entry.name}"`),
        `component-preview.tsx is missing "${entry.category}/${entry.name}"`,
      ).toBe(true);
    }
  });
});

describe("added dates", () => {
  it("dates every component", () => {
    for (const entry of getRegistry()) {
      expect(
        parseAddedAt(entry.addedAt),
        `${entry.name} has an unusable addedAt: ${entry.addedAt}`,
      ).not.toBeNull();
    }
  });

  it("never dates a component in the future", () => {
    // A typo in the year is otherwise invisible until it pins itself to the
    // top of the home page forever.
    const now = Date.now();
    for (const entry of getRegistry()) {
      const added = parseAddedAt(entry.addedAt);
      expect(added, entry.name).not.toBeNull();
      expect(
        added!.getTime(),
        `${entry.name} is dated ahead of today`,
      ).toBeLessThanOrEqual(now);
    }
  });

  it("derives isNew from the date rather than a hand-set flag", () => {
    for (const entry of getRegistry()) {
      expect(entry.isNew, entry.name).toBe(isRecentlyAdded(entry.addedAt));
    }
  });

  /*
   * Regression: the home page took the last entry carrying an `isNew` flag,
   * and the registry is ordered by category, so the featured component was
   * whichever flagged component sat last in the text category, which had been
   * Text Shine, added in 2024.
   */
  it("features the genuinely newest component", () => {
    const [newest] = getNewestComponents(1);
    const latest = getRegistry()
      .map((entry) => entry.addedAt)
      .sort()
      .at(-1);

    expect(newest).toBeDefined();
    expect(newest?.addedAt).toBe(latest);
  });

  it("returns the newest components in order", () => {
    const dates = getNewestComponents(5).map((entry) => entry.addedAt);
    expect(dates).toHaveLength(5);
    expect([...dates].sort().reverse()).toEqual(dates);
  });
});

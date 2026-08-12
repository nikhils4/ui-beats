import { describe, expect, it } from "vitest";
import {
  CATEGORY_INTRO,
  categorySeoTitle,
  componentKeywords,
  componentSeoTitle,
} from "@/lib/seo";
import { getRegistry, categoryLabel } from "@/lib/registry";
import { CATEGORY_ORDER } from "@/config/categories";

describe("component page titles", () => {
  /*
   * Regression: pages were titled "Flip Card — UI Beats", competing only for a
   * query nobody types. Meanwhile ui.ibelick.com/text-shine and nine others
   * ranked for "react text shine animation" while ours was absent.
   */
  it("leads with the phrase people actually search", () => {
    const cases: Record<string, string> = {
      "flip-card": "React Flip Card Component",
      "tilt-card": "React Tilt Card Component",
      "text-shine": "React Text Shine Animation",
      "text-writer": "React Text Writer Animation",
      bounce: "React Bounce Animation",
      "stagger-list": "React Stagger List Animation",
      "sparkling-grid": "React Sparkling Grid Background",
      "magnetic-button": "React Magnetic Button",
      "shimmer-effect": "React Shimmer Effect Component",
    };

    for (const entry of getRegistry()) {
      const expected = cases[entry.name];
      if (expected) expect(componentSeoTitle(entry)).toBe(expected);
    }
  });

  it("never repeats the category noun", () => {
    // "Flip Card" + "Card Component" must not become "Flip Card Card Component".
    for (const entry of getRegistry()) {
      const words = componentSeoTitle(entry).toLowerCase().split(" ");
      const duplicated = words.filter((w, i) => words[i + 1] === w);
      expect(duplicated, `${entry.name}: ${words.join(" ")}`).toEqual([]);
    }
  });

  it("starts with React and stays inside Google's title budget", () => {
    for (const entry of getRegistry()) {
      const title = componentSeoTitle(entry);
      expect(title.startsWith("React ")).toBe(true);
      // ~60 chars renders before truncation; the layout appends " — UI Beats".
      expect(`${title} — UI Beats`.length, title).toBeLessThanOrEqual(60);
    }
  });

  it("produces unique titles across the registry", () => {
    const titles = getRegistry().map(componentSeoTitle);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("emits deduped keywords", () => {
    for (const entry of getRegistry()) {
      const keywords = componentKeywords(entry);
      expect(new Set(keywords).size).toBe(keywords.length);
      expect(keywords.length).toBeGreaterThan(5);
    }
  });
});

describe("category landing pages", () => {
  it("titles the plural query without repeating a word", () => {
    for (const category of CATEGORY_ORDER) {
      const title = categorySeoTitle(categoryLabel(category), category);
      const words = title.toLowerCase().split(" ");
      // Guards "React Component Components".
      expect(
        words.filter((w, i) => words[i + 1]?.startsWith(w)).length,
        title,
      ).toBe(0);
      expect(title.startsWith("React ")).toBe(true);
    }
  });

  it("has intro copy for every category", () => {
    for (const category of CATEGORY_ORDER) {
      expect(CATEGORY_INTRO[category]?.length ?? 0).toBeGreaterThan(60);
    }
  });
});

describe("thin content", () => {
  it("gives every component unique when-to-use guidance", () => {
    const registry = getRegistry();
    const guidance = registry.map((e) => e.whenToUse);

    for (const entry of registry) {
      expect(
        entry.whenToUse?.length ?? 0,
        `${entry.name} has no whenToUse`,
      ).toBeGreaterThan(80);
    }
    // Unique, so no two pages carry duplicate prose.
    expect(new Set(guidance).size).toBe(registry.length);
  });

  it("does not repeat the description as guidance", () => {
    for (const entry of getRegistry()) {
      expect(entry.whenToUse).not.toBe(entry.description);
    }
  });
});

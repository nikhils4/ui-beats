import { describe, expect, it } from "vitest";
import { sideNav, firstComponentPath } from "@/config/side-nav";
import { CATEGORY_META, CATEGORY_ORDER } from "@/config/categories";
import { getRegistry } from "@/lib/registry";

describe("side navigation", () => {
  it("leads with Getting Started", () => {
    expect(sideNav[0]?.title).toBe("Getting Started");
  });

  it("lists every documented component exactly once", () => {
    const navPaths = sideNav
      .slice(1)
      .flatMap((section) => section.subItems.map((item) => item.path))
      .sort();
    const registryPaths = getRegistry()
      .map((entry) => entry.href)
      .sort();

    expect(navPaths).toEqual(registryPaths);
  });

  it("has no empty sections", () => {
    for (const section of sideNav) {
      expect(
        section.subItems.length,
        `${section.title} is empty`,
      ).toBeGreaterThan(0);
    }
  });

  /*
   * Regression: every `/docs/<category>` landing page used to redirect by
   * indexing this array with a hardcoded number (`sideNav[1]`, `sideNav[3]`, …)
   * and all six numbers pointed at the wrong section: `/docs/text` landed on
   * an animation page, `/docs/button` on a background. The destination is
   * derived now; this pins it.
   */
  it("resolves each category to a component in that same category", () => {
    for (const category of CATEGORY_ORDER) {
      const target = firstComponentPath(category);
      expect(target, `no landing target for ${category}`).toBeDefined();
      expect(
        target,
        `${category} landing page points outside its category`,
      ).toMatch(new RegExp(`^/docs/${category}/`));
    }
  });

  it("returns undefined for an unknown category", () => {
    expect(firstComponentPath("not-a-category")).toBeUndefined();
    expect(firstComponentPath("getting-started")).toBeUndefined();
  });

  it("labels sections with their category label", () => {
    const labels = sideNav.slice(1).map((s) => s.title);
    const expected = CATEGORY_ORDER.map((c) => CATEGORY_META[c].label);
    expect(labels).toEqual(expected);
  });
});

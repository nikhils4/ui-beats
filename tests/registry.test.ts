import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import componentConfigs from "@/content/docs";
import {
  getComponent,
  getComponentsByCategory,
  getRegistry,
  isCategory,
} from "@/lib/registry";
import { CATEGORY_ORDER } from "@/config/categories";

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

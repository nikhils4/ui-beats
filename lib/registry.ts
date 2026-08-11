import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import componentConfigs from "@/content/docs";
import { CATEGORY_META, CATEGORY_ORDER } from "@/config/categories";
import type {
  ComponentCategory,
  ComponentConfig,
} from "@/types/component-config.type";

const ROOT = process.cwd();
const DEMO_DIR = path.join(ROOT, "components", "demo");
const USAGE_DIR = path.join(ROOT, "components", "usage");

export { CATEGORY_META, CATEGORY_ORDER, isCategory } from "@/config/categories";

export function categoryLabel(category: ComponentCategory): string {
  return CATEGORY_META[category].label;
}

/**
 * Read a file that MUST live inside `baseDir`.
 *
 * The old `/api/file-content` route did `path.join(cwd, "components/demo/", userInput)`
 * and handed the result straight to `readFileSync`, so `?file=../../.env.local`
 * escaped the directory and returned arbitrary server files over HTTP. Source
 * is now read at build time from names that come out of the registry, and this
 * helper re-checks containment so a bad registry entry still cannot escape.
 */
function readContained(baseDir: string, relativePath: string): string | null {
  const resolvedBase = path.resolve(baseDir);
  const target = path.resolve(resolvedBase, relativePath);

  if (target !== resolvedBase && !target.startsWith(resolvedBase + path.sep)) {
    throw new Error(
      `Refusing to read outside ${resolvedBase}: ${relativePath}`,
    );
  }

  try {
    return fs.readFileSync(target, "utf8");
  } catch {
    return null;
  }
}

export interface RegistryEntry extends ComponentConfig {
  /** Route this component is documented at. */
  href: string;
  /** Source of the component itself — what a user copies into their project. */
  source: string;
  /** Source of the runnable example shown in the "Code" tab. */
  usage: string;
  /** npm packages the component imports, derived from its source. */
  dependencies: string[];
  /** shadcn registry items the component depends on (e.g. `utils`). */
  registryDependencies: string[];
  demoPath: string;
  usagePath: string;
}

/** Packages that ship with any React app and never need installing. */
const IMPLICIT_DEPS = new Set(["react", "react-dom", "next"]);

/**
 * Derive the npm dependency list from the component's own import statements
 * instead of maintaining it by hand, where it would silently drift.
 */
function detectDependencies(...sources: string[]): {
  dependencies: string[];
  registryDependencies: string[];
} {
  const dependencies = new Set<string>();
  const registryDependencies = new Set<string>();
  const importRe = /from\s+["']([^"']+)["']/g;

  for (const source of sources) {
    for (const match of source.matchAll(importRe)) {
      const specifier = match[1];
      if (!specifier) continue;

      if (specifier.startsWith("@/lib/utils")) {
        registryDependencies.add("utils");
        continue;
      }
      // Relative imports and other in-repo aliases are inlined by the user.
      if (specifier.startsWith(".") || specifier.startsWith("@/")) continue;

      // Scoped packages keep two segments; bare packages keep one.
      const segments = specifier.split("/");
      const pkg = specifier.startsWith("@")
        ? segments.slice(0, 2).join("/")
        : (segments[0] ?? specifier);

      if (!IMPLICIT_DEPS.has(pkg)) dependencies.add(pkg);
    }
  }

  return {
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
  };
}

/** The full registry: hand-authored config joined with source read off disk. */
export const getRegistry = cache((): RegistryEntry[] =>
  componentConfigs.map((config) => {
    const demoPath = `${config.category}/${config.name}.tsx`;
    const usagePath = `${config.category}/${config.name}.usage.tsx`;

    const source = readContained(DEMO_DIR, demoPath);
    const usage = readContained(USAGE_DIR, usagePath);

    if (source === null) {
      throw new Error(
        `Registry entry "${config.name}" has no source at components/demo/${demoPath}`,
      );
    }

    return {
      ...config,
      href: `/docs/${config.category}/${config.name}`,
      source,
      usage: usage ?? "",
      demoPath,
      usagePath,
      ...detectDependencies(source, usage ?? ""),
    };
  }),
);

export const getComponent = cache(
  (category: string, name: string): RegistryEntry | undefined =>
    getRegistry().find(
      (entry) => entry.category === category && entry.name === name,
    ),
);

export const getComponentsByCategory = cache(
  (category: ComponentCategory): RegistryEntry[] =>
    getRegistry()
      .filter((entry) => entry.category === category)
      .sort((a, b) => a.title.localeCompare(b.title)),
);

/** Categories that actually contain at least one component, in display order. */
export const getPopulatedCategories = cache((): ComponentCategory[] =>
  CATEGORY_ORDER.filter(
    (category) => getComponentsByCategory(category).length > 0,
  ),
);

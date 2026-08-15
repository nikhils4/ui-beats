import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import componentConfigs from "@/content/docs";
import { CATEGORY_META, CATEGORY_ORDER } from "@/config/categories";
import { byNewest, isRecentlyAdded } from "@/config/recency";
import { detectDependencies } from "@/lib/registry-deps";
import type {
  ComponentCategory,
  ComponentConfig,
} from "@/types/component-config.type";

const ROOT = process.cwd();
const DEMO_DIR = path.join(ROOT, "components", "demo");
const USAGE_DIR = path.join(ROOT, "components", "usage");
const PLAYGROUND_DIR = path.join(ROOT, "components", "playground");

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
  /**
   * Whether the component still counts as new, derived from `addedAt`.
   *
   * Was a hand-set flag on each config that nothing ever cleared, so a
   * component kept its "New" badge indefinitely. Two years, in Text Shine's
   * case. Deriving it means the badge expires without anyone remembering to
   * remove it.
   */
  isNew: boolean;
  /** Route this component is documented at. */
  href: string;
  /** Source of the component itself, i.e. what a user copies into a project. */
  source: string;
  /** Source of the runnable example shown in the "Code" tab. */
  usage: string;
  /** npm packages the component imports, derived from its source. */
  dependencies: string[];
  /** shadcn registry items the component depends on (e.g. `utils`). */
  registryDependencies: string[];
  /**
   * Other UI Beats components this one composes, by name.
   *
   * Empty for every primitive; a block lists the parts it is assembled from,
   * which the docs page shows so a reader can see what an install brings with
   * it before running it.
   */
  beatsDependencies: string[];
  demoPath: string;
  usagePath: string;
  /**
   * Whether an interactive playground exists for this component.
   *
   * Derived from the presence of the harness file rather than a flag in the
   * content config, so adding `components/playground/<cat>/<name>.playground.tsx`
   * is the whole of the work. There is no second place to remember to update.
   */
  hasPlayground: boolean;
}

/*
 * Dependency detection lives in `lib/registry-deps.ts`, shared with
 * `scripts/build-registry.ts`. It used to be copied into both, which was fine
 * while the rule was "skip anything starting with `@/`" but stopped being fine
 * once a block's imports of other components became real registry
 * dependencies. The docs and the published registry have to agree about what
 * an install pulls in.
 */

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

    const detected = detectDependencies(source, usage ?? "");

    return {
      ...config,
      isNew: isRecentlyAdded(config.addedAt),
      href: `/docs/${config.category}/${config.name}`,
      source,
      usage: usage ?? "",
      demoPath,
      usagePath,
      hasPlayground: fs.existsSync(
        path.join(
          PLAYGROUND_DIR,
          `${config.category}`,
          `${config.name}.playground.tsx`,
        ),
      ),
      ...detected,
      /*
       * The usage file is scanned too, and a usage file imports the very
       * component it demonstrates. Without this filter every component would
       * list itself as one of its own dependencies.
       */
      beatsDependencies: detected.beatsDependencies.filter(
        (name) => name !== config.name,
      ),
    };
  }),
);

/**
 * The most recently added components, newest first.
 *
 * What the home page's "New" pill points at. It used to take the last entry
 * carrying an `isNew` flag, and since the registry is ordered by category
 * rather than by date, that was whichever flagged component happened to sit
 * last in the text category, never the newest thing in the library.
 */
export const getNewestComponents = cache((count = 1): RegistryEntry[] =>
  // `sort` is stable, so components added on the same day keep registry order.
  [...getRegistry()].sort(byNewest).slice(0, count),
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

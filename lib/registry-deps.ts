/**
 * What a source file depends on, read from its own import statements.
 *
 * Deliberately dependency-free and not `server-only`: both `lib/registry.ts`
 * (which renders the docs) and `scripts/build-registry.ts` (which writes the
 * published registry) need this, and they used to carry a copy each. Two
 * copies was survivable while the rule was "skip anything starting with `@/`".
 * Blocks broke that: a block imports other UI Beats components, and those
 * imports have to become real registry dependencies. A rule that subtle cannot
 * live in two places and stay the same in both.
 */

/** Packages that ship with any React app and never need installing. */
export const IMPLICIT_DEPS = new Set(["react", "react-dom", "next"]);

/** `@/components/demo/card/flip-card` -> `flip-card`, else null. */
export function beatsComponentFrom(specifier: string): string | null {
  return /^@\/components\/demo\/[^/]+\/([^/]+)$/.exec(specifier)?.[1] ?? null;
}

export interface SourceDependencies {
  /** npm packages to install. */
  dependencies: string[];
  /** shadcn registry items, by bare name, e.g. `utils`. */
  registryDependencies: string[];
  /** Other UI Beats components this source composes, by name. */
  beatsDependencies: string[];
}

export function detectDependencies(...sources: string[]): SourceDependencies {
  const dependencies = new Set<string>();
  const registryDependencies = new Set<string>();
  const beatsDependencies = new Set<string>();

  for (const source of sources) {
    for (const match of source.matchAll(/from\s+["']([^"']+)["']/g)) {
      const specifier = match[1];
      if (!specifier) continue;

      if (specifier.startsWith("@/lib/utils")) {
        registryDependencies.add("utils");
        continue;
      }

      const beats = beatsComponentFrom(specifier);
      if (beats) {
        beatsDependencies.add(beats);
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
    beatsDependencies: [...beatsDependencies].sort(),
  };
}

/**
 * The source as an installed project should see it.
 *
 * On this site a block imports its parts from `components/demo/<category>/`,
 * because that is where they live here. In someone else's project the shadcn
 * CLI has just written those same parts to `components/ui/`, so the published
 * copy has to say that instead. Without the rewrite every installed block
 * fails to resolve its own imports.
 */
export function publishableSource(source: string): string {
  return source.replace(
    /(from\s+["'])@\/components\/demo\/[^/]+\/([^"']+)(["'])/g,
    "$1@/components/ui/$2$3",
  );
}

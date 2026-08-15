/**
 * The design tokens a component may reference, and which of them we ship.
 *
 * Registry items carried no `cssVars` at all, which was fine right up until a
 * component referenced a token that only exists on this site. Animated Beam
 * defaults its gradient to `var(--brand)` and `var(--accent-pink)`; installed
 * into a stock shadcn project, where neither is defined, the beam renders with
 * no gradient. The install was silently broken and the docs page — served from
 * the one origin that does define them — looked perfect.
 *
 * So a component may use any token from `SHADCN_BASE_TOKENS`, which the user
 * already has because `shadcn init` wrote it, or any token from `BEATS_TOKENS`,
 * which the registry then ships alongside the component. Referencing anything
 * else fails the build.
 */

/**
 * Tokens `shadcn init` writes into a project's stylesheet.
 *
 * Not exhaustive of every possible theme — just the contract every shadcn
 * project satisfies, which is what makes them free to use.
 */
export const SHADCN_BASE_TOKENS = new Set([
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "radius",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
]);

export interface BeatsToken {
  light: string;
  dark: string;
  description: string;
}

/**
 * Tokens UI Beats owns, emitted as `cssVars` on any item that uses one.
 *
 * Values match `app/globals.css` — this is the same palette, restated in the
 * form the shadcn CLI merges into a user's stylesheet. Kept deliberately small:
 * every entry here is a variable written into someone else's project, so a
 * token earns its place by being referenced, and `tests/tokens.test.ts` deletes
 * the argument by failing on any that is not.
 */
export const BEATS_TOKENS: Record<string, BeatsToken> = {
  brand: {
    light: "oklch(0.55 0.23 285)",
    dark: "oklch(0.7 0.19 288)",
    description: "Accent hue for beams, trails and gradient starts.",
  },
  "accent-pink": {
    light: "oklch(0.68 0.2 355)",
    dark: "oklch(0.74 0.18 355)",
    description: "Secondary gradient stop, paired with --brand.",
  },
};

/**
 * Theme tokens a source depends on but does not define itself.
 *
 * The exclusion matters: Bento Grid passes `--bento-columns` down as an inline
 * style and reads it back in a class, which is a local channel between two
 * lines of the same file, not a themeable value. Shipping it as a theme token
 * would put a meaningless variable in the user's stylesheet and, worse, imply
 * that changing it there does something.
 */
export function collectThemeTokens(source: string): string[] {
  const referenced = new Set<string>();

  for (const match of source.matchAll(/var\(\s*--([a-zA-Z0-9-]+)\s*[,)]/g)) {
    const name = match[1];
    if (!name) continue;
    // Assigned somewhere in this same file — `"--bento-columns": value` or
    // `--bento-columns:` in a template — so it travels with the component.
    if (new RegExp(`["']?--${name}["']?\\s*:`).test(source)) continue;
    referenced.add(name);
  }

  return [...referenced].sort();
}

/** Tokens a source uses that the registry has to ship with it. */
export function beatsTokensFor(source: string): string[] {
  return collectThemeTokens(source).filter((name) => name in BEATS_TOKENS);
}

/** Tokens a source uses that nothing defines. Non-empty means a broken install. */
export function unknownTokensFor(source: string): string[] {
  return collectThemeTokens(source).filter(
    (name) => !SHADCN_BASE_TOKENS.has(name) && !(name in BEATS_TOKENS),
  );
}

/**
 * The `cssVars` block for a registry item, or null when it needs none.
 *
 * Null rather than an empty object so the field is omitted entirely: an empty
 * `cssVars` is a promise of theming that the item does not keep.
 */
export function cssVarsFor(
  source: string,
): { light: Record<string, string>; dark: Record<string, string> } | null {
  const tokens = beatsTokensFor(source);
  if (tokens.length === 0) return null;

  const light: Record<string, string> = {};
  const dark: Record<string, string> = {};
  for (const name of tokens) {
    light[name] = BEATS_TOKENS[name]!.light;
    dark[name] = BEATS_TOKENS[name]!.dark;
  }

  return { light, dark };
}

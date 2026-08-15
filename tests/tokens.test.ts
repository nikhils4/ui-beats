import { describe, expect, it } from "vitest";
import {
  BEATS_TOKENS,
  SHADCN_BASE_TOKENS,
  beatsTokensFor,
  collectThemeTokens,
  cssVarsFor,
  unknownTokensFor,
} from "@/config/tokens";
import { getRegistry } from "@/lib/registry";

describe("theme tokens", () => {
  const registry = getRegistry();

  it("never ships a component that reads an undefined variable", () => {
    /*
     * The bug this locks down: Animated Beam defaulted its gradient to
     * `var(--brand)` and `var(--accent-pink)`. Both exist here and neither
     * exists in a stock shadcn project, so the docs page looked right and
     * every install rendered the beam without its gradient.
     */
    const offenders = registry
      .map((entry) => ({
        name: entry.name,
        unknown: unknownTokensFor(entry.source),
      }))
      .filter((entry) => entry.unknown.length > 0);

    expect(
      offenders,
      offenders
        .map((o) => `${o.name}: ${o.unknown.map((t) => `--${t}`).join(", ")}`)
        .join("; "),
    ).toEqual([]);
  });

  it("ships every non-base token it uses", () => {
    for (const entry of registry) {
      const needed = beatsTokensFor(entry.source);
      const vars = cssVarsFor(entry.source);

      if (needed.length === 0) {
        // No empty promise of theming on items that need none.
        expect(vars, entry.name).toBeNull();
        continue;
      }

      for (const token of needed) {
        expect(
          vars!.light[token],
          `${entry.name} light --${token}`,
        ).toBeTruthy();
        expect(vars!.dark[token], `${entry.name} dark --${token}`).toBeTruthy();
      }
    }
  });

  it("declares no token that nothing uses", () => {
    // A token here is a variable written into someone else's stylesheet, so
    // an unused one is litter in a project that never asked for it.
    const used = new Set(registry.flatMap((e) => beatsTokensFor(e.source)));
    const dead = Object.keys(BEATS_TOKENS).filter((name) => !used.has(name));

    expect(dead, `unused tokens: ${dead.join(", ")}`).toEqual([]);
  });

  it("does not shadow a shadcn base token", () => {
    // Overriding `--primary` from a component install would silently restyle
    // the user's buttons, not just ours.
    const collisions = Object.keys(BEATS_TOKENS).filter((name) =>
      SHADCN_BASE_TOKENS.has(name),
    );
    expect(collisions).toEqual([]);
  });
});

describe("token collection", () => {
  it("ignores variables the component sets itself", () => {
    // Bento Grid passes `--bento-columns` down as an inline style and reads it
    // back in a class. That is a channel between two lines of one file, not a
    // themeable value, and shipping it would imply otherwise.
    const source = `
      <div style={{ "--bento-columns": columns }} className="grid-cols-[var(--bento-columns)]" />
    `;
    expect(collectThemeTokens(source)).toEqual([]);
  });

  it("finds a token used as a fallback argument", () => {
    expect(collectThemeTokens("var(--brand, red)")).toEqual(["brand"]);
  });

  it("dedupes repeats", () => {
    expect(collectThemeTokens("var(--brand) var(--brand)")).toEqual(["brand"]);
  });
});

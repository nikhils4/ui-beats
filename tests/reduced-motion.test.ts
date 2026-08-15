import { describe, expect, it } from "vitest";
import { getRegistry } from "@/lib/registry";

/**
 * `prefers-reduced-motion` coverage, enforced rather than intended.
 *
 * Fifteen of forty components ignored the setting, including every entrance
 * animation in the `animation` category — a component library whose entire
 * subject is motion, shipping the one thing a motion-sensitive reader has
 * asked the browser to stop doing. Numbers like that do not happen because
 * anybody decided to skip it; they happen because nothing failed when it was
 * skipped. So this fails.
 *
 * Reads `entry.source` rather than globbing the directory, so it checks the
 * exact text the shadcn registry serves and a user ends up with on disk.
 */
describe("reduced motion", () => {
  const registry = getRegistry();

  it("has a component to check", () => {
    expect(registry.length).toBeGreaterThan(0);
  });

  it("consults the preference in every component", () => {
    const offenders = registry
      .filter(
        (entry) =>
          !entry.source.includes("useReducedMotion") &&
          // A CSS-level guard is just as good, and cheaper for a component
          // whose animation is a Tailwind class or a keyframe.
          !entry.source.includes("motion-reduce:") &&
          !entry.source.includes("prefers-reduced-motion"),
      )
      .map((entry) => entry.name);

    expect(
      offenders,
      `no reduced-motion handling: ${offenders.join(", ")}`,
    ).toEqual([]);
  });

  it("uses the value it reads", () => {
    /*
     * Importing the hook and then ignoring the result would satisfy the check
     * above while animating exactly as before. Requiring a second mention of
     * the binding is crude, but it is the difference between a guard and a
     * box-ticking import.
     */
    const offenders = registry
      .filter((entry) => entry.source.includes("useReducedMotion("))
      .filter((entry) => {
        const declaration = /const\s+(\w+)\s*=\s*useReducedMotion\(\)/.exec(
          entry.source,
        );
        if (!declaration) return true;
        const binding = declaration[1]!;
        const uses = entry.source.split(binding).length - 1;
        return uses < 2;
      })
      .map((entry) => entry.name);

    expect(
      offenders,
      `reads the preference but ignores it: ${offenders.join(", ")}`,
    ).toEqual([]);
  });

  it("keeps a client directive wherever the hook is used", () => {
    // `useReducedMotion` is a hook; a copied component without "use client"
    // throws the moment it lands in a Server Component. Two of these shipped
    // without the directive already.
    const offenders = registry
      .filter((entry) => entry.source.includes("useReducedMotion("))
      .filter((entry) => !entry.source.includes('"use client"'))
      .map((entry) => entry.name);

    expect(
      offenders,
      `hook without "use client": ${offenders.join(", ")}`,
    ).toEqual([]);
  });
});

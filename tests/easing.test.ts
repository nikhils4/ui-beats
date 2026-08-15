import { describe, expect, it } from "vitest";
import {
  SPRING_PRESETS,
  TWEEN_PRESETS,
  clampHandle,
  cssSnippet,
  cubicBezier,
  matchPreset,
  motionSnippet,
  sampleSpring,
  sampleTween,
  springOvershoot,
} from "@/lib/easing";

describe("cubicBezier", () => {
  it("pins both endpoints", () => {
    const ease = cubicBezier(0.42, 0, 0.58, 1);
    expect(ease(0)).toBe(0);
    expect(ease(1)).toBe(1);
  });

  it("is the identity for a linear curve", () => {
    const linear = cubicBezier(0, 0, 1, 1);
    for (const t of [0.1, 0.25, 0.5, 0.75, 0.9]) {
      expect(linear(t)).toBeCloseTo(t, 4);
    }
  });

  it("is symmetric about the midpoint for ease-in-out", () => {
    const ease = cubicBezier(0.42, 0, 0.58, 1);
    expect(ease(0.5)).toBeCloseTo(0.5, 3);
    expect(ease(0.25) + ease(0.75)).toBeCloseTo(1, 2);
  });

  it("front-loads an ease-out and back-loads an ease-in", () => {
    const out = cubicBezier(0, 0, 0.58, 1);
    const inward = cubicBezier(0.42, 0, 1, 1);
    // Half way through the time, ease-out has covered most of the distance.
    expect(out(0.5)).toBeGreaterThan(0.5);
    expect(inward(0.5)).toBeLessThan(0.5);
  });

  it("rises monotonically for every non-overshooting preset", () => {
    for (const preset of TWEEN_PRESETS) {
      const [x1, y1, x2, y2] = preset.points;
      if (y1 > 1 || y2 > 1 || y1 < 0 || y2 < 0) continue;

      const ease = cubicBezier(x1, y1, x2, y2);
      let previous = -Infinity;
      for (let i = 0; i <= 20; i++) {
        const value = ease(i / 20);
        expect(
          value,
          `${preset.name} dipped at ${i / 20}`,
        ).toBeGreaterThanOrEqual(previous - 1e-6);
        previous = value;
      }
    }
  });

  it("overshoots past 1 for back-out", () => {
    const back = cubicBezier(0.34, 1.56, 0.64, 1);
    const peak = Array.from({ length: 51 }, (_, i) => back(i / 50)).reduce(
      (max, value) => Math.max(max, value),
      0,
    );
    expect(peak).toBeGreaterThan(1);
  });

  it("clamps out-of-range progress instead of extrapolating", () => {
    const ease = cubicBezier(0.42, 0, 0.58, 1);
    expect(ease(-0.5)).toBe(0);
    expect(ease(1.5)).toBe(1);
  });
});

describe("sampleTween", () => {
  it("returns one more point than steps, spanning 0 to 1", () => {
    const points = sampleTween([0.42, 0, 0.58, 1], 20);
    expect(points).toHaveLength(21);
    expect(points[0]).toEqual({ x: 0, y: 0 });
    expect(points.at(-1)?.x).toBe(1);
    expect(points.at(-1)?.y).toBeCloseTo(1, 4);
  });
});

describe("sampleSpring", () => {
  it("starts at rest and settles at its target", () => {
    const { points, duration } = sampleSpring({
      stiffness: 260,
      damping: 24,
      mass: 1,
    });
    expect(points[0]).toEqual({ x: 0, y: 0 });
    expect(points.at(-1)?.y).toBeCloseTo(1, 1);
    expect(duration).toBeGreaterThan(0);
  });

  it("normalises x into 0..1 while duration carries the real time", () => {
    const { points } = sampleSpring(SPRING_PRESETS[0]!.settings);
    expect(points.at(-1)?.x).toBeCloseTo(1, 3);
    for (const point of points) {
      expect(point.x).toBeGreaterThanOrEqual(0);
      expect(point.x).toBeLessThanOrEqual(1);
    }
  });

  it("settles faster as damping rises", () => {
    const bouncy = sampleSpring({ stiffness: 300, damping: 10, mass: 1 });
    const damped = sampleSpring({ stiffness: 300, damping: 40, mass: 1 });
    expect(damped.duration).toBeLessThan(bouncy.duration);
  });

  it("overshoots when underdamped and does not when overdamped", () => {
    const bouncy = sampleSpring({ stiffness: 300, damping: 10, mass: 1 });
    const damped = sampleSpring({ stiffness: 300, damping: 60, mass: 1 });
    expect(springOvershoot(bouncy.points)).toBeGreaterThan(0.05);
    expect(springOvershoot(damped.points)).toBeCloseTo(0, 2);
  });

  it("terminates for every preset rather than running to the cap", () => {
    for (const preset of SPRING_PRESETS) {
      const { duration } = sampleSpring(preset.settings);
      expect(duration, `${preset.name} never settled`).toBeLessThan(6);
    }
  });
});

describe("matchPreset", () => {
  it("names a curve still sitting on a preset", () => {
    expect(matchPreset([0.42, 0, 0.58, 1])).toBe("ease-in-out");
    expect(matchPreset([0, 0, 1, 1])).toBe("linear");
  });

  it("returns null once a handle has been dragged off it", () => {
    expect(matchPreset([0.42, 0.3, 0.58, 1])).toBeNull();
  });
});

describe("snippets", () => {
  const tween = {
    points: [0.42, 0, 0.58, 1] as [number, number, number, number],
    duration: 0.6,
  };
  const spring = { stiffness: 260, damping: 24, mass: 1 };

  it("emits a Motion tween with its ease array", () => {
    const snippet = motionSnippet("tween", tween, spring);
    expect(snippet).toContain("duration: 0.6");
    expect(snippet).toContain("ease: [0.42, 0, 0.58, 1]");
    expect(snippet).toContain("// ease-in-out");
  });

  it("emits a Motion spring without a duration", () => {
    const snippet = motionSnippet("spring", tween, spring);
    expect(snippet).toContain('type: "spring"');
    expect(snippet).toContain("stiffness: 260");
    expect(snippet).not.toContain("duration");
  });

  it("emits CSS in milliseconds", () => {
    expect(cssSnippet("tween", tween, spring)).toBe(
      "transition: all 600ms cubic-bezier(0.42, 0, 0.58, 1);",
    );
  });

  it("says plainly that CSS has no spring", () => {
    expect(cssSnippet("spring", tween, spring)).toContain("no spring");
  });
});

describe("clampHandle", () => {
  it("keeps x inside the box", () => {
    expect(clampHandle(-0.3, 0.5)[0]).toBe(0);
    expect(clampHandle(1.4, 0.5)[0]).toBe(1);
  });

  it("allows the y overshoot that makes a bounce possible", () => {
    expect(clampHandle(0.5, 1.4)[1]).toBe(1.4);
    expect(clampHandle(0.5, -0.4)[1]).toBe(-0.4);
  });

  it("bounds y to the range the editor draws, so a handle stays reachable", () => {
    expect(clampHandle(0.5, 9)[1]).toBe(1.5);
    expect(clampHandle(0.5, -9)[1]).toBe(-0.5);
  });
});

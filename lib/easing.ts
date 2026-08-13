/**
 * Curve maths for Motion Studio.
 *
 * Everything here is pure so the editor can be unit tested without a DOM, and
 * so the same functions draw the curve, drive the preview and print the
 * snippet — the three cannot disagree about what the curve actually is.
 */

export type EasingMode = "tween" | "spring";

export interface TweenSettings {
  /** Cubic bezier control points: [x1, y1, x2, y2], each x in 0..1. */
  points: [number, number, number, number];
  /** Seconds. */
  duration: number;
}

export interface SpringSettings {
  stiffness: number;
  damping: number;
  mass: number;
}

/** A point on the plotted curve, in unit space (0..1 both axes). */
export interface CurvePoint {
  x: number;
  y: number;
}

/**
 * Named curves worth starting from.
 *
 * The CSS keywords plus the ones people actually reach for in motion design.
 * Values match the CSS spec where a keyword exists, so "ease-out" here and
 * `ease-out` in a stylesheet are the same curve rather than an approximation.
 */
export const TWEEN_PRESETS: {
  name: string;
  points: [number, number, number, number];
}[] = [
  { name: "linear", points: [0, 0, 1, 1] },
  { name: "ease", points: [0.25, 0.1, 0.25, 1] },
  { name: "ease-in", points: [0.42, 0, 1, 1] },
  { name: "ease-out", points: [0, 0, 0.58, 1] },
  { name: "ease-in-out", points: [0.42, 0, 0.58, 1] },
  { name: "quint-out", points: [0.22, 1, 0.36, 1] },
  { name: "expo-out", points: [0.16, 1, 0.3, 1] },
  { name: "circ-out", points: [0, 0.55, 0.45, 1] },
  { name: "back-out", points: [0.34, 1.56, 0.64, 1] },
  { name: "anticipate", points: [0.36, 0, 0.66, -0.56] },
];

export const SPRING_PRESETS: { name: string; settings: SpringSettings }[] = [
  { name: "gentle", settings: { stiffness: 120, damping: 20, mass: 1 } },
  { name: "snappy", settings: { stiffness: 400, damping: 28, mass: 1 } },
  { name: "bouncy", settings: { stiffness: 300, damping: 12, mass: 1 } },
  { name: "stiff", settings: { stiffness: 700, damping: 40, mass: 1 } },
  { name: "wobbly", settings: { stiffness: 180, damping: 8, mass: 1.2 } },
];

/** One axis of a cubic bezier with fixed endpoints 0 and 1. */
function bezier(t: number, a: number, b: number): number {
  const inverse = 1 - t;
  return 3 * inverse * inverse * t * a + 3 * inverse * t * t * b + t * t * t;
}

/**
 * Solve the curve's x for a given progress, then read its y.
 *
 * A cubic bezier easing is parametric: the `t` that draws the curve is not the
 * elapsed time. Newton-Raphson converges in a handful of steps here because
 * x(t) is monotonic for any x1/x2 inside 0..1, with bisection as a fallback
 * for the flat regions where the derivative approaches zero.
 */
export function cubicBezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): (progress: number) => number {
  return (progress: number) => {
    if (progress <= 0) return 0;
    if (progress >= 1) return 1;

    let t = progress;
    for (let i = 0; i < 8; i++) {
      const x = bezier(t, x1, x2) - progress;
      if (Math.abs(x) < 1e-6) return bezier(t, y1, y2);

      const inverse = 1 - t;
      const derivative =
        3 * inverse * inverse * x1 +
        6 * inverse * t * (x2 - x1) +
        3 * t * t * (1 - x2);

      if (Math.abs(derivative) < 1e-6) break;
      t -= x / derivative;
    }

    // Bisection fallback, which cannot diverge.
    let low = 0;
    let high = 1;
    t = progress;
    for (let i = 0; i < 20; i++) {
      const x = bezier(t, x1, x2);
      if (Math.abs(x - progress) < 1e-6) break;
      if (x > progress) high = t;
      else low = t;
      t = (low + high) / 2;
    }

    return bezier(t, y1, y2);
  };
}

/** Sample a tween into points for plotting. */
export function sampleTween(
  points: [number, number, number, number],
  steps = 60,
): CurvePoint[] {
  const [x1, y1, x2, y2] = points;
  const ease = cubicBezier(x1, y1, x2, y2);
  return Array.from({ length: steps + 1 }, (_, index) => {
    const x = index / steps;
    return { x, y: ease(x) };
  });
}

/**
 * Simulate a spring, returning its normalised position over time.
 *
 * Motion's spring is a damped harmonic oscillator, so rather than approximate
 * it with a bezier this integrates the same system. Fixed 1ms steps keep the
 * result stable for stiff springs, where a larger step visibly overshoots.
 */
export function sampleSpring(
  settings: SpringSettings,
  { maxDuration = 6 } = {},
): { points: CurvePoint[]; duration: number } {
  const { stiffness, damping, mass } = settings;
  const step = 0.001;

  let position = 0;
  let velocity = 0;
  let elapsed = 0;
  let settledFor = 0;

  const raw: CurvePoint[] = [{ x: 0, y: 0 }];

  while (elapsed < maxDuration) {
    const springForce = -stiffness * (position - 1);
    const dampingForce = -damping * velocity;
    velocity += ((springForce + dampingForce) / mass) * step;
    position += velocity * step;
    elapsed += step;

    raw.push({ x: elapsed, y: position });

    // Settled once it has been within half a percent of rest, and barely
    // moving, for a continuous 100ms — a single frame inside the threshold
    // happens mid-overshoot on the way past.
    const atRest = Math.abs(1 - position) < 0.005 && Math.abs(velocity) < 0.05;
    settledFor = atRest ? settledFor + step : 0;
    if (settledFor >= 0.1) break;
  }

  const duration = elapsed;
  return {
    // Normalise x to 0..1 so the plot and a tween's plot share one coordinate
    // space, while `duration` carries the real time.
    points: raw.map(({ x, y }) => ({ x: duration ? x / duration : 0, y })),
    duration,
  };
}

/** How far past its target the spring travels, as a fraction. 0 means none. */
export function springOvershoot(points: CurvePoint[]): number {
  const peak = points.reduce((max, point) => Math.max(max, point.y), 0);
  return Math.max(0, peak - 1);
}

function round(value: number, places = 2): number {
  return Number(value.toFixed(places));
}

/** The `transition` object to paste into a Motion component. */
export function motionSnippet(
  mode: EasingMode,
  tween: TweenSettings,
  spring: SpringSettings,
): string {
  if (mode === "spring") {
    return `transition={{
  type: "spring",
  stiffness: ${round(spring.stiffness, 0)},
  damping: ${round(spring.damping, 0)},
  mass: ${round(spring.mass)},
}}`;
  }

  const rounded = tween.points.map((value) => round(value)) as [
    number,
    number,
    number,
    number,
  ];

  return `transition={{
  duration: ${round(tween.duration)},
  ease: [${rounded.join(", ")}],${matchPreset(rounded) ? ` // ${matchPreset(rounded)}` : ""}
}}`;
}

/** The preset name for these control points, if they are still on one. */
export function matchPreset(
  points: [number, number, number, number],
): string | null {
  const preset = TWEEN_PRESETS.find((candidate) =>
    candidate.points.every(
      (value, index) => Math.abs(value - points[index]!) < 0.005,
    ),
  );
  return preset?.name ?? null;
}

/** The CSS equivalent, for anything not driven by Motion. */
export function cssSnippet(
  mode: EasingMode,
  tween: TweenSettings,
  spring: SpringSettings,
): string {
  if (mode === "spring") {
    const { duration } = sampleSpring(spring);
    return `/* CSS has no spring. This is the closest tween. */
transition: all ${Math.round(duration * 1000)}ms cubic-bezier(0.34, 1.56, 0.64, 1);`;
  }

  const [x1, y1, x2, y2] = tween.points.map((value) => round(value));
  return `transition: all ${Math.round(tween.duration * 1000)}ms cubic-bezier(${x1}, ${y1}, ${x2}, ${y2});`;
}

/** Clamp a dragged handle: x must stay in 0..1, y may overshoot for a bounce. */
export function clampHandle(x: number, y: number): [number, number] {
  return [
    Math.min(1, Math.max(0, x)),
    // Matches the vertical range the editor actually draws, so a handle can
    // never be dragged somewhere the user cannot see it again. Still well
    // clear of 1 and 0, which is what allows a bounce or an anticipation.
    Math.min(1.5, Math.max(-0.5, y)),
  ];
}

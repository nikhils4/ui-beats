/**
 * The brand mark, defined once for every surface that draws it.
 *
 * Four purple equalizer bars, no enclosing tile. The inline SVG in
 * `components/brand.tsx`, the generated favicon and apple icon, and the PNG at
 * `/brand-mark.png` all build from the constants here, so the logo in the
 * header and the icon in the browser tab are the same mark rather than two
 * drawings that merely resemble each other.
 *
 * Dependency-free on purpose: imported by both React components and
 * Satori-rendered image routes, and neither should have to pull in the other's
 * runtime to know how tall a bar is.
 */

/** Each bar's height, as a fraction of the tallest. */
export const BEAT_BARS = [0.47, 1, 0.68, 0.84] as const;

/*
 * Fixed hexes, not `var(--brand)`.
 *
 * The mark cannot take its colour from the theme: Satori cannot read the
 * stylesheet, so a themed SVG could never match a generated PNG, and the logo
 * would change colour between light and dark. A brand mark has to be a
 * constant. This ramp stays purple end to end and is mid-toned enough to hold
 * up on a white tab strip and a near-black header alike.
 */
export const MARK_FROM = "#8b5cf6";
export const MARK_TO = "#c084fc";

/**
 * Everything sized as a fraction of the mark, so it is identical at any size.
 *
 * The bars nearly fill the box because there is no tile behind them to give
 * the mark its silhouette. An earlier version sat them in a rounded gradient
 * square at 56% height; without that square the same ratios left a small
 * cluster of bars marooned in a large transparent canvas, which is most of a
 * favicon's budget spent on nothing.
 */
const RATIOS = {
  barWidth: 0.13,
  gap: 0.09,
  /** Height of the tallest bar. */
  maxHeight: 0.92,
} as const;

export interface MarkBar {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  /** Colour sampled along the ramp at this bar's centre. */
  color: string;
}

function channel(hex: string, offset: number): number {
  return parseInt(hex.slice(offset, offset + 2), 16);
}

/**
 * A colour part-way along the mark's ramp.
 *
 * The SVG paints one gradient across the whole mark; Satori has no equivalent
 * that spans separate elements, so each bar takes a solid sample from the same
 * ramp at its own position. At the sizes involved the two are
 * indistinguishable, and it keeps a single definition of the colour.
 */
function sampleRamp(t: number): string {
  const mix = (offset: number) => {
    const from = channel(MARK_FROM.slice(1), offset);
    const to = channel(MARK_TO.slice(1), offset);
    return Math.round(from + (to - from) * t)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${mix(0)}${mix(2)}${mix(4)}`;
}

/**
 * Bar rectangles for a mark drawn at `size` units square.
 *
 * Both renderers place bars from this, rather than one using SVG rects and the
 * other flexbox: same numbers in, same picture out.
 */
export function markGeometry(size: number): MarkBar[] {
  const barWidth = size * RATIOS.barWidth;
  const gap = size * RATIOS.gap;
  const maxHeight = size * RATIOS.maxHeight;
  const span = BEAT_BARS.length * barWidth + (BEAT_BARS.length - 1) * gap;
  const startX = (size - span) / 2;

  return BEAT_BARS.map((fraction, index) => {
    const height = fraction * maxHeight;
    return {
      x: startX + index * (barWidth + gap),
      y: (size - height) / 2,
      width: barWidth,
      height,
      radius: barWidth / 2,
      color: sampleRamp(index / (BEAT_BARS.length - 1)),
    };
  });
}

import { MARK_FROM, MARK_TO, markGeometry } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * Drawn on a 32-unit grid, the size the favicon is generated at.
 *
 * Any size works, since the geometry is all ratios, but matching the icon's
 * grid means the two are literally the same numbers rather than the same
 * numbers rounded differently.
 */
const VIEWBOX = 32;
const BARS = markGeometry(VIEWBOX);

/**
 * How far each bar stretches when the lockup is hovered.
 *
 * Deliberately uneven and deliberately CSS: the mark reacts like a level meter
 * rather than a logo that scales, and it costs no JavaScript on every page of
 * the site. `motion-reduce` drops it entirely.
 */
const HOVER_SCALE = [
  "group-hover:scale-y-[1.7]",
  "group-hover:scale-y-[0.62]",
  "group-hover:scale-y-[1.5]",
  "group-hover:scale-y-[0.78]",
];

/** Staggered so the bars move as a meter rather than snapping together. */
const HOVER_DELAY = ["delay-0", "delay-[40ms]", "delay-[80ms]", "delay-[120ms]"];

interface BeatsMarkProps {
  className?: string;
}

/**
 * The brand mark: four purple equalizer bars.
 *
 * Identical in construction to the favicon and the apple icon, because all
 * three read `markGeometry` and the same two hexes. No enclosing tile and no
 * theme tokens: the bars are the mark, and their colour is a constant so a
 * generated PNG can match it exactly.
 *
 * The bars answer `group-hover` on whatever wraps the mark, so put `group` on
 * the link or lockup that contains it.
 */
export function BeatsMark({ className }: BeatsMarkProps) {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      fill="none"
      aria-hidden="true"
      className={cn("size-7", className)}
    >
      <defs>
        {/*
         * A fixed id. Two marks on one page would collide, but they resolve to
         * an identical definition, so the duplicate is invisible rather than
         * wrong, and it keeps this component hook-free and usable from a
         * server component.
         *
         * `userSpaceOnUse` so the ramp spans the whole mark rather than
         * restarting inside each bar, which is what lets the PNG match it by
         * sampling one colour per bar.
         */}
        <linearGradient
          id="uibeats-mark"
          x1="0"
          y1="0"
          x2={VIEWBOX}
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={MARK_FROM} />
          <stop offset="100%" stopColor={MARK_TO} />
        </linearGradient>
      </defs>

      {BARS.map((bar, index) => (
        <rect
          key={index}
          x={bar.x}
          y={bar.y}
          width={bar.width}
          height={bar.height}
          rx={bar.radius}
          fill="url(#uibeats-mark)"
          className={cn(
            "origin-center transition-transform duration-300 ease-out motion-reduce:transition-none",
            HOVER_SCALE[index],
            HOVER_DELAY[index],
            "motion-reduce:group-hover:scale-y-100",
          )}
        />
      ))}
    </svg>
  );
}

interface BrandLockupProps {
  className?: string;
  /** Hide the wordmark, e.g. where space is tight. */
  markOnly?: boolean;
}

/**
 * Mark plus wordmark, as used in the header and the expanded sidebar.
 *
 * `group` is on the lockup rather than the mark so hovering anywhere on the
 * logo, wordmark included, drives the bars.
 */
export function BrandLockup({ className, markOnly = false }: BrandLockupProps) {
  return (
    <span className={cn("group flex shrink-0 items-center gap-2", className)}>
      <BeatsMark className="size-7" />
      {markOnly ? null : (
        <span className="font-display text-[15px] font-bold tracking-tight">
          UI Beats
        </span>
      )}
    </span>
  );
}

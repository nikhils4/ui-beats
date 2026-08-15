"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  /** How many streaks are in the air at once. */
  count?: number;
  /** Direction of travel, in degrees clockwise from straight down. */
  angle?: number;
  /** Seconds for one streak to cross the frame. */
  duration?: number;
  /** Length of a streak's tail, in pixels, before per-streak variation. */
  trailLength?: number;
  /** Colour of the head and the tail it fades out of. */
  color?: string;
  className?: string;
}

/**
 * A deterministic 0–1 from an integer seed.
 *
 * `Math.random()` cannot be used for the layout: the meteors are placed during
 * render, so the server and the browser would each scatter them differently and
 * React would discard the server markup on hydration. Hashing the index gives
 * the same scattered-looking field on both, at no runtime cost.
 */
function pseudoRandom(seed: number): number {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

/**
 * A field of meteors falling across whatever sits behind them.
 *
 * Each streak rides a rail the full height of the frame and travels in
 * percentages of that rail, so the field fills its container without measuring
 * it — no `ResizeObserver`, and nothing to retune when the container changes
 * size. Direction is one `rotate` on the field as a whole rather than a
 * transform per streak, which is also why the field is oversized by a quarter
 * in every direction: rotation would otherwise swing empty corners into view.
 */
export function Meteors({
  count = 20,
  angle = 20,
  duration = 3,
  trailLength = 90,
  color = "#ffffff",
  className = "",
}: MeteorsProps) {
  const prefersReducedMotion = useReducedMotion();

  const meteors = useMemo(
    () =>
      Array.from({ length: Math.max(0, Math.floor(count)) }, (_, index) => {
        // Spread either side of `duration` so the field keeps drifting out of
        // step instead of settling into one synchronised pulse.
        const travel = duration * (0.75 + pseudoRandom(index + 211) * 0.5);
        return {
          left: pseudoRandom(index) * 100,
          /*
           * Negative, so each streak begins part-way through its own fall
           * rather than at the top. A positive delay would leave the sky empty
           * for the first few seconds and fill it in — which is the one moment
           * a visitor is most likely to be looking at it.
           */
          delay: -pseudoRandom(index + 101) * travel,
          travel,
          scale: 0.6 + pseudoRandom(index + 307) * 0.8,
        };
      }),
    [count, duration],
  );

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute -inset-1/4"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        {meteors.map((meteor, index) => (
          <motion.span
            key={index}
            className="absolute inset-y-0"
            style={{ left: `${meteor.left}%` }}
            animate={prefersReducedMotion ? undefined : { y: ["-10%", "110%"] }}
            transition={{
              duration: meteor.travel,
              delay: meteor.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span
              className="relative block w-px"
              style={{ height: `${trailLength * meteor.scale}px` }}
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundImage: `linear-gradient(to bottom, transparent, ${color})`,
                }}
              />
              {/* The head leads the tail, so it sits at the bottom of a streak
                  falling downward. */}
              <span
                className="absolute bottom-0 left-1/2 size-[3px] -translate-x-1/2 translate-y-1/2 rounded-full"
                style={{ background: color, boxShadow: `0 0 8px 1px ${color}` }}
              />
            </span>
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default Meteors;

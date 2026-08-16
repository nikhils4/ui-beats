"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  /** How far round to sweep, 0 to 100. */
  value?: number;
  /** Outer diameter, in pixels. */
  size?: number;
  /** Thickness of the ring, in pixels. */
  strokeWidth?: number;
  /** Seconds the sweep takes. */
  duration?: number;
  /** Print the percentage in the middle. */
  showLabel?: boolean;
  className?: string;
}

/**
 * A ring that sweeps round to a value, with the number counting up beneath it.
 *
 * The arc is drawn by animating `pathLength`, which Motion resolves against
 * the circle's real measured length. The usual version of this computes
 * `2 * Math.PI * r` by hand into `strokeDasharray`, which is correct right up
 * until the stroke width changes the radius the arc is actually drawn at, and
 * then the ring stops short of its own end by a few pixels.
 *
 * The label is driven by the same animation rather than a second timer, so the
 * number cannot finish ahead of the arc it is describing. It is read from a
 * motion value into state, because text content is the one thing a motion
 * value cannot write without a render.
 *
 * Under reduced motion both arrive at their final value immediately: the ring
 * is a readout, and a readout that withholds the reading is worse than one
 * that never animated.
 */
export function ProgressRing({
  value = 72,
  size = 120,
  strokeWidth = 10,
  duration = 1.2,
  showLabel = true,
  className = "",
}: ProgressRingProps) {
  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(count, "change", (latest) =>
    setDisplay(Math.round(latest)),
  );

  useEffect(() => {
    const controls = animate(count, value, {
      duration: prefersReducedMotion ? 0 : duration,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [count, value, duration, prefersReducedMotion]);

  // The arc is drawn along the centre of the stroke, so the radius has to come
  // in by half of it or the ring is clipped by its own viewBox.
  const radius = (size - strokeWidth) / 2;
  const centre = size / 2;

  return (
    <div
      className={cn("relative inline-flex", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`${Math.round(value)} percent`}
      >
        {/* Rotated so the sweep starts at twelve o'clock rather than three. */}
        <g transform={`rotate(-90 ${centre} ${centre})`}>
          <circle
            cx={centre}
            cy={centre}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted"
          />
          <motion.circle
            cx={centre}
            cy={centre}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="text-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: Math.min(Math.max(value, 0), 100) / 100 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration,
              ease: "easeOut",
            }}
          />
        </g>
      </svg>

      {showLabel ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-xl font-semibold tabular-nums"
        >
          {display}%
        </span>
      ) : null}
    </div>
  );
}

export default ProgressRing;

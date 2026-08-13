"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface RetroGridProps {
  /** Size of one grid cell, in pixels. */
  cellSize?: number;
  /** Seconds for the grid to travel one full cell. Lower is faster. */
  duration?: number;
  /** How far the plane is laid back, in degrees. 90 would be edge on. */
  angle?: number;
  /** Thickness of the grid lines, in pixels. */
  lineWidth?: number;
  /** Fraction of the frame the grid fills, measured up from the bottom. */
  height?: number;
  className?: string;
}

/**
 * An infinite grid receding to a horizon and scrolling toward the viewer.
 *
 * Lines are drawn with `currentColor`, so the grid takes the text colour of
 * whatever wraps it and follows the theme without a single JS read. Depth is a
 * CSS `perspective` plus one `rotateX`, and motion is a single transform on an
 * oversized tile — the loop is seamless because it travels exactly one cell
 * before restarting, which is indistinguishable from travelling forever.
 */
export function RetroGrid({
  cellSize = 60,
  duration = 2.2,
  angle = 65,
  lineWidth = 1,
  height = 0.7,
  className = "",
}: RetroGridProps) {
  const prefersReducedMotion = useReducedMotion();

  // Fades the grid out as it approaches the horizon. A mask rather than a
  // gradient overlay, so it works over whatever the parent paints behind it.
  const horizonFade =
    "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.35) 55%, transparent 88%)";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      style={{
        perspective: "200px",
        maskImage: horizonFade,
        WebkitMaskImage: horizonFade,
      }}
    >
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: `${height * 100}%`,
          transform: `rotateX(${angle}deg)`,
          transformOrigin: "bottom",
        }}
      >
        {/*
         * The tile is far wider and taller than the frame on purpose: laying it
         * back in 3D throws its far edge up to the horizon and its sides out
         * past the corners, so anything frame-sized would show its own edges
         * as the grid moves.
         */}
        <motion.div
          className="absolute -inset-x-[200%] bottom-0 h-[300%]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor ${lineWidth}px, transparent 0), linear-gradient(to bottom, currentColor ${lineWidth}px, transparent 0)`,
            backgroundSize: `${cellSize}px ${cellSize}px`,
          }}
          animate={prefersReducedMotion ? undefined : { y: [0, cellSize] }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}

export default RetroGrid;

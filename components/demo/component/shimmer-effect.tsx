"use client";

import { motion, useReducedMotion } from "motion/react";

interface ShimmerEffectProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  /** Seconds for one sweep. */
  duration?: number;
  className?: string;
}

/**
 * A loading placeholder with a sweeping highlight.
 *
 * Both colours are derived from `currentColor`, so the placeholder works on a
 * dark surface as well as a light one. The original hardcoded a black base and
 * a white sweep, which disappeared entirely in dark mode.
 */
export function ShimmerEffect({
  width = "100%",
  height = "1rem",
  borderRadius = "0.375rem",
  duration = 1.5,
  className = "",
}: ShimmerEffectProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      style={{ width, height, borderRadius }}
      className={`relative overflow-hidden bg-current/10 ${className}`}
      aria-hidden="true"
    >
      {prefersReducedMotion ? null : (
        <motion.div
          className="size-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, currentColor 50%, transparent 100%)",
            opacity: 0.18,
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration, ease: "linear" }}
        />
      )}
    </div>
  );
}

export default ShimmerEffect;

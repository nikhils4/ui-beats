"use client";

import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Native button props minus the handlers Motion redefines with its own
 * signatures — spreading React's DOM versions onto `motion.button` conflicts.
 */
type NativeButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  | "ref"
  | "style"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
>;

interface ShimmerButtonProps extends NativeButtonProps {
  children: ReactNode;
  /** Colour of the light band that crosses the button. */
  shimmerColor?: string;
  /** Width of the band, as a percentage of the button's own width. */
  shimmerWidth?: number;
  /** Seconds for the band to cross once. */
  duration?: number;
  /** Seconds the button rests between crossings. */
  repeatDelay?: number;
  className?: string;
}

/**
 * A button with a band of light sweeping across it on a loop.
 *
 * The band is a gradient painted on a full-width overlay rather than a
 * fixed-width element travelling a measured distance. That is what keeps it
 * honest at any size: one sweep always crosses the whole button, whether the
 * label is "Go" or a full sentence, with no `ResizeObserver` and no pixel
 * distances to retune. `shimmerWidth` sets how tight the band is as a share of
 * that width, so it scales with the button too.
 */
export function ShimmerButton({
  children,
  shimmerColor = "#ffffff",
  shimmerWidth = 40,
  duration = 1.4,
  repeatDelay = 1,
  className = "",
  ...props
}: ShimmerButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const half = shimmerWidth / 2;
  const band = `linear-gradient(100deg, transparent ${Math.max(0, 50 - half)}%, ${shimmerColor} 50%, transparent ${Math.min(100, 50 + half)}%)`;

  return (
    <motion.button
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ${className}`}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      {...props}
    >
      {/*
       * Parked one full width to the left, so `x: 0%` is already off the button
       * and the sweep starts from outside rather than materialising mid-face.
       */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-full w-full opacity-60"
        style={{ backgroundImage: band }}
        animate={prefersReducedMotion ? undefined : { x: ["0%", "200%"] }}
        transition={{
          duration,
          repeat: Infinity,
          repeatDelay,
          ease: "easeInOut",
        }}
      />
      <span className="relative">{children}</span>
    </motion.button>
  );
}

export default ShimmerButton;

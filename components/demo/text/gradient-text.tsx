"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  text: string;
  /** First and last stop of the gradient. Any CSS colour. */
  from?: string;
  /** Middle stop: the colour that travels across the text. */
  via?: string;
  /** Seconds for one pass of the gradient. */
  duration?: number;
  className?: string;
}

/**
 * Text painted with a gradient that travels across it.
 *
 * The ramp is mirrored (`from, via, from, via, from`) and the background is
 * sized to twice the element, so shifting the position by exactly one image
 * width returns to the frame it started on. That is what makes the loop
 * seamless without a reverse: a one-directional sweep that snaps back at the
 * end reads as a dropped frame, and `repeatType: "mirror"` reads as a
 * pendulum rather than a sweep.
 *
 * Both colours default to theme tokens rather than hex, so installed into a
 * project with its own accent the text picks that up instead of ours.
 */
export function GradientText({
  text,
  from = "var(--brand)",
  via = "var(--accent-pink)",
  duration = 4,
  className = "",
}: GradientTextProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      style={{
        backgroundImage: `linear-gradient(90deg, ${from}, ${via}, ${from}, ${via}, ${from})`,
        backgroundSize: "200% 100%",
        // `background-clip: text` needs the text itself to be transparent for
        // the paint underneath to show through.
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{
        backgroundPosition: prefersReducedMotion ? "0% 50%" : "200% 50%",
      }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration, ease: "linear", repeat: Infinity }
      }
      className={cn("inline-block", className)}
    >
      {text}
    </motion.span>
  );
}

export default GradientText;

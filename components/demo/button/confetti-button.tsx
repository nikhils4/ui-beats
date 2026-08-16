"use client";

import confetti from "canvas-confetti";
import { motion, useReducedMotion } from "motion/react";
import {
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

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

interface ConfettiButtonProps extends NativeButtonProps {
  children: ReactNode;
  /** How many pieces each burst throws. */
  particleCount?: number;
  /** How wide the burst fans out, in degrees. */
  spread?: number;
  /** Hex colours the pieces are drawn from. */
  colors?: string[];
  className?: string;
}

/**
 * Hex, not theme tokens.
 *
 * `canvas-confetti` parses its colours with its own hex reader, so an
 * `oklch()` or a `var(--chart-1)` handed to it is dropped silently and the
 * burst comes out in the library's defaults. These are picked to read on both
 * a light and a dark surface, since the canvas covers the whole viewport.
 */
const DEFAULT_COLORS = ["#7c3aed", "#ec4899", "#06b6d4", "#f59e0b", "#22c55e"];

/**
 * A button that throws confetti from itself when pressed.
 *
 * The burst originates at the button's own centre rather than the top of the
 * viewport, which is what makes it read as coming *from* the thing you
 * pressed. `canvas-confetti` takes its origin in viewport fractions, so the
 * button's box is measured at click time — a stored position would be wrong
 * after any scroll.
 *
 * `onClick` is called either way. The confetti is decoration on top of
 * whatever the button already does, so a reader who has asked for reduced
 * motion loses the celebration and keeps the button.
 */
export function ConfettiButton({
  children,
  particleCount = 90,
  spread = 70,
  colors = DEFAULT_COLORS,
  className = "",
  onClick,
  ...props
}: ConfettiButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();

    confetti({
      particleCount,
      spread,
      colors,
      origin: {
        x: (bounds.left + bounds.width / 2) / window.innerWidth,
        y: (bounds.top + bounds.height / 2) / window.innerHeight,
      },
      // A second guard, for the case where the preference changes after mount
      // and the library is already mid-burst.
      disableForReducedMotion: true,
    });
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 600, damping: 24 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5",
        "bg-primary text-sm font-medium text-primary-foreground",
        "transition-colors hover:bg-primary/90",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default ConfettiButton;

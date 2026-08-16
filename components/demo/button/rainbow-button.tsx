"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
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

interface RainbowButtonProps extends NativeButtonProps {
  children: ReactNode;
  /** Seconds for the colours to travel once around the button. */
  speed?: number;
  /** Cast a blurred copy of the gradient beneath the button. */
  glow?: boolean;
  /** Thickness of the gradient border, in pixels. */
  borderWidth?: number;
  className?: string;
}

/**
 * A call to action ringed by a band of colour that travels around it.
 *
 * The palette is the project's own `--chart-1` through `--chart-5`, not five
 * hardcoded hues. Those are part of the contract `shadcn init` writes into
 * every project, so the button ships with a rainbow that already belongs to
 * whatever it is installed into — and re-themes with the rest of the app
 * instead of staying the one violet-and-pink element on a green site.
 *
 * The ramp repeats its first colour at the end and the background is twice the
 * button's width, so travelling exactly one image width returns to the frame
 * it started on. That is what makes the loop seamless: no reverse, no jump.
 *
 * The border is padding rather than a `border`, so the gradient is a real
 * painted surface with the label sitting on an opaque plate above it. A
 * gradient border-image cannot be rounded, which is the usual reason this
 * effect ends up with square corners.
 */
const RAINBOW =
  "linear-gradient(90deg, var(--chart-1), var(--chart-2), var(--chart-3), var(--chart-4), var(--chart-5), var(--chart-1))";

export function RainbowButton({
  children,
  speed = 3,
  glow = true,
  borderWidth = 2,
  className = "",
  ...props
}: RainbowButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const travel = {
    backgroundImage: RAINBOW,
    backgroundSize: "200% 100%",
  };

  const animate = {
    backgroundPosition: prefersReducedMotion ? "0% 50%" : "200% 50%",
  };

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: speed, ease: "linear" as const, repeat: Infinity };

  return (
    <span className="relative inline-flex">
      {glow ? (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full opacity-60 blur-lg"
          style={travel}
          initial={{ backgroundPosition: "0% 50%" }}
          animate={animate}
          transition={transition}
        />
      ) : null}

      <motion.button
        type="button"
        className={cn(
          "relative inline-flex rounded-full",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
          className,
        )}
        style={{ ...travel, padding: borderWidth }}
        initial={{ backgroundPosition: "0% 50%" }}
        animate={animate}
        transition={transition}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
        {...props}
      >
        <span className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-2.5 text-sm font-medium text-foreground">
          {children}
        </span>
      </motion.button>
    </span>
  );
}

export default RainbowButton;

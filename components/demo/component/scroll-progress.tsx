"use client";

import type { RefObject } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  /**
   * Scroll container to track. Omit to track the window.
   *
   * With a container the bar is positioned `absolute`, so it belongs inside a
   * `relative` wrapper *around* the scroll area rather than inside the area
   * itself: a bar inside the scroller would scroll away with the content.
   */
  container?: RefObject<HTMLElement | null>;
  /** Thickness of the bar, in pixels. */
  height?: number;
  /** Any CSS colour or gradient. */
  color?: string;
  position?: "top" | "bottom";
  /** Ease the bar toward the true position instead of tracking it exactly. */
  smooth?: boolean;
  className?: string;
}

/**
 * A bar that fills as its scroll container is read.
 *
 * The bar is scaled along X rather than resized: `scaleX` is a compositor-only
 * transform, so the browser never runs layout for a value that changes on every
 * scroll frame, and the whole thing costs nothing on the main thread.
 *
 * `smooth` runs the progress through a spring. That is the difference between a
 * bar that judders with a trackpad's raw deltas and one that glides, and it
 * matters most on exactly the long pages this component is for.
 */
export function ScrollProgress({
  container,
  height = 3,
  color = "var(--primary)",
  position = "top",
  smooth = true,
  className = "",
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll(container ? { container } : undefined);
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });
  const prefersReducedMotion = useReducedMotion();

  /*
   * The bar itself survives reduced motion: it moves only because the reader
   * is scrolling, and pinning it would just make it wrong. The spring does
   * not: it keeps travelling after the scroll has stopped, which is motion the
   * reader did not ask for and cannot stop.
   */
  const followsSpring = smooth && !prefersReducedMotion;

  return (
    <motion.div
      // The bar restates progress the content already conveys, and it changes
      // on every frame of a scroll. Announcing that is noise, not information.
      aria-hidden="true"
      className={cn(
        "left-0 z-50 w-full origin-left",
        container ? "absolute" : "fixed",
        position === "top" ? "top-0" : "bottom-0",
        className,
      )}
      style={{
        scaleX: followsSpring ? smoothed : scrollYProgress,
        height,
        background: color,
      }}
    />
  );
}

export default ScrollProgress;

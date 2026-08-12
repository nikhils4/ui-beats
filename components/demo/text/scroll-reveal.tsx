"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

interface ScrollRevealProps {
  children: string;
  /** Opacity of a word before it is reached. */
  restingOpacity?: number;
  /** How much of the viewport the reveal is spread across, 0-1. */
  spread?: number;
  className?: string;
}

/**
 * Text that lights up word by word as the reader scrolls past it.
 *
 * Each word maps its own slice of the container's scroll progress, so the
 * reveal tracks the scrollbar exactly — scroll back up and it un-reveals.
 * A time-based stagger would drift out of sync with the reader.
 */
export function ScrollReveal({
  children,
  restingOpacity = 0.15,
  spread = 0.5,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", `end ${spread}`],
  });

  const words = children.split(" ");

  if (prefersReducedMotion) {
    return <p className={className}>{children}</p>;
  }

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;

        return (
          <Word
            key={`${word}-${index}`}
            progress={scrollYProgress}
            range={[start, end]}
            restingOpacity={restingOpacity}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  restingOpacity: number;
}

function Word({ children, progress, range, restingOpacity }: WordProps) {
  const opacity = useTransform(progress, range, [restingOpacity, 1]);
  // A touch of blur on the way in makes the arrival read as focus rather than
  // as a flat fade.
  const filter = useTransform(progress, range, [
    "blur(4px)",
    "blur(0px)",
  ] as const);

  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity, filter }}>{children}</motion.span>
    </span>
  );
}

export default ScrollReveal;

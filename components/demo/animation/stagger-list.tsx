"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";

interface StaggerListProps {
  children: ReactNode;
  /** Seconds between each child's entrance. */
  stagger?: number;
  /** Seconds before the first child animates. */
  delay?: number;
  /** Duration of each child's entrance, in seconds. */
  duration?: number;
  /** Travel distance of the entrance, in pixels. */
  distance?: number;
  direction?: "up" | "down" | "left" | "right";
  /** Animate only the first time the list enters the viewport. */
  once?: boolean;
  className?: string;
}

const offsetFor = (direction: StaggerListProps["direction"], d: number) => {
  switch (direction) {
    case "down":
      return { y: -d };
    case "left":
      return { x: d };
    case "right":
      return { x: -d };
    default:
      return { y: d };
  }
};

/**
 * Animates its children into view one after another. Each direct child is
 * wrapped, so any markup can be staggered without changing the child itself.
 */
export function StaggerList({
  children,
  stagger = 0.08,
  delay = 0,
  duration = 0.5,
  distance = 24,
  direction = "up",
  once = true,
  className = "",
}: StaggerListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();

  /*
   * The stagger goes too, not just the travel. A long list under reduced
   * motion would otherwise still reveal itself one row at a time over several
   * seconds, which is the same distraction the setting asks to be spared.
   */
  const container: Variants = {
    hidden: {},
    visible: prefersReducedMotion
      ? {}
      : { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const item: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, x: 0, y: 0 },
        visible: { opacity: 1, x: 0, y: 0 },
      }
    : {
        hidden: { opacity: 0, ...offsetFor(direction, distance) },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Array.map over children rather than cloneElement, so children keep
          their own props and refs untouched. */}
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={item}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={item}>{children}</motion.div>
      )}
    </motion.div>
  );
}

export default StaggerList;

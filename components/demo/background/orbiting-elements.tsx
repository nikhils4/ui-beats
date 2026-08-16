"use client";

import { motion, useReducedMotion } from "motion/react";
import { Children, type ReactNode } from "react";

interface OrbitingElementsProps {
  children: ReactNode;
  /** Orbit radius in pixels. */
  radius?: number;
  /** Seconds for one full revolution. */
  duration?: number;
  reverse?: boolean;
  /** Draw the orbit path itself. */
  showPath?: boolean;
  /** Degrees to offset the first item by. */
  startAngle?: number;
  className?: string;
}

/**
 * Places children evenly around a circle and rotates them around a centre
 * point.
 *
 * Each item sits on a rotating arm and counter-rotates at the same speed, so
 * it travels the orbit while staying upright; icons and text never end up
 * upside down at the bottom of the circle.
 */
export function OrbitingElements({
  children,
  radius = 100,
  duration = 20,
  reverse = false,
  showPath = true,
  startAngle = 0,
  className = "",
}: OrbitingElementsProps) {
  const items = Children.toArray(children);
  const prefersReducedMotion = useReducedMotion();
  const spin = reverse ? -360 : 360;

  const transition = {
    duration,
    repeat: Infinity,
    ease: "linear" as const,
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ width: radius * 2, height: radius * 2 }}
    >
      {showPath ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-dashed border-border"
        />
      ) : null}

      {items.map((item, index) => {
        const angle = startAngle + (360 / items.length) * index;

        return (
          <motion.div
            key={index}
            className="absolute top-1/2 left-1/2 size-0"
            // The arm: rotates around the centre, carrying the item at
            // `radius` along its length.
            initial={{ rotate: angle }}
            animate={
              prefersReducedMotion ? undefined : { rotate: angle + spin }
            }
            transition={transition}
          >
            {/* `w-max` on both wrappers matters: the arm above is `size-0` so
                the orbit pivots on a point, and without it these inherit a
                zero-width containing block and squash the item into a sliver. */}
            <div
              className="w-max"
              style={{ transform: `translateX(${radius}px)` }}
            >
              <motion.div
                // Counter-rotation, same duration and easing, so the item
                // holds its upright orientation for the whole orbit.
                initial={{ rotate: -angle }}
                animate={
                  prefersReducedMotion ? undefined : { rotate: -angle - spin }
                }
                transition={transition}
                className="flex w-max -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              >
                {item}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default OrbitingElements;

"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

interface SparklingGridProps {
  /** Spacing between dots, in pixels. */
  gridSize?: number;
  /** Chance (0–1) that a given dot sparkles on each of its ticks. */
  sparkleFrequency?: number;
  className?: string;
}

/**
 * An animated grid of dots that ripples outward on mount, then sparkles at
 * random.
 *
 * Colour comes from `currentColor`, so it inherits whatever text colour the
 * parent sets and follows the theme with no JS involved.
 */
export function SparklingGrid({
  gridSize = 30,
  sparkleFrequency = 0.03,
  className = "",
}: SparklingGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Every timer is tracked so unmount can cancel all of them. The previous
    // version left the sparkle loop rescheduling itself forever after the
    // component was gone.
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
      return id;
    };

    const build = () => {
      container.replaceChildren();

      const { offsetWidth: width, offsetHeight: height } = container;
      if (width === 0 || height === 0) return;

      const rows = Math.ceil(height / gridSize);
      const cols = Math.ceil(width / gridSize);
      const centerRow = rows / 2;
      const centerCol = cols / 2;
      const maxDistance = Math.hypot(centerRow, centerCol) || 1;

      const fragment = document.createDocumentFragment();

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const dot = document.createElement("span");
          dot.className =
            "absolute size-[3px] rounded-full bg-current transition-all duration-700";
          dot.style.left = `${col * gridSize}px`;
          dot.style.top = `${row * gridSize}px`;

          if (prefersReducedMotion) {
            dot.style.opacity = "0.2";
            fragment.appendChild(dot);
            continue;
          }

          dot.style.opacity = "0";
          dot.style.transform = "scale(0)";
          fragment.appendChild(dot);

          // Distance from the centre drives the delay, which is what makes
          // the grid appear as an outward ripple.
          const delay =
            (Math.hypot(col - centerCol, row - centerRow) / maxDistance) * 1200;

          later(() => {
            dot.style.opacity = "0.2";
            dot.style.transform = "scale(1)";
          }, delay);

          const sparkle = () => {
            if (Math.random() < sparkleFrequency) {
              dot.style.opacity = "1";
              dot.style.boxShadow = "0 0 6px currentColor";
              later(() => {
                dot.style.opacity = "0.2";
                dot.style.boxShadow = "";
              }, 400);
            }
            later(sparkle, 1000 + Math.random() * 4000);
          };

          later(sparkle, delay + 1000);
        }
      }

      container.appendChild(fragment);
    };

    build();

    // Rebuild when the container resizes, so the grid fills a responsive
    // parent instead of keeping its first-paint dimensions.
    const observer = new ResizeObserver(() => build());
    observer.observe(container);

    return () => {
      observer.disconnect();
      for (const id of timers) clearTimeout(id);
      timers.clear();
      container.replaceChildren();
    };
    // Primitive deps only. The old effect listed the `sparkleColor` and
    // `dotColor` object props, which are fresh literals on every render when
    // defaulted — so it tore down and rebuilt the entire grid continuously.
  }, [gridSize, sparkleFrequency, prefersReducedMotion]);

  return (
    <motion.div
      ref={containerRef}
      aria-hidden="true"
      // No negative z-index. `-z-50` put the dots behind the parent's own
      // background, which is why the grid rendered as nothing inside the docs
      // preview. Consumers layer their content with `relative z-10` instead.
      className={`pointer-events-none absolute inset-0 overflow-hidden text-foreground ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    />
  );
}

export default SparklingGrid;

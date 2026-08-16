"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type RefObject } from "react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: string;
  title: string;
  /** Small line above the title — a date, a version, a stage. */
  meta?: string;
  body: string;
}

interface TimelineProps {
  items: TimelineItem[];
  /**
   * Scroll container to track. Omit to track the window.
   *
   * The rail is measured against this, so a timeline inside a scrolling panel
   * has to name that panel or the fill will follow the page instead.
   */
  container?: RefObject<HTMLElement | null>;
  /** Diameter of each node, in pixels. */
  nodeSize?: number;
  /** Ease the rail toward the true position instead of tracking it exactly. */
  smooth?: boolean;
  className?: string;
}

/**
 * A vertical list of events with a rail that fills as it is read.
 *
 * The fill is `scaleY` on a single element rather than a changing height, so
 * the browser never runs layout for a value that updates on every scroll
 * frame. Its progress comes from the list's own position in the scroller,
 * which is what keeps the filled length honest: the rail is as full as the
 * reader is far through the entries, not as far as some fraction of the page.
 *
 * The `offset` finishes the fill before the last entry leaves the viewport.
 * Measuring to `end end` means the rail only completes once the list's bottom
 * edge reaches the bottom of the screen, which for a list that ends above the
 * fold never happens at all.
 *
 * Entries reveal on entry rather than on the rail's progress so that each one
 * animates once, in place, however the reader arrives at it.
 */
export function Timeline({
  items,
  container,
  nodeSize = 12,
  smooth = true,
  className = "",
}: TimelineProps) {
  const prefersReducedMotion = useReducedMotion();
  const railRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    ...(container ? { container } : {}),
    offset: ["start 85%", "end 65%"],
  });

  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  /*
   * The fill survives reduced motion — it moves only because the reader is
   * scrolling, and pinning it at zero would leave a rail that is permanently
   * wrong. The spring does not: it keeps travelling after the scroll stops.
   */
  const scaleY = useTransform(
    smooth && !prefersReducedMotion ? smoothed : scrollYProgress,
    (value) => Math.max(value, 0),
  );

  return (
    <ol ref={railRef} className={cn("relative w-full", className)}>
      {/* The unfilled rail, and the fill that rides on top of it. */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 w-px bg-border"
        style={{ left: nodeSize / 2 }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute top-2 bottom-2 w-px origin-top bg-primary"
        style={{ left: nodeSize / 2, scaleY }}
      />

      {items.map((item, index) => (
        <motion.li
          key={item.id}
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 16, filter: "blur(4px)" }
          }
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
            // A short stagger only within the entries that arrive together.
            delay: prefersReducedMotion ? 0 : Math.min(index, 3) * 0.06,
          }}
          className="relative pb-8 last:pb-0"
          style={{ paddingLeft: nodeSize + 20 }}
        >
          <span
            aria-hidden="true"
            className="absolute top-2 rounded-full border-2 border-background bg-primary"
            style={{ left: 0, width: nodeSize, height: nodeSize }}
          />

          {item.meta ? (
            <p className="text-xs text-muted-foreground">{item.meta}</p>
          ) : null}
          <h3 className="text-sm font-medium">{item.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {item.body}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}

export default Timeline;

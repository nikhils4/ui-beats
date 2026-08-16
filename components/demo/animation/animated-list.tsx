"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Children, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedListProps {
  /** One entry per child, emitted in order. */
  children: ReactNode;
  /** Milliseconds between entries arriving. */
  delay?: number;
  /** How many entries stay on screen before the oldest is dropped. */
  max?: number;
  /** Start over once the last child has been emitted. */
  loop?: boolean;
  /** Announce arrivals to screen readers, for genuinely live content. */
  live?: boolean;
  className?: string;
}

/**
 * A feed where entries arrive one at a time, pushing the ones already there
 * down and out of the bottom of the list.
 *
 * Only `max` entries are mounted at once, so a feed that has been running for
 * an hour costs exactly what it did in its first second. The shuffle is a
 * layout animation rather than hand-computed offsets: each surviving entry
 * animates from wherever it was to wherever the new arrival pushed it.
 *
 * Nothing here is real notification content; if you wire it to some, turn on
 * `live` so the arrivals are announced rather than appearing silently.
 */
export function AnimatedList({
  children,
  delay = 1400,
  max = 4,
  loop = true,
  live = false,
  className = "",
}: AnimatedListProps) {
  const entries = Children.toArray(children);
  const prefersReducedMotion = useReducedMotion();
  // Total emitted so far. The newest entry is always `emitted - 1`, which
  // makes it its own stable key however many laps the list has run.
  const [emitted, setEmitted] = useState(1);

  const finished = !loop && emitted >= entries.length;

  useEffect(() => {
    if (entries.length === 0 || finished || prefersReducedMotion) return;
    const timer = setTimeout(() => setEmitted((count) => count + 1), delay);
    return () => clearTimeout(timer);
  }, [emitted, delay, entries.length, finished, prefersReducedMotion]);

  if (entries.length === 0) return null;

  // Reduced motion gets the finished list, not a silent animation: the point
  // of the component is the arrival, and there is no quiet way to show it.
  const visibleEntries = prefersReducedMotion
    ? entries.slice(0, max).map((node, position) => ({ key: position, node }))
    : Array.from(
        { length: Math.min(emitted, max, entries.length) },
        (_, position) => {
          const sequence = emitted - 1 - position;
          return { key: sequence, node: entries[sequence % entries.length] };
        },
      );

  return (
    <div
      role="list"
      aria-live={live ? "polite" : undefined}
      aria-relevant={live ? "additions" : undefined}
      className={cn("flex w-full flex-col gap-2", className)}
    >
      <AnimatePresence initial={false}>
        {visibleEntries.map(({ key, node }, position) => (
          <motion.div
            key={key}
            role="listitem"
            layout={!prefersReducedMotion}
            initial={{ opacity: 0, scale: 0.9, y: -28 }}
            animate={{
              // Older entries fade as they sink, so the list ends in a falloff
              // rather than a hard cut at the last row.
              opacity: 1 - position * 0.18,
              scale: 1,
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            style={{ transformOrigin: "top center" }}
          >
            {node}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default AnimatedList;

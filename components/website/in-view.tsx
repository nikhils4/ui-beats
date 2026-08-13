"use client";

import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InViewProps {
  children: ReactNode;
  className?: string;
  /** How far ahead of the viewport to start mounting. */
  margin?: `${number}px`;
}

/**
 * Mounts its children the first time they come near the viewport.
 *
 * The showcase runs a dozen live components at once, several of them driving
 * an animation frame loop. Mounting all of them on load means the browser is
 * animating a card stack, a departure board and a scrolling grid that are
 * three screens below the fold, competing with the hero for the main thread.
 *
 * Once mounted, children stay mounted. A demo that restarted every time it
 * scrolled past would be worse than one that never animated at all.
 */
export function InView({ children, className, margin = "240px" }: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin });

  return (
    <div ref={ref} className={cn("size-full", className)}>
      {isInView ? (
        children
      ) : (
        // Holds the space at the demo's own size so nothing shifts when it
        // arrives, and reads as a surface rather than a hole while it waits.
        <div
          aria-hidden="true"
          className="size-full animate-pulse rounded-xl bg-muted/40"
        />
      )}
    </div>
  );
}

"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useId, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

interface DotPatternProps {
  /** Distance between dot centres, in pixels. */
  spacing?: number;
  /** Diameter of each dot, in pixels. */
  dotSize?: number;
  /** Light the dots nearest the pointer. */
  glow?: boolean;
  /** Radius of the lit area around the pointer, in pixels. */
  glowRadius?: number;
  className?: string;
}

/**
 * A grid of dots that brightens around the pointer.
 *
 * Two copies of the same SVG pattern, one dim and one at full strength, with
 * the bright copy revealed through a radial mask that follows the cursor. That
 * is why the lit dots line up exactly with the dim ones: it is the same grid
 * twice, not a second grid drawn near the pointer.
 *
 * The mask is driven by motion values rather than state, so pointer movement
 * never re-renders the component; a `setState` per `pointermove` over a
 * full-bleed background is the version of this that drops frames on a laptop.
 *
 * Dots are painted with `currentColor`, so the grid takes the text colour of
 * whatever wraps it and needs nothing from the theme.
 */
export function DotPattern({
  spacing = 20,
  dotSize = 1.4,
  glow = true,
  glowRadius = 160,
  className = "",
}: DotPatternProps) {
  const prefersReducedMotion = useReducedMotion();
  // Two patterns on a page would otherwise share an id and one would win.
  const patternId = useId();

  const pointerX = useMotionValue(-glowRadius * 2);
  const pointerY = useMotionValue(-glowRadius * 2);

  const mask = useMotionTemplate`radial-gradient(${glowRadius}px circle at ${pointerX}px ${pointerY}px, #000 0%, transparent 100%)`;

  // Following the cursor is motion, so the preference turns the bright layer
  // off entirely and leaves the grid it sits on.
  const tracking = glow && !prefersReducedMotion;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - bounds.left);
    pointerY.set(event.clientY - bounds.top);
  };

  const handlePointerLeave = () => {
    pointerX.set(-glowRadius * 2);
    pointerY.set(-glowRadius * 2);
  };

  const grid = (
    <svg className="size-full">
      <defs>
        <pattern
          id={patternId}
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={spacing / 2}
            cy={spacing / 2}
            r={dotSize / 2}
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );

  return (
    <div
      aria-hidden="true"
      onPointerMove={tracking ? handlePointerMove : undefined}
      onPointerLeave={tracking ? handlePointerLeave : undefined}
      className={cn(
        "absolute inset-0 overflow-hidden",
        // Only claim the pointer when there is something to do with it.
        tracking ? "" : "pointer-events-none",
        className,
      )}
    >
      <div className="absolute inset-0 opacity-30">{grid}</div>

      {tracking ? (
        <motion.div
          className="absolute inset-0"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
        >
          {grid}
        </motion.div>
      ) : null}
    </div>
  );
}

export default DotPattern;

"use client";

import {
  useAnimationFrame,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  children: ReactNode;
  /** Thickness of the animated border, in pixels. */
  borderWidth?: number;
  /** Seconds for the beam to travel once around the element. */
  duration?: number;
  /** Leading colour of the beam. */
  colorFrom?: string;
  /** Trailing colour, faded out into the border. */
  colorTo?: string;
  /** Arc the beam covers, in degrees. Smaller reads as a sharper streak. */
  arc?: number;
  /** Paint a blurred copy underneath, so the beam bleeds onto the page. */
  glow?: boolean;
  className?: string;
}

/**
 * A container whose border is traced by a travelling beam of light.
 *
 * The ring is a single element carrying a conic gradient, masked so only the
 * border area paints: `mask-composite` subtracts the content box from the
 * padding box, leaving a band exactly `borderWidth` thick. That is why the
 * beam follows rounded corners exactly: it is the element's own shape, not a
 * dot being animated around an approximation of it.
 *
 * The angle is driven by a motion value written from `useAnimationFrame`
 * rather than a React state tick, so the beam costs one style write per frame
 * and never re-renders the subtree it wraps.
 */
export function BorderBeam({
  children,
  borderWidth = 1.5,
  duration = 6,
  colorFrom = "#a855f7",
  colorTo = "#22d3ee",
  arc = 70,
  glow = true,
  className = "",
}: BorderBeamProps) {
  const prefersReducedMotion = useReducedMotion();
  const angle = useMotionValue(0);

  useAnimationFrame((elapsed) => {
    if (prefersReducedMotion) return;
    // `elapsed` is milliseconds since the component mounted, so the beam is
    // continuous across re-renders and never jumps when props change.
    angle.set((elapsed / (duration * 1000)) * 360);
  });

  // Transparent everywhere except the arc, which fades from the head colour
  // into the tail colour and then out: a streak rather than a hard wedge.
  const stops = `transparent 0deg, ${colorTo} ${arc * 0.45}deg, ${colorFrom} ${arc}deg, transparent ${arc + 0.5}deg`;
  const background = useMotionTemplate`conic-gradient(from ${angle}deg at 50% 50%, ${stops})`;

  const ring = {
    background,
    padding: borderWidth,
    // Keep only the padding-box ring: paint the whole box, then punch out
    // everything inside the content box.
    WebkitMask:
      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    maskComposite: "exclude",
  } as const;

  return (
    <div className={cn("relative isolate rounded-xl", className)}>
      {glow ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-70 blur-md"
          style={ring}
        />
      ) : null}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        style={ring}
      />

      {/* The resting border stays underneath, so the element still reads as a
          bordered card in the stretch the beam is not lighting. */}
      <div className="relative h-full rounded-[inherit] border bg-card">
        {children}
      </div>
    </div>
  );
}

export default BorderBeam;

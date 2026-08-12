"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useState, type RefObject } from "react";

interface AnimatedBeamProps {
  /** The positioned element both refs live inside. */
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  /** Arc height in pixels. Positive bows up, negative bows down, 0 is straight. */
  curvature?: number;
  /** Send the pulse from `toRef` to `fromRef` instead. */
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  gradientStart?: string;
  gradientStop?: string;
  className?: string;
}

/**
 * Draws a curved beam between two elements and sends a gradient pulse along
 * it.
 *
 * The path is measured from the live geometry of the two elements rather than
 * hardcoded, so it survives responsive reflow, font loading and content
 * changes — a `ResizeObserver` on the container recomputes it whenever
 * anything moves.
 */
export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 3,
  delay = 0,
  pathColor = "var(--border)",
  gradientStart = "var(--brand)",
  gradientStop = "var(--accent-pink)",
  className = "",
}: AnimatedBeamProps) {
  // `useId` keeps the gradient id unique — two beams on one page sharing an id
  // would both resolve to whichever was defined last.
  const gradientId = useId();
  const [path, setPath] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });
  const prefersReducedMotion = useReducedMotion();

  const measure = useCallback(() => {
    const container = containerRef.current;
    const from = fromRef.current;
    const to = toRef.current;
    if (!container || !from || !to) return;

    const containerRect = container.getBoundingClientRect();
    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();

    setSize({ width: containerRect.width, height: containerRect.height });

    // Centres, expressed relative to the container's own coordinate space.
    const startX = fromRect.left - containerRect.left + fromRect.width / 2;
    const startY = fromRect.top - containerRect.top + fromRect.height / 2;
    const endX = toRect.left - containerRect.left + toRect.width / 2;
    const endY = toRect.top - containerRect.top + toRect.height / 2;

    const controlX = (startX + endX) / 2;
    const controlY = (startY + endY) / 2 - curvature;

    setPath(`M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`);
  }, [containerRef, fromRef, toRef, curvature]);

  useEffect(() => {
    measure();

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    // Watch the endpoints too: the container can hold its size while the
    // elements inside it move.
    if (fromRef.current) observer.observe(fromRef.current);
    if (toRef.current) observer.observe(toRef.current);

    return () => observer.disconnect();
  }, [measure, containerRef, fromRef, toRef]);

  if (!path) return null;

  return (
    <svg
      fill="none"
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 left-0 ${className}`}
    >
      <path
        d={path}
        stroke={pathColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeOpacity={0.4}
      />
      <path
        d={path}
        stroke={`url(#${gradientId})`}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          // A narrow gradient window slid across the path is what reads as a
          // pulse travelling along the wire.
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={
            prefersReducedMotion
              ? { x1: "0%", x2: "100%", y1: "0%", y2: "0%" }
              : {
                  x1: reverse ? ["100%", "-10%"] : ["-10%", "100%"],
                  x2: reverse ? ["110%", "0%"] : ["0%", "110%"],
                  y1: ["0%", "0%"],
                  y2: ["0%", "0%"],
                }
          }
          transition={{
            duration,
            delay,
            repeat: prefersReducedMotion ? 0 : Infinity,
            repeatDelay: 0.4,
            ease: "easeInOut",
          }}
        >
          <stop stopColor={gradientStart} stopOpacity="0" />
          <stop stopColor={gradientStart} />
          <stop offset="32.5%" stopColor={gradientStop} />
          <stop offset="100%" stopColor={gradientStop} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}

export default AnimatedBeam;

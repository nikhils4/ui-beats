"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Pixels travelled per second. */
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  /** Fade the leading and trailing edges into the background. */
  fadeEdges?: boolean;
  className?: string;
}

/**
 * A seamless, infinitely scrolling row.
 *
 * Driven by `useAnimationFrame` against a motion value rather than a CSS
 * keyframe. That costs nothing extra and buys two things a keyframe cannot:
 * pausing mid-travel without a jump, and a wrap point measured from the real
 * rendered width, so any content loops seamlessly without hand-tuned timings.
 */
export function Marquee({
  children,
  speed = 60,
  direction = "left",
  pauseOnHover = true,
  fadeEdges = true,
  className = "",
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const [halfWidth, setHalfWidth] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    // The content is rendered twice, so one loop is half the track.
    setHalfWidth(track.scrollWidth / 2);
  }, []);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  useAnimationFrame((_, delta) => {
    if (paused || halfWidth === 0 || prefersReducedMotion) return;

    // delta is milliseconds since the last frame, so movement stays constant
    // regardless of refresh rate.
    const step = (speed * delta) / 1000;
    let next = x.get() + (direction === "left" ? -step : step);

    // Wrap by exactly one copy's width; the seam is never visible.
    if (next <= -halfWidth) next += halfWidth;
    if (next >= 0) next -= halfWidth;

    x.set(next);
  });

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={
        fadeEdges
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            }
          : undefined
      }
      onPointerEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onPointerLeave={pauseOnHover ? () => setPaused(false) : undefined}
    >
      <motion.div ref={trackRef} style={{ x }} className="flex w-max">
        <div className="flex shrink-0 items-center">{children}</div>
        {/* The duplicate is decorative — screen readers should hear the list
            once, not twice. */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default Marquee;

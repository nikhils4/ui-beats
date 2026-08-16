"use client";

import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

interface TextShineProps {
  text: string;
  /** Colour of the highlight that sweeps across the text. */
  shineColor?: string;
  /** Colour of the text itself. Any CSS colour, including a custom property. */
  baseColor?: string;
  /** Seconds for one sweep. */
  duration?: number;
  className?: string;
}

/**
 * Text with a highlight that sweeps across it.
 *
 * `baseColor` defaults to the theme's foreground rather than a hardcoded
 * `#222`, which was all but invisible against a dark background. Because the
 * text is painted with `background-clip: text`, the base colour has to be a
 * real colour value; `currentColor` resolves to `transparent` here.
 */
export function TextShine({
  text,
  shineColor = "#FFD700",
  baseColor = "var(--foreground)",
  duration = 5,
  className = "",
}: TextShineProps) {
  const controls = useAnimationControls();
  const textRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const updateAnimation = useCallback(() => {
    const element = textRef.current;
    if (!element || prefersReducedMotion) return;

    const textWidth = element.offsetWidth;

    controls.start({
      backgroundPosition: [`${textWidth * -0.5}px`, `${textWidth * 1.25}px`],
      transition: { duration, ease: "linear", repeat: Infinity },
    });
  }, [controls, duration, prefersReducedMotion]);

  useEffect(() => {
    updateAnimation();
    window.addEventListener("resize", updateAnimation);
    return () => window.removeEventListener("resize", updateAnimation);
  }, [updateAnimation]);

  return (
    <motion.span
      ref={textRef}
      className={`relative w-fit bg-clip-text text-2xl font-bold text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${baseColor} 0%, ${shineColor} 10%, ${baseColor} 20%)`,
        backgroundSize: "200%",
      }}
      animate={controls}
    >
      {text}
    </motion.span>
  );
}

export default TextShine;

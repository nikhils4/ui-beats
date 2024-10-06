"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";

interface TextShineProps {
  text: string;
  shineColor: string;
  duration: number;
}

export const TextShine: React.FC<TextShineProps> = ({
  text,
  shineColor,
  duration,
}) => {
  const controls = useAnimationControls();
  const textRef = useRef<HTMLSpanElement>(null);

  const updateAnimation = useCallback(() => {
    if (textRef.current) {
      const textWidth = textRef.current.offsetWidth;
      const startPos = textWidth * -0.5;
      const endPos = textWidth * 1.25;

      controls.start({
        backgroundPosition: [`${startPos}px`, `${endPos}px`],
        transition: {
          duration,
          ease: "linear",
          repeat: Infinity,
        },
      });
    }
  }, [controls]);

  useEffect(() => {
    updateAnimation();
    window.addEventListener("resize", updateAnimation);

    return () => {
      window.removeEventListener("resize", updateAnimation);
    };
  }, [updateAnimation]);

  return (
    <motion.span
      ref={textRef}
      className="relative w-fit text-transparent bg-clip-text"
      style={{
        backgroundImage: `linear-gradient(to right, #222 0%, ${shineColor} 10%, #222 20%)`,
        backgroundSize: "200%",
      }}
      animate={controls}
    >
      {text}
    </motion.span>
  );
};

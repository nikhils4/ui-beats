"use client";
import React from "react";
import { motion } from "framer-motion";

interface ShimmerEffectProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  duration?: number;
  className?: string;
}

const ShimmerEffect: React.FC<ShimmerEffectProps> = ({
  width = "100%",
  height = "1rem",
  borderRadius = "0.25rem",
  duration = 1.5,
  className = "",
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        overflow: "hidden",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
      className={className}
      aria-hidden="true"
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          )`,
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: duration,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default ShimmerEffect;

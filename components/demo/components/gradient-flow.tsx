import React from "react";
import { motion } from "framer-motion";

interface GradientFlowProps {
  children: React.ReactNode;
  duration?: number;
  colors?: string[];
  className?: string;
  fullWidth?: boolean;
  radialOverlay?: boolean;
  blurAmount?: string;
}

const GradientFlow: React.FC<GradientFlowProps> = ({
  children,
  duration = 20,
  colors = ["#6366f1", "#2563eb", "#7c3aed", "#db2777"],
  className = "",
  fullWidth = false,
  radialOverlay = true,
  blurAmount = "10px",
}) => {
  const gradientString = `linear-gradient(135deg, ${colors.join(", ")})`;
  const radialGradient =
    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)";

  return (
    <div
      className={`relative overflow-hidden ${
        fullWidth ? "w-full h-full" : ""
      } ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: gradientString,
          backgroundSize: "400% 400%",
          filter: `blur(${blurAmount})`,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {radialOverlay && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: radialGradient,
            mixBlendMode: "overlay",
          }}
        />
      )}
      <div className="relative z-10 flex items-center justify-center w-full h-full backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};

export default GradientFlow;

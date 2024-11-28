"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface SparklingGridProps {
  gridSize?: number;
  sparkleFrequency?: number;
  sparkleColor?: {
    light: string;
    dark: string;
  };
  dotColor?: {
    light: string;
    dark: string;
  };
  theme: "light" | "dark";
}

export const SparklingGrid: React.FC<SparklingGridProps> = ({
  gridSize = 30,
  sparkleFrequency = 0.03,
  sparkleColor = { light: "darkgray", dark: "silver" },
  dotColor = { light: "bg-black/20", dark: "bg-white/20" },
  theme = "light",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rows = Math.ceil(container.offsetHeight / gridSize);
    const cols = Math.ceil(container.offsetWidth / gridSize);

    const createDot = (row: number, col: number) => {
      const dot = document.createElement("div");
      dot.className = `absolute w-0.5 h-0.5 rounded-full ${
        theme === "dark" ? dotColor.dark : dotColor.light
      } transition-all duration-1500`;
      dot.style.left = `${col * gridSize}px`;
      dot.style.top = `${row * gridSize}px`;
      dot.style.opacity = "0";
      dot.style.transform = "scale(0) rotate(0deg)";
      container.appendChild(dot);

      const centerRow = rows / 2;
      const centerCol = cols / 2;
      const dx = col - centerCol;
      const dy = row - centerRow;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = Math.sqrt(
        centerRow * centerRow + centerCol * centerCol
      );
      const delay = (distance / maxDistance) * 2000;

      setTimeout(() => {
        dot.style.opacity = "1";
        dot.style.transform = "scale(1.2) rotate(360deg)";
      }, delay);

      setTimeout(() => {
        dot.style.transform = "scale(1) rotate(360deg)";
      }, delay + 500);

      setTimeout(() => {
        const sparkle = () => {
          if (Math.random() < sparkleFrequency) {
            dot.style.backgroundColor =
              theme === "dark" ? sparkleColor.dark : sparkleColor.light;
            dot.style.boxShadow = `0 0 5px ${
              theme === "dark" ? "white" : "black"
            }`;
            setTimeout(() => {
              dot.style.backgroundColor = "";
              dot.style.boxShadow = "";
            }, 300);
          }
          setTimeout(sparkle, 1000 + Math.random() * 4000);
        };
        sparkle();
      }, delay + 1000);
    };

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        createDot(row, col);
      }
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [theme, gridSize, sparkleFrequency, sparkleColor, dotColor]);

  return (
    <motion.div
      ref={containerRef}
      className="absolute -z-50 top-0 inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
};

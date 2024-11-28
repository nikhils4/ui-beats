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
}

export const SparklingGrid: React.FC<SparklingGridProps> = ({
  gridSize = 30,
  sparkleFrequency = 0.03,
  sparkleColor = { light: "darkgray", dark: "silver" },
  dotColor = { light: "bg-black/20", dark: "bg-white/20" },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rows = Math.ceil(container.offsetHeight / gridSize);
    const cols = Math.ceil(container.offsetWidth / gridSize);

    const createDot = (row: number, col: number) => {
      const dot = document.createElement("div");
      // Remove the bg- prefix from the classes since we're setting backgroundColor directly
      const lightClass = dotColor.light.replace("bg-", "");
      const darkClass = dotColor.dark.replace("bg-", "");
      dot.className = `absolute w-0.5 h-0.5 rounded-full transition-all duration-1500`;
      dot.style.left = `${col * gridSize}px`;
      dot.style.top = `${row * gridSize}px`;
      dot.style.opacity = "0";
      dot.style.transform = "scale(0) rotate(0deg)";
      
      // Set initial background color based on dark mode
      if (document.documentElement.classList.contains("dark")) {
        dot.style.backgroundColor = "rgba(255, 255, 255, 0.2)"; // white/20
      } else {
        dot.style.backgroundColor = "rgba(0, 0, 0, 0.2)"; // black/20
      }
      
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
            const isDark = document.documentElement.classList.contains("dark");
            dot.style.backgroundColor = isDark ? sparkleColor.dark : sparkleColor.light;
            dot.style.boxShadow = isDark ? "0 0 5px white" : "0 0 5px black";
            
            setTimeout(() => {
              dot.style.backgroundColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
              dot.style.boxShadow = "";
            }, 300);
          }
          setTimeout(sparkle, 1000 + Math.random() * 4000);
        };
        sparkle();
      }, delay + 1000);

      // Listen for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            const isDark = document.documentElement.classList.contains("dark");
            dot.style.backgroundColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
          }
        });
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
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
  }, [gridSize, sparkleFrequency, sparkleColor, dotColor]);

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

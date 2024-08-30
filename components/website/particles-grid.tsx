"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export const ParticleGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const pathname = usePathname();
  const shouldRenderParticles = pathname === "/";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const gridSize = 30;
    const rows = Math.ceil(container.offsetHeight / gridSize);
    const cols = Math.ceil(container.offsetWidth / gridSize);

    const createDot = (row: number, col: number) => {
      const dot = document.createElement("div");
      dot.className = `absolute w-0.5 h-0.5 rounded-full ${
        theme === "dark" ? "bg-white/20" : "bg-black/20"
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
      const delay = (distance / maxDistance) * 2000; // Increased delay for more visible radial pattern

      setTimeout(() => {
        dot.style.opacity = "1";
        dot.style.transform = "scale(1.2) rotate(360deg)"; // Slightly increased scale for visibility
      }, delay);

      setTimeout(() => {
        dot.style.transform = "scale(1) rotate(360deg)"; // Return to normal scale
      }, delay + 500); // Additional 500ms for the scale-down animation
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
  }, [theme]);

  if (!shouldRenderParticles) {
    return null;
  }

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

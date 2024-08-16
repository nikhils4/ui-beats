"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FlipCardProps {
  frontContent: {
    title: string;
    subtitle?: string;
  };
  backContent: {
    title: string;
    description: string;
  };
  width?: string;
  height?: string;
  flipDirection?: "horizontal" | "vertical";
  triggerMode?: "hover" | "click";
}

const FlipCard: React.FC<FlipCardProps> = ({
   frontContent,
   backContent,
   width = "300px",
   height = "200px",
   flipDirection = "horizontal",
   triggerMode = "hover",
 }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleFlip = () => {
    if (triggerMode === "click") {
      setIsFlipped(!isFlipped);
    }
  };

  const rotateValue =
      flipDirection === "horizontal" ? "rotateY(180deg)" : "rotateX(180deg)";

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const shineEffect = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 90%)`,
  };

  return (
      <div
          ref={cardRef}
          style={{ width, height, perspective: "1000px" }}
          onMouseEnter={() => triggerMode === "hover" && setIsFlipped(true)}
          onMouseLeave={() => triggerMode === "hover" && setIsFlipped(false)}
          onClick={toggleFlip}
          className="cursor-pointer relative overflow-hidden"
      >
        <motion.div
            className="w-full h-full relative"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ transform: isFlipped ? rotateValue : "none" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="absolute w-full h-full flex flex-col items-center justify-center p-6 backface-hidden rounded-2xl shadow-lg bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
              {frontContent.title}
            </h3>
            {frontContent.subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {frontContent.subtitle}
                </p>
            )}
            <ArrowRight className="absolute bottom-4 right-4 w-6 h-6 text-gray-400 dark:text-gray-500" />
          </div>
          <div
              className="absolute w-full h-full flex flex-col items-center justify-center p-6 backface-hidden rounded-2xl shadow-lg bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700"
              style={{ transform: rotateValue, backfaceVisibility: "hidden" }}
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              {backContent.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              {backContent.description}
            </p>
          </div>
        </motion.div>
        <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 hover:opacity-100"
            style={shineEffect}
        />
      </div>
  );
};

export default FlipCard;
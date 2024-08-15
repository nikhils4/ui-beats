"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GravityTextSwapProps {
  textArray: string[];
  duration?: number;
  pauseDuration?: number;
  className?: string;
}

const GravityTextSwap: React.FC<GravityTextSwapProps> = ({
  textArray,
  duration = 0.5,
  pauseDuration = 2,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState(textArray[0]);

  useEffect(() => {
    if (textArray.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % textArray.length;
        setCurrentText(textArray[nextIndex]);
        return nextIndex;
      });
    }, (duration + pauseDuration) * 1000);

    return () => clearInterval(intervalId);
  }, [textArray, duration, pauseDuration]);

  return (
    <div className={cn("inline-block overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentText}
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration / 2 }}
        >
          {currentText.split("").map((char, index) => (
            <motion.span
              key={index}
              className="inline-block"
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  damping: 12,
                  stiffness: 200,
                  delay: index * 0.03,
                },
              }}
              exit={{
                y: 20,
                opacity: 0,
                transition: {
                  duration: duration / 2,
                  delay: index * 0.02,
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default GravityTextSwap;

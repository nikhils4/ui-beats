"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import confetti from "canvas-confetti";
import { useState, useEffect } from "react";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.99 && !hasReachedEnd) {
      setHasReachedEnd(true);
    }
  });

  useEffect(() => {
    if (hasReachedEnd) {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 1, x: 0.5 },
        });
      } else {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.9, x: 0.1 },
          angle: 60,
        });
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.9, x: 0.9 },
          angle: 120,
        });
      }
    }
  }, [hasReachedEnd]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-400 to-purple-400 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

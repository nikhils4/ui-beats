"use client";
import React, { useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ScaleInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  scaleFrom?: number;
  className?: string;
  once?: boolean;
}

const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  duration = 0.5,
  delay = 0,
  scaleFrom = 0.8,
  className = "",
  once = true,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, once]);

  const variants: Variants = {
    hidden: { scale: scaleFrom, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScaleIn;

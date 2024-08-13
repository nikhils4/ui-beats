"use client";
import React, { useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface RotateInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  rotateFrom?: number;
  className?: string;
  once?: boolean;
}

const RotateIn: React.FC<RotateInProps> = ({
  children,
  duration = 0.5,
  delay = 0,
  rotateFrom = 90,
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
    hidden: { rotate: rotateFrom, opacity: 0 },
    visible: {
      rotate: 0,
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

export default RotateIn;

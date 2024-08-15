"use client";
import React, { useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface BounceProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  bounceHeight?: number;
  className?: string;
  once?: boolean;
}

const Bounce: React.FC<BounceProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  bounceHeight = 20,
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
    hidden: { opacity: 0, y: bounceHeight },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        type: "spring",
        stiffness: 200,
        damping: 10,
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

export default Bounce;

"use client";
import React from "react";
import { motion, Variants, useInView, useReducedMotion } from "motion/react";

interface FadeInUnblurProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const FadeInUnblur: React.FC<FadeInUnblurProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  /*
   * The settled state keeps `scale: 1.2`, which is where the animation ends,
   * and matching it is the point. Reducing it to 1 here would render the
   * component at a different size for these users than for everyone else.
   */
  const variants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, scale: 1.2, filter: "blur(0px)" },
        visible: { opacity: 1, scale: 1.2, filter: "blur(0px)" },
      }
    : {
        hidden: {
          opacity: 0,
          scale: 1.1,
          filter: "blur(4px)",
        },
        visible: {
          opacity: 1,
          scale: 1.2,
          filter: "blur(0px)",
          transition: {
            duration: duration,
            delay: delay,
            ease: [0.47, 0, 0.745, 0.715],
          },
        },
      };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInUnblur;

"use client";
import React from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";

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
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  // A quarter turn is the most vestibular-provoking entrance in the set, so
  // this one matters most: settled and unrotated from the first frame.
  const variants: Variants = prefersReducedMotion
    ? { hidden: { rotate: 0, opacity: 1 }, visible: { rotate: 0, opacity: 1 } }
    : {
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
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default RotateIn;

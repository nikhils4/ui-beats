"use client";
import React from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";

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
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  /*
   * Under reduced motion the element is settled from the first frame.
   * Dropping only the transition would not do: the `hidden` variant stays
   * applied until the element scrolls into view, so the content would sit
   * invisible and offset instead of simply not bouncing.
   */
  const variants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
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
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Bounce;

"use client";

import { useRef, type ReactNode, type ComponentPropsWithoutRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

/**
 * Native button props minus the handlers Motion redefines with its own
 * signatures — spreading React's DOM versions onto `motion.button` conflicts.
 */
type NativeButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  | "ref"
  | "style"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
>;

interface MagneticButtonProps extends NativeButtonProps {
  children: ReactNode;
  /** How far the button travels toward the pointer, in pixels. */
  strength?: number;
  /** Distance from the button, in pixels, at which it starts reacting. */
  radius?: number;
  className?: string;
}

/**
 * A button that drifts toward the pointer as it approaches, then springs back
 * when the pointer leaves.
 */
export function MagneticButton({
  children,
  strength = 18,
  radius = 120,
  className = "",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const spring = { stiffness: 200, damping: 15, mass: 0.4 };
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return;

    const rect = element.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy);

    if (distance > radius) {
      x.set(0);
      y.set(0);
      return;
    }

    // Falls off linearly with distance so the pull eases in.
    const pull = 1 - distance / radius;
    x.set((dx / radius) * strength * pull * 2);
    y.set((dy / radius) * strength * pull * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
      className={`inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default MagneticButton;

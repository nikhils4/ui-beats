"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  /** Colour of the ripple. Any CSS colour; alpha is worth keeping low. */
  rippleColor?: string;
  /** Seconds for one ripple to cross the button and fade. */
  duration?: number;
  /** Scale the button settles at while held. */
  pressScale?: number;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

/**
 * A button that ripples outward from wherever it was pressed.
 *
 * Each ripple is sized to reach the button's farthest corner from its own
 * origin, so a press near an edge still floods the whole surface instead of
 * stopping short: the detail that separates this from a centred circle that
 * happens to grow.
 *
 * Ripples are spawned on pointer *down* rather than click, because the
 * feedback belongs to the press, not the release. Keyboard activation has no
 * coordinates, so it ripples from the centre.
 */
export function RippleButton({
  children,
  onClick,
  rippleColor = "rgba(255, 255, 255, 0.45)",
  duration = 0.7,
  pressScale = 0.96,
  disabled = false,
  type = "button",
  className = "",
}: RippleButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const [ripples, setRipples] = useState<Ripple[]>([]);
  // A counter rather than a random id: keys stay stable and never collide,
  // and nothing here depends on randomness that could differ across renders.
  const nextId = useRef(0);

  const spawn = (element: HTMLElement, clientX?: number, clientY?: number) => {
    if (prefersReducedMotion) return;

    const bounds = element.getBoundingClientRect();
    const x = clientX === undefined ? bounds.width / 2 : clientX - bounds.left;
    const y = clientY === undefined ? bounds.height / 2 : clientY - bounds.top;

    // Distance to the farthest corner, doubled to give the circle's diameter.
    const size =
      2 *
      Math.max(
        Math.hypot(x, y),
        Math.hypot(bounds.width - x, y),
        Math.hypot(x, bounds.height - y),
        Math.hypot(bounds.width - x, bounds.height - y),
      );

    setRipples((current) => [...current, { id: nextId.current++, x, y, size }]);
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    /*
     * Only real pointers.
     *
     * Activating a button from the keyboard makes Chromium fire a synthetic
     * pointerdown with an empty `pointerType` at coordinates (0, 0), so
     * without this check Enter produced two ripples: one from the keyboard
     * branch below, and one starting from wherever the top-left of the
     * viewport happens to be relative to the button.
     */
    if (!event.pointerType) return;
    spawn(event.currentTarget, event.clientX, event.clientY);
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onPointerDown={handlePointerDown}
      onClick={(event) => {
        // `detail === 0` means the click came from the keyboard, which never
        // fires pointerdown. Without this, Enter and Space press the button
        // with no feedback at all.
        if (event.detail === 0) spawn(event.currentTarget);
        onClick?.();
      }}
      whileTap={
        disabled || prefersReducedMotion ? undefined : { scale: pressScale }
      }
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative isolate overflow-hidden rounded-lg bg-primary px-5 py-2.5",
        "text-sm font-medium text-primary-foreground shadow-subtle",
        "transition-colors hover:brightness-110",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>

      {/* Ripples are removed the moment their animation ends, so the button
          never accumulates dead nodes however fast it is clicked. */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            aria-hidden="true"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration, ease: "easeOut" }}
            onAnimationComplete={() =>
              setRipples((current) =>
                current.filter((item) => item.id !== ripple.id),
              )
            }
            style={{
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              background: rippleColor,
            }}
            className="pointer-events-none absolute z-0 rounded-full"
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}

export default RippleButton;

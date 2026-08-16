"use client";
import React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

interface GlowingCardProps {
  className?: string;
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

const GlowingCard: React.FC<GlowingCardProps> = ({
  className = "",
  width = 256,
  height = 160,
  children,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  /*
   * One card, themed by tokens.
   *
   * This was two complete copies of the card: one `dark:hidden`, the other
   * `hidden dark:block`, each with its palette written in hex. Both were
   * always in the DOM, both tracked the pointer, and neither had any relation
   * to the user's own theme: install this into a project with a warm neutral
   * palette and you got Tailwind's cool greys regardless.
   *
   * The spotlight is now the foreground colour at low alpha, which resolves
   * dark on a light theme and light on a dark one without either being stated.
   */
  const RESTING = "linear-gradient(to right, var(--muted), var(--border))";

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `
      radial-gradient(
        circle at ${x}px ${y}px,
        color-mix(in oklch, var(--foreground) 30%, transparent) 0%,
        transparent 70%
      ),
      ${RESTING}
    `,
  );

  /*
   * Under reduced motion the card keeps its gradient but stops tracking the
   * pointer. The spotlight is a large area of the screen moving continuously
   * under the cursor, which is the kind of thing the setting is asking about
   * even though nothing here loops on its own.
   */
  const surface = prefersReducedMotion ? RESTING : background;

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {/*
       * Both radii come from `--radius` so the 1px ring stays 1px all the way
       * round, corners included.
       *
       * The inner was a hardcoded `rounded-[7px]` against an outer `rounded-lg`.
       * That paired correctly when `rounded-lg` meant 8px, but `--radius-lg`
       * resolves to `--radius` (12px here), and an inner corner 4px too square
       * pushes out into the corner and covers the gradient behind it. The glow
       * ran along all four edges and vanished at all four corners. Deriving the
       * inner radius also means the ring survives a project whose `--radius` is
       * nothing like this one's.
       */}
      <motion.div
        className={cn(
          "relative cursor-pointer overflow-hidden rounded-[var(--radius)]",
          "transition-shadow duration-300",
        )}
        style={{
          width,
          height,
          background: surface,
        }}
        onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
        initial={{ background: RESTING }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <motion.div
          className={cn(
            "absolute inset-[1px] flex flex-col justify-between rounded-[calc(var(--radius)-1px)] p-4",
            "bg-card text-card-foreground",
          )}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GlowingCard;

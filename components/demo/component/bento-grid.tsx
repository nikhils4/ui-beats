"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: ReactNode;
  /** Columns from the `sm` breakpoint up. Below it the grid is always one. */
  columns?: number;
  /** Space between cells, in pixels. */
  gap?: number;
  className?: string;
}

interface BentoCardProps {
  children: ReactNode;
  /** Columns this card spans, from `sm` up. */
  colSpan?: number;
  /** Rows this card spans, from `sm` up. */
  rowSpan?: number;
  className?: string;
}

/**
 * An asymmetric grid of cards, in the layout everyone now calls a bento box.
 *
 * Both the column count and each card's span are driven by CSS custom
 * properties rather than inline `grid-column`, and both are gated behind the
 * `sm` breakpoint. That gate is the whole design: a card written as
 * `colSpan={2}` inside a one-column grid does not clamp to that column, it
 * makes the grid grow an implicit second one, so a naive inline span silently
 * shreds the layout on a phone. Holding the spans in variables that only apply
 * from `sm` up means every card is simply full width on small screens, and the
 * bento arrangement appears when there is room for it.
 */
export function BentoGrid({
  children,
  columns = 3,
  gap = 16,
  className = "",
}: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:[grid-template-columns:repeat(var(--bento-columns),minmax(0,1fr))]",
        className,
      )}
      style={{ "--bento-columns": String(columns), gap } as CSSProperties}
    >
      {children}
    </div>
  );
}

/**
 * One cell of a `BentoGrid`.
 *
 * Lifts on hover rather than scaling: a card that grows on hover overlaps its
 * neighbours, and in a grid whose whole point is that the cells are different
 * sizes, that reads as a layout bug.
 */
export function BentoCard({
  children,
  colSpan = 1,
  rowSpan = 1,
  className = "",
}: BentoCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card p-5 shadow-subtle",
        "sm:[grid-column:span_var(--bento-col-span)] sm:[grid-row:span_var(--bento-row-span)]",
        className,
      )}
      style={
        {
          "--bento-col-span": String(colSpan),
          "--bento-row-span": String(rowSpan),
        } as CSSProperties
      }
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      {children}
    </motion.div>
  );
}

export default BentoGrid;

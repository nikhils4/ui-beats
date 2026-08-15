"use client";

import type { LucideIcon } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/demo/component/bento-grid";
import { cn } from "@/lib/utils";

export interface Feature {
  title: string;
  description: string;
  icon?: LucideIcon;
  /** Columns this feature spans, from the sm breakpoint up. */
  colSpan?: number;
}

interface FeatureGridProps {
  heading?: string;
  description?: string;
  features: Feature[];
  /** Columns from the sm breakpoint up. */
  columns?: number;
  className?: string;
}

/**
 * A feature section laid out as a bento grid.
 *
 * Each feature declares its own `colSpan`, so the arrangement ranks them: the
 * capability you lead with takes two columns and the supporting ones take one.
 * That only works if you mean the ranking. Give every feature the same span and
 * you have an ordinary grid with extra steps, and an even grid says it more
 * clearly.
 */
export function FeatureGrid({
  heading,
  description,
  features,
  columns = 3,
  className = "",
}: FeatureGridProps) {
  return (
    <section className={cn("bg-background px-6 py-24", className)}>
      {heading || description ? (
        <div className="mx-auto mb-14 max-w-2xl text-center">
          {heading ? (
            <h2 className="text-3xl font-bold tracking-tighter text-balance sm:text-4xl">
              {heading}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-3 text-balance text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      <BentoGrid columns={columns} gap={16} className="mx-auto max-w-5xl">
        {features.map(({ title, description: body, icon: Icon, colSpan }) => (
          <BentoCard key={title} colSpan={colSpan}>
            {Icon ? (
              <span className="mb-4 flex size-9 items-center justify-center rounded-lg bg-muted">
                <Icon className="size-4 text-primary" />
              </span>
            ) : null}
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
          </BentoCard>
        ))}
      </BentoGrid>
    </section>
  );
}

export default FeatureGrid;

"use client";

import { Check } from "lucide-react";
import { BorderBeam } from "@/components/demo/component/border-beam";
import { ShimmerButton } from "@/components/demo/button/shimmer-button";
import { cn } from "@/lib/utils";

export interface PricingTier {
  name: string;
  price: string;
  /** Shown after the price, e.g. "/month". */
  period?: string;
  description?: string;
  features: string[];
  action: { label: string; href: string };
  /** Traces the card with a Border Beam and leads with the primary button. */
  featured?: boolean;
}

interface PricingProps {
  heading?: string;
  description?: string;
  tiers: PricingTier[];
  className?: string;
}

/**
 * A pricing section, with the recommended tier traced by a Border Beam.
 *
 * The beam is the whole reason this is a block rather than three cards in a
 * grid: singling out a plan usually means a coloured border and a "Most
 * popular" pill, both of which are static. A light that travels the recommended
 * card's edge draws the eye without adding another badge to read.
 *
 * Exactly one tier should carry `featured`. Two beams racing each other is not
 * emphasis, it is decoration, so the component only reads the first.
 */
export function Pricing({
  heading,
  description,
  tiers,
  className = "",
}: PricingProps) {
  // Emphasis is a comparison, so only the first claim to it is honoured.
  const featuredIndex = tiers.findIndex((tier) => tier.featured);

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

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier, index) => {
          const isFeatured = index === featuredIndex;

          const card = (
            <div
              className={cn(
                "flex h-full flex-col rounded-[inherit] p-6",
                !isFeatured && "rounded-xl border bg-card",
              )}
            >
              <p className="text-sm font-medium">{tier.name}</p>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tighter">
                  {tier.price}
                </span>
                {tier.period ? (
                  <span className="text-sm text-muted-foreground">
                    {tier.period}
                  </span>
                ) : null}
              </p>
              {tier.description ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  {tier.description}
                </p>
              ) : null}

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <a href={tier.action.href} className="mt-7 block">
                {isFeatured ? (
                  <ShimmerButton className="w-full">
                    {tier.action.label}
                  </ShimmerButton>
                ) : (
                  <span className="inline-flex w-full items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-accent">
                    {tier.action.label}
                  </span>
                )}
              </a>
            </div>
          );

          return isFeatured ? (
            <BorderBeam
              key={tier.name}
              duration={6}
              arc={90}
              className="h-full"
            >
              {card}
            </BorderBeam>
          ) : (
            <div key={tier.name} className="h-full">
              {card}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Pricing;

"use client";

import GlowingCard from "@/components/demo/card/glowing-card";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for GlowingCard.
 *
 * Mirrors `components/usage/card/glowing-card.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function GlowingCardPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(GlowingCard, values);

  return (
    <GlowingCard {...props}>
      <div className="mb-2 text-sm font-semibold">Glowing Card</div>
      <div className="text-xs">
        Hover over this card to see the glowing effect. The glow follows your
        cursor movement.
      </div>
      <div className="mt-auto text-right text-xs">Next</div>
    </GlowingCard>
  );
}

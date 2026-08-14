"use client";

import TiltCard from "@/components/demo/card/tilt-card";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for TiltCard.
 *
 * Mirrors `components/usage/card/tilt-card.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function TiltCardPlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(TiltCard, values);

  return (
    <TiltCard {...props} className="w-64">
      <h3 className="text-lg font-semibold">Tilt Card</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Move your cursor across the card to tilt it in 3D.
      </p>
    </TiltCard>
  );
}

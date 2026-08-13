"use client";

import GlowingCard from "@/components/demo/card/glowing-card";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for GlowingCard.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function GlowingCardPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(GlowingCard, values);

  return (
    <GlowingCard {...props}>
      <div className="flex size-full items-center justify-center p-6 text-center">
        <p className="text-sm font-medium">Move the pointer across me</p>
      </div>
    </GlowingCard>
  );
}

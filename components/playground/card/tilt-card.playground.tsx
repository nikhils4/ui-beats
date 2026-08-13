"use client";

import TiltCard from "@/components/demo/card/tilt-card";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for TiltCard.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function TiltCardPlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(TiltCard, values);

  return (
    <TiltCard
      {...props}
      className="w-64 rounded-2xl border bg-card p-6 shadow-subtle"
    >
      <p className="text-lg font-semibold">Tilt me</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Move the pointer across the card.
      </p>
    </TiltCard>
  );
}

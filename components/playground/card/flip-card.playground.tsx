"use client";

import FlipCard from "@/components/demo/card/flip-card";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for FlipCard.
 *
 * Mirrors `components/usage/card/flip-card.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function FlipCardPlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(FlipCard, values);

  return (
    <FlipCard
      {...props}
      frontContent={{
        title: "Discover",
        subtitle: "Hover to learn more",
      }}
      backContent={{
        title: "UI Beats",
        description:
          "A collection of modern and interactive UI components for React.",
      }}
    />
  );
}

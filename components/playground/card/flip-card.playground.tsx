"use client";

import FlipCard from "@/components/demo/card/flip-card";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for FlipCard.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function FlipCardPlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(FlipCard, values);

  return (
    <FlipCard
      {...props}
      frontContent={{ title: "Discover", subtitle: "Hover to learn more" }}
      backContent={{
        title: "UI Beats",
        description:
          "A collection of modern and interactive UI components for React.",
      }}
    />
  );
}

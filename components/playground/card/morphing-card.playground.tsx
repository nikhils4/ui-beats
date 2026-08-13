"use client";

import MorphingCard from "@/components/demo/card/morphing-card";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for MorphingCard.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function MorphingCardPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(MorphingCard, values);

  return (
    <MorphingCard
      {...props}
      contents={[
        {
          shape: "rectangle",
          title: "Copy",
          description: "Take the source into your project.",
        },
        {
          shape: "circle",
          title: "Own",
          description: "Change whatever you like afterwards.",
        },
        {
          shape: "hexagon",
          title: "Ship",
          description: "No version to pin, no maintainer to wait on.",
        },
      ]}
    />
  );
}

"use client";

import MorphingCard from "@/components/demo/card/morphing-card";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for MorphingCard.
 *
 * Mirrors `components/usage/card/morphing-card.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
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
          title: "Discover",
          description:
            "Explore our innovative features that redefine user experience.",
        },
        {
          shape: "circle",
          title: "Connect",
          description:
            "Join a community of forward-thinking individuals and ideas.",
        },
        {
          shape: "hexagon",
          title: "Transform",
          description:
            "Witness the evolution of design and functionality in real-time.",
        },
      ]}
    />
  );
}

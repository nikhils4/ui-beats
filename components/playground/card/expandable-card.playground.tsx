"use client";

import { ExpandableCard } from "@/components/demo/card/expandable-card";
import { RELEASES } from "@/components/playground/demo-content";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for ExpandableCard.
 *
 * `items` is an array of objects, so it cannot become a control; the harness
 * supplies the same list the docs demo shows and the panel drives the timing.
 */
export default function ExpandableCardPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(ExpandableCard, values);

  return (
    <div className="w-full max-w-md">
      <ExpandableCard {...props} items={RELEASES} />
    </div>
  );
}

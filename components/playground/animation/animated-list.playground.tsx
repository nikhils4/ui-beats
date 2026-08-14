"use client";

import AnimatedList from "@/components/demo/animation/animated-list";
import { asProps } from "@/lib/playground";
import { EventItems } from "@/components/playground/demo-content";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for AnimatedList.
 *
 * Mirrors `components/usage/animation/animated-list.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function AnimatedListPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(AnimatedList, values);

  return (
    <div className="w-full max-w-sm">
      <AnimatedList {...props}>
        <EventItems />
      </AnimatedList>
    </div>
  );
}

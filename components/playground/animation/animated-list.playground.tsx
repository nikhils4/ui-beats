"use client";

import AnimatedList from "@/components/demo/animation/animated-list";
import { asProps } from "@/lib/playground";
import { StageList } from "@/components/playground/stage";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for AnimatedList.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function AnimatedListPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(AnimatedList, values);

  return (
    <AnimatedList {...props} className="w-64">
      <StageList />
    </AnimatedList>
  );
}

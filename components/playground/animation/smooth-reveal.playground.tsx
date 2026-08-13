"use client";

import SmoothReveal from "@/components/demo/animation/smooth-reveal";
import { asProps } from "@/lib/playground";
import { StageCopy } from "@/components/playground/stage";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for SmoothReveal.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function SmoothRevealPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(SmoothReveal, values);

  return (
    <SmoothReveal {...props}>
      <StageCopy />
    </SmoothReveal>
  );
}

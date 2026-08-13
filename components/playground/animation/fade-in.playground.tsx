"use client";

import FadeIn from "@/components/demo/animation/fade-in";
import { asProps } from "@/lib/playground";
import { StageCopy } from "@/components/playground/stage";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for FadeIn.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function FadeInPlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(FadeIn, values);

  return (
    <FadeIn {...props}>
      <StageCopy />
    </FadeIn>
  );
}

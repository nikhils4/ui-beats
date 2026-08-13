"use client";

import FadeInUnblur from "@/components/demo/animation/fade-in-unblur";
import { asProps } from "@/lib/playground";
import { StageCopy } from "@/components/playground/stage";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for FadeInUnblur.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function FadeInUnblurPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(FadeInUnblur, values);

  return (
    <FadeInUnblur {...props}>
      <StageCopy />
    </FadeInUnblur>
  );
}

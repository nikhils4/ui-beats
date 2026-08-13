"use client";

import ScaleIn from "@/components/demo/animation/scale-in";
import { asProps } from "@/lib/playground";
import { StageCopy } from "@/components/playground/stage";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for ScaleIn.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function ScaleInPlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(ScaleIn, values);

  return (
    <ScaleIn {...props}>
      <StageCopy />
    </ScaleIn>
  );
}

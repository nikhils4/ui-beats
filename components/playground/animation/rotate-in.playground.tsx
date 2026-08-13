"use client";

import RotateIn from "@/components/demo/animation/rotate-in";
import { asProps } from "@/lib/playground";
import { StageCopy } from "@/components/playground/stage";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for RotateIn.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function RotateInPlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(RotateIn, values);

  return (
    <RotateIn {...props}>
      <StageCopy />
    </RotateIn>
  );
}

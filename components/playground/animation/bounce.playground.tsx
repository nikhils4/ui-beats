"use client";

import Bounce from "@/components/demo/animation/bounce";
import { asProps } from "@/lib/playground";
import { StageCopy } from "@/components/playground/stage";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for Bounce.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function BouncePlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(Bounce, values);

  return (
    <Bounce {...props}>
      <StageCopy />
    </Bounce>
  );
}

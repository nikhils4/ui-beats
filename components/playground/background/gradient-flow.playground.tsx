"use client";

import GradientFlow from "@/components/demo/background/gradient-flow";
import { asProps } from "@/lib/playground";
import { StageCopy } from "@/components/playground/stage";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for GradientFlow.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function GradientFlowPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(GradientFlow, values);

  return (
    <GradientFlow {...props} className="size-full rounded-lg">
      <div className="flex size-full items-center justify-center">
        <StageCopy inverted />
      </div>
    </GradientFlow>
  );
}

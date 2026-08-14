"use client";

import GradientFlow from "@/components/demo/background/gradient-flow";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for GradientFlow.
 *
 * Mirrors `components/usage/background/gradient-flow.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function GradientFlowPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(GradientFlow, values);

  return (
    <GradientFlow {...props} className="size-full">
      <div className="text-md text-white md:text-lg">
        Flowing Gradient Background
      </div>
    </GradientFlow>
  );
}

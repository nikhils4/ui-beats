"use client";

import { ProgressRing } from "@/components/demo/component/progress-ring";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for ProgressRing.
 *
 * Mirrors `components/usage/component/progress-ring.usage.tsx` so the studio
 * and the docs page show the same demo.
 */
export default function ProgressRingPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(ProgressRing, values);

  return (
    <div className="flex flex-col items-center gap-3">
      <ProgressRing {...props} />
      <p className="text-sm text-muted-foreground">
        The number is driven by the same animation as the arc.
      </p>
    </div>
  );
}

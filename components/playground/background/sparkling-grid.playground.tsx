"use client";

import SparklingGrid from "@/components/demo/background/sparkling-grid";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for SparklingGrid.
 *
 * Mirrors `components/usage/background/sparkling-grid.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function SparklingGridPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(SparklingGrid, values);

  return (
    <div className="relative size-full overflow-hidden">
      <SparklingGrid {...props} />
      <div className="relative z-10 flex size-full items-center justify-center text-lg font-semibold md:text-2xl">
        Sparkling Grid Background
      </div>
    </div>
  );
}

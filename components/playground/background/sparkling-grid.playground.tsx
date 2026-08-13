"use client";

import SparklingGrid from "@/components/demo/background/sparkling-grid";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for SparklingGrid.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function SparklingGridPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(SparklingGrid, values);

  return (
    <div className="relative size-full overflow-hidden rounded-lg text-brand">
      <SparklingGrid {...props} />
    </div>
  );
}

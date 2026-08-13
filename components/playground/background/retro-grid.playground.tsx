"use client";

import RetroGrid from "@/components/demo/background/retro-grid";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for RetroGrid.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function RetroGridPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(RetroGrid, values);

  return (
    <div className="relative size-full overflow-hidden rounded-lg">
      <RetroGrid {...props} />
    </div>
  );
}

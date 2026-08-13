"use client";

import BorderBeam from "@/components/demo/component/border-beam";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for BorderBeam.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function BorderBeamPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(BorderBeam, values);

  return (
    <BorderBeam {...props} className="rounded-2xl">
      <div className="w-64 rounded-2xl bg-card p-6">
        <p className="text-lg font-semibold">Border Beam</p>
        <p className="mt-1 text-sm text-muted-foreground">
          A light travelling the edge.
        </p>
      </div>
    </BorderBeam>
  );
}

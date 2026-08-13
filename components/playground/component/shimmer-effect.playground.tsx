"use client";

import ShimmerEffect from "@/components/demo/component/shimmer-effect";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for ShimmerEffect.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function ShimmerEffectPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(ShimmerEffect, values);

  return (
    <div className="w-64 space-y-3">
      <ShimmerEffect {...props} height={14} />
      <ShimmerEffect {...props} height={14} width="80%" />
      <ShimmerEffect {...props} height={14} width="60%" />
    </div>
  );
}

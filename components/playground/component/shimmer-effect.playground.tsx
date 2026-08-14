"use client";

import ShimmerEffect from "@/components/demo/component/shimmer-effect";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for ShimmerEffect.
 *
 * Mirrors `components/usage/component/shimmer-effect.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function ShimmerEffectPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(ShimmerEffect, values);

  return <ShimmerEffect {...props} />;
}

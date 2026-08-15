"use client";

import ShimmerButton from "@/components/demo/button/shimmer-button";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for ShimmerButton.
 *
 * Mirrors `components/usage/button/shimmer-button.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function ShimmerButtonPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(ShimmerButton, values);

  return <ShimmerButton {...props}>Get started</ShimmerButton>;
}

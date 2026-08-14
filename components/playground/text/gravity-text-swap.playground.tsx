"use client";

import GravityTextSwap from "@/components/demo/text/gravity-text-swap";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for GravityTextSwap.
 *
 * Mirrors `components/usage/text/gravity-text-swap.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function GravityTextSwapPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(GravityTextSwap, values);

  return (
    <GravityTextSwap
      {...props}
      textArray={["Code", "Build", "Sleep", "Repeat"]}
      className="text-md md:text-lg"
    />
  );
}

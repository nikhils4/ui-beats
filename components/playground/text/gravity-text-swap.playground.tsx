"use client";

import GravityTextSwap from "@/components/demo/text/gravity-text-swap";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for GravityTextSwap.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function GravityTextSwapPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(GravityTextSwap, values);

  return (
    <GravityTextSwap
      {...props}
      textArray={["Supercharge", "your", "UI"]}
      className="text-3xl font-bold"
    />
  );
}

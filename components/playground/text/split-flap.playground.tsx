"use client";

import SplitFlap from "@/components/demo/text/split-flap";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for SplitFlap.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function SplitFlapPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(SplitFlap, values);

  return <SplitFlap {...props} />;
}

"use client";

import NumberTicker from "@/components/demo/text/number-ticker";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for NumberTicker.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function NumberTickerPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(NumberTicker, values);

  return (
    <NumberTicker {...props} className="text-4xl font-bold tabular-nums" />
  );
}

"use client";

import NumberTicker from "@/components/demo/text/number-ticker";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for NumberTicker.
 *
 * Mirrors `components/usage/text/number-ticker.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function NumberTickerPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(NumberTicker, values);

  return (
    <div className="text-center">
      <NumberTicker {...props} className="text-3xl font-bold" />
      <p className="mt-1 text-xs text-muted-foreground">Downloads</p>
    </div>
  );
}

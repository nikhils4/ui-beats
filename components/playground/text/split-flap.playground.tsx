"use client";

import SplitFlap from "@/components/demo/text/split-flap";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for SplitFlap.
 *
 * Mirrors `components/usage/text/split-flap.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function SplitFlapPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(SplitFlap, values);

  return (
    <div className="flex flex-col items-center gap-4">
      <SplitFlap {...props} className="text-lg sm:text-2xl" />
      <p className="text-xs text-muted-foreground">
        Every column flips until it finds its letter.
      </p>
    </div>
  );
}

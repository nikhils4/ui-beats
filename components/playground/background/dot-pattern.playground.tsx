"use client";

import DotPattern from "@/components/demo/background/dot-pattern";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for DotPattern.
 *
 * Mirrors `components/usage/background/dot-pattern.usage.tsx` so the studio and
 * the docs page show the same demo.
 */
export default function DotPatternPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(DotPattern, values);

  return (
    <div className="relative size-full overflow-hidden rounded-lg bg-background">
      <DotPattern {...props} className="text-foreground" />

      <div className="pointer-events-none relative z-10 flex size-full flex-col items-center justify-center px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter">Move the cursor</h2>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          The same grid twice, with the bright copy masked to a circle around
          the pointer.
        </p>
      </div>
    </div>
  );
}

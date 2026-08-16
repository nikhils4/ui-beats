"use client";

import Aurora from "@/components/demo/background/aurora";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for Aurora.
 *
 * Mirrors `components/usage/background/aurora.usage.tsx` so the studio and the
 * docs page show the same demo.
 */
export default function AuroraPlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(Aurora, values);

  return (
    <div className="relative size-full overflow-hidden rounded-lg bg-background">
      <Aurora {...props} />

      <div className="relative z-10 flex size-full flex-col items-center justify-center px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tighter">Northern lights</h2>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Three ribbons on different periods, so the field never settles into a
          pattern.
        </p>
      </div>
    </div>
  );
}

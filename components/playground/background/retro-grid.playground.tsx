"use client";

import RetroGrid from "@/components/demo/background/retro-grid";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for RetroGrid.
 *
 * Mirrors `components/usage/background/retro-grid.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function RetroGridPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(RetroGrid, values);

  return (
    <div className="relative size-full overflow-hidden rounded-lg bg-background">
      <RetroGrid {...props} className="text-brand/50" />

      <div className="relative z-10 flex size-full flex-col items-center justify-center px-6 text-center">
        <h2 className="bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-4xl font-bold tracking-tighter text-transparent">
          Ship it
        </h2>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          An endless grid running to the horizon, drawn in whatever colour you
          set on it.
        </p>
      </div>
    </div>
  );
}

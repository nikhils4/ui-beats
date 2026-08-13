"use client";

import { RetroGrid } from "@/components/demo/background/retro-grid";

const RetroGridUsage = () => {
  return (
    <div className="relative size-full overflow-hidden bg-background">
      <RetroGrid className="text-brand/50" cellSize={54} duration={2.4} />

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
};

export default RetroGridUsage;

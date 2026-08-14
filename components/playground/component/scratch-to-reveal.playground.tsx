"use client";

import { useState } from "react";
import ScratchToReveal from "@/components/demo/component/scratch-to-reveal";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for ScratchToReveal.
 *
 * Hand-written, because the docs demo swaps its caption once enough of the
 * foil has been cleared, which needs the completion flag the component reports
 * through `onComplete`.
 */
export default function ScratchToRevealPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(ScratchToReveal, values);
  const [won, setWon] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <ScratchToReveal {...props} onComplete={() => setWon(true)}>
        <div className="text-center">
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            You won
          </p>
          <p className="mt-1 font-mono text-2xl font-bold text-brand">
            BEATS-30
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            30% off, one use only
          </p>
        </div>
      </ScratchToReveal>

      <p className="text-xs text-muted-foreground">
        {won
          ? "Nice — the rest fell away on its own."
          : "Drag across the foil."}
      </p>
    </div>
  );
}

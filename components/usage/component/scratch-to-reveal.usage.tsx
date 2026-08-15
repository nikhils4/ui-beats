"use client";

import { useState } from "react";
import { ScratchToReveal } from "@/components/demo/component/scratch-to-reveal";

const ScratchToRevealUsage = () => {
  const [won, setWon] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <ScratchToReveal
        width={300}
        height={180}
        brushSize={20}
        threshold={0.5}
        label="Scratch to reveal your code"
        onComplete={() => setWon(true)}
      >
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
        {won ? "Nice. The rest fell away on its own." : "Drag across the foil."}
      </p>
    </div>
  );
};

export default ScratchToRevealUsage;

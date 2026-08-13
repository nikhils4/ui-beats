"use client";

import { useState } from "react";
import { RippleButton } from "@/components/demo/button/ripple-button";

const RippleButtonUsage = () => {
  const [presses, setPresses] = useState(0);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <RippleButton onClick={() => setPresses((count) => count + 1)}>
          Press anywhere
        </RippleButton>

        <RippleButton
          onClick={() => setPresses((count) => count + 1)}
          rippleColor="rgba(168, 85, 247, 0.25)"
          className="bg-card text-foreground ring-1 ring-border hover:bg-accent hover:brightness-100"
        >
          Subtle
        </RippleButton>
      </div>

      <p className="text-xs text-muted-foreground">
        {presses === 0
          ? "The ripple starts where you press, not in the middle."
          : `${presses} ${presses === 1 ? "press" : "presses"}`}
      </p>
    </div>
  );
};

export default RippleButtonUsage;

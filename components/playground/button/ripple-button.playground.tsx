"use client";

import { useState } from "react";
import RippleButton from "@/components/demo/button/ripple-button";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for RippleButton.
 *
 * Hand-written for the press counter, which the docs demo uses to make the
 * point that the ripple starts where you pressed. The docs demo also shows a
 * second "Subtle" button to contrast a different `rippleColor`; the studio
 * shows one, because `rippleColor` is a control here and a second button
 * ignoring it would be the one thing on screen not answering the panel.
 */
export default function RippleButtonPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(RippleButton, values);
  const [presses, setPresses] = useState(0);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <RippleButton
          {...props}
          onClick={() => setPresses((count) => count + 1)}
        >
          Press anywhere
        </RippleButton>
      </div>

      <p className="text-xs text-muted-foreground">
        {presses === 0
          ? "The ripple starts where you press, not in the middle."
          : `${presses} ${presses === 1 ? "press" : "presses"}`}
      </p>
    </div>
  );
}

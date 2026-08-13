"use client";

import ScratchToReveal from "@/components/demo/component/scratch-to-reveal";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for ScratchToReveal.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function ScratchToRevealPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(ScratchToReveal, values);

  return (
    <ScratchToReveal {...props}>
      <div className="flex size-full items-center justify-center rounded-xl bg-brand-subtle text-center">
        <p className="text-sm font-semibold text-brand">You found it</p>
      </div>
    </ScratchToReveal>
  );
}

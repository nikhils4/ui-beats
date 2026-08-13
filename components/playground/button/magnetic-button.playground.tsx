"use client";

import MagneticButton from "@/components/demo/button/magnetic-button";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for MagneticButton.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function MagneticButtonPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(MagneticButton, values);

  return (
    <MagneticButton
      {...props}
      className="rounded-xl border bg-card px-6 py-3 text-sm font-semibold shadow-subtle"
    >
      Come closer
    </MagneticButton>
  );
}

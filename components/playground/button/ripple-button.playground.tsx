"use client";

import RippleButton from "@/components/demo/button/ripple-button";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for RippleButton.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function RippleButtonPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(RippleButton, values);

  return (
    <RippleButton
      {...props}
      className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
    >
      Press me
    </RippleButton>
  );
}

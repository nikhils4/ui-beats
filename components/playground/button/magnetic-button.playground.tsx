"use client";

import MagneticButton from "@/components/demo/button/magnetic-button";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for MagneticButton.
 *
 * Mirrors `components/usage/button/magnetic-button.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function MagneticButtonPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(MagneticButton, values);

  return <MagneticButton {...props}>Hover me</MagneticButton>;
}

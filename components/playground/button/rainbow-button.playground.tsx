"use client";

import { RainbowButton } from "@/components/demo/button/rainbow-button";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for RainbowButton.
 *
 * Mirrors `components/usage/button/rainbow-button.usage.tsx` so the studio and
 * the docs page show the same demo.
 */
export default function RainbowButtonPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(RainbowButton, values);

  return <RainbowButton {...props}>Get started</RainbowButton>;
}

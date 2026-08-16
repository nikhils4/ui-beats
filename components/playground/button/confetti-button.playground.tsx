"use client";

import { ConfettiButton } from "@/components/demo/button/confetti-button";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for ConfettiButton.
 *
 * Mirrors `components/usage/button/confetti-button.usage.tsx` so the studio and
 * the docs page show the same demo.
 */
export default function ConfettiButtonPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(ConfettiButton, values);

  return (
    <div className="flex flex-col items-center gap-4">
      <ConfettiButton {...props}>Ship it</ConfettiButton>
      <p className="text-sm text-muted-foreground">
        The burst starts at the button, not the top of the screen.
      </p>
    </div>
  );
}

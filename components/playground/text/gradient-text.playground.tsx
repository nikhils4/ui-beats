"use client";

import { GradientText } from "@/components/demo/text/gradient-text";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for GradientText.
 *
 * The sentence around the gradient word is the same one the docs demo shows;
 * only the word itself comes from the panel, because `text` is a control.
 */
export default function GradientTextPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(GradientText, values);

  return (
    <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
      Supercharge your <GradientText {...props} />
    </h3>
  );
}

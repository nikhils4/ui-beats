"use client";

import SmoothReveal from "@/components/demo/animation/smooth-reveal";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for SmoothReveal.
 *
 * Mirrors `components/usage/animation/smooth-reveal.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function SmoothRevealPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(SmoothReveal, values);

  return (
    <SmoothReveal {...props}>
      <p className="text-md md:text-lg">
        This content will smoothly reveal on scroll
      </p>
    </SmoothReveal>
  );
}

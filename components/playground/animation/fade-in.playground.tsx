"use client";

import FadeIn from "@/components/demo/animation/fade-in";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for FadeIn.
 *
 * Mirrors `components/usage/animation/fade-in.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function FadeInPlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(FadeIn, values);

  return (
    <FadeIn {...props}>
      <p className="text-md md:text-lg">
        This content will fade in when it enters the viewport
      </p>
    </FadeIn>
  );
}

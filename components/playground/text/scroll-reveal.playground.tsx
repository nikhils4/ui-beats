"use client";

import ScrollReveal from "@/components/demo/text/scroll-reveal";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for ScrollReveal.
 *
 * Mirrors `components/usage/text/scroll-reveal.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function ScrollRevealPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(ScrollReveal, values);

  return (
    <ScrollReveal
      {...props}
      className="max-w-md text-xl leading-relaxed font-semibold md:text-2xl"
    >
      Scroll and every word arrives in turn, tied to the scrollbar rather than
      to a timer.
    </ScrollReveal>
  );
}

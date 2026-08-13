"use client";

import ScrollReveal from "@/components/demo/text/scroll-reveal";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for ScrollReveal.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function ScrollRevealPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(ScrollReveal, values);

  return (
    <ScrollReveal
      {...props}
      className="max-w-md text-center text-xl font-medium"
    >
      Every component is yours to own once you copy it.
    </ScrollReveal>
  );
}

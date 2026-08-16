"use client";

import { FlipWords } from "@/components/demo/text/flip-words";
import { AUDIENCES } from "@/components/playground/demo-content";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for FlipWords.
 *
 * `words` is an array, so it cannot become a control; the harness supplies the
 * same list the docs demo shows and the panel drives the timings.
 */
export default function FlipWordsPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(FlipWords, values);

  return (
    <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
      Built for{" "}
      <FlipWords {...props} words={AUDIENCES} className="text-primary" />
    </p>
  );
}

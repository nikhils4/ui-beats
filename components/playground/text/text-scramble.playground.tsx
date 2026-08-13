"use client";

import TextScramble from "@/components/demo/text/text-scramble";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for TextScramble.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function TextScramblePlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(TextScramble, values);

  return <TextScramble {...props} className="text-2xl font-semibold" />;
}

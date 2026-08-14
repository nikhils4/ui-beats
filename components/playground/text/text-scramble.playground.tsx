"use client";

import TextScramble from "@/components/demo/text/text-scramble";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for TextScramble.
 *
 * Mirrors `components/usage/text/text-scramble.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function TextScramblePlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(TextScramble, values);

  return <TextScramble {...props} className="text-xl font-bold md:text-2xl" />;
}

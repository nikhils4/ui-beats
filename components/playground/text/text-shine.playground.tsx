"use client";

import TextShine from "@/components/demo/text/text-shine";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for TextShine.
 *
 * Mirrors `components/usage/text/text-shine.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function TextShinePlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(TextShine, values);

  return <TextShine {...props} />;
}

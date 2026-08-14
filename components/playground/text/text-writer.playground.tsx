"use client";

import TextWriter from "@/components/demo/text/text-writer";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for TextWriter.
 *
 * Mirrors `components/usage/text/text-writer.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function TextWriterPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(TextWriter, values);

  return <TextWriter {...props} className="text-md md:text-lg" />;
}

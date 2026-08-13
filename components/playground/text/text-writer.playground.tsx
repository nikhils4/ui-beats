"use client";

import TextWriter from "@/components/demo/text/text-writer";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for TextWriter.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function TextWriterPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(TextWriter, values);

  return <TextWriter {...props} className="text-2xl font-semibold" />;
}

"use client";

import TextShine from "@/components/demo/text/text-shine";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for TextShine.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function TextShinePlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(TextShine, values);

  return <TextShine {...props} className="text-3xl font-bold" />;
}

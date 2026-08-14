"use client";

import { SubscribeButton } from "@/components/demo/button/subscribe-button";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for SubscribeButton.
 *
 * Mirrors `components/usage/button/subscribe-button.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function SubscribeButtonPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(SubscribeButton, values);

  return <SubscribeButton {...props} />;
}

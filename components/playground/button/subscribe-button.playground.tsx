"use client";

import { SubscribeButton } from "@/components/demo/button/subscribe-button";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for SubscribeButton.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function SubscribeButtonPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(SubscribeButton, values);

  return <SubscribeButton {...props} />;
}

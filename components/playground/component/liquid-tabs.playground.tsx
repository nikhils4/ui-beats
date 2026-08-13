"use client";

import LiquidTabs from "@/components/demo/component/liquid-tabs";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for LiquidTabs.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function LiquidTabsPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(LiquidTabs, values);

  return (
    <LiquidTabs
      {...props}
      items={[
        { label: "Preview", value: "preview" },
        { label: "Code", value: "code" },
        { label: "Props", value: "props" },
      ]}
    />
  );
}

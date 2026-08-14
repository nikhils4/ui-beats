"use client";

import { useState } from "react";
import { LiquidTabs } from "@/components/demo/component/liquid-tabs";
import { TABS } from "@/components/playground/demo-content";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for LiquidTabs.
 *
 * Hand-written, because the docs demo prints a line of copy per tab and so
 * needs to know which one is selected. It watches `onValueChange` rather than
 * passing `value`: the studio excludes that prop, since a controlled tab strip
 * with no handler behind it looks broken the first time you click it.
 */
const COPY: Record<string, string> = {
  overview: "The pill stretches as it travels and settles when it lands.",
  analytics: "Jump across several tabs at once to see it deform further.",
  reports: "Arrow keys move the selection, so it works without a pointer.",
  settings: "Widths are measured from the tabs, so any label length fits.",
};

export default function LiquidTabsPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(LiquidTabs, values);
  const [tab, setTab] = useState("overview");

  return (
    <div className="flex flex-col items-center gap-6">
      <LiquidTabs {...props} items={TABS} onValueChange={setTab} />
      <p className="max-w-xs text-center text-sm text-balance text-muted-foreground">
        {COPY[tab]}
      </p>
    </div>
  );
}

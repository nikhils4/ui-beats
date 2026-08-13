"use client";

import { useState } from "react";
import { LiquidTabs } from "@/components/demo/component/liquid-tabs";

const tabs = [
  { label: "Overview", value: "overview" },
  { label: "Analytics", value: "analytics" },
  { label: "Reports", value: "reports" },
  { label: "Settings", value: "settings" },
];

const copy: Record<string, string> = {
  overview: "The pill stretches as it travels and settles when it lands.",
  analytics: "Jump across several tabs at once to see it deform further.",
  reports: "Arrow keys move the selection, so it works without a pointer.",
  settings: "Widths are measured from the tabs, so any label length fits.",
};

const LiquidTabsUsage = () => {
  const [tab, setTab] = useState("overview");

  return (
    <div className="flex flex-col items-center gap-6">
      <LiquidTabs items={tabs} value={tab} onValueChange={setTab} />
      <p className="max-w-xs text-center text-sm text-balance text-muted-foreground">
        {copy[tab]}
      </p>
    </div>
  );
};

export default LiquidTabsUsage;

import type { ComponentConfig } from "@/types/component-config.type";

const LiquidTabsContent: ComponentConfig = {
  name: "liquid-tabs",
  category: "component",
  title: "Liquid Tabs",
  description:
    "The LiquidTabs component is a tab switcher whose selection pill flows between tabs, stretching in proportion to how fast it is travelling and settling back into shape as it lands.",
  addedAt: "2026-08-13",
  whenToUse:
    "For a handful of peer views: dashboard sections, a filter row, a pricing period toggle. Keep it under about six tabs so the indicator has room to travel.",
  props: [
    {
      prop: "items",
      type: "{ label: string; value: string }[]",
      defaultValue: "-",
      description: "The tabs to render, in order",
    },
    {
      prop: "defaultValue",
      type: "string",
      defaultValue: "first item",
      description: "Selected tab when the component is uncontrolled",
    },
    {
      prop: "value",
      type: "string",
      defaultValue: "-",
      description:
        "Selected tab. Pass with onValueChange to control the component",
    },
    {
      prop: "onValueChange",
      type: "(value: string) => void",
      defaultValue: "-",
      description: "Called with the value of the newly selected tab",
    },
    {
      prop: "squish",
      type: "number",
      defaultValue: "0.22",
      description: "Peak stretch of the pill at full speed, as a scale factor",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes applied to the tab list",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    exclude: ["value"],
    fixedSource: `  items={[
    { label: "Overview", value: "overview" },
    { label: "Analytics", value: "analytics" },
    { label: "Reports", value: "reports" },
    { label: "Settings", value: "settings" },
  ]}`,
  },
};

export default LiquidTabsContent;

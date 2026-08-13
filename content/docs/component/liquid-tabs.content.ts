import type { ComponentConfig } from "@/types/component-config.type";

const LiquidTabsContent: ComponentConfig = {
  name: "liquid-tabs",
  category: "component",
  title: "Liquid Tabs",
  description:
    "The LiquidTabs component is a tab switcher whose selection pill flows between tabs, stretching in proportion to how fast it is travelling and settling back into shape as it lands.",
  addedAt: "2026-08-13",
  whenToUse:
    "Use it anywhere a segmented control or tab bar carries a handful of peer views: a dashboard's sections, a pricing period toggle, a filter row. The deformation comes from the pill's own velocity, so a hop to the neighbouring tab barely bends while a jump across the row stretches hard. That difference is what tells the user how far the selection moved. It renders as a `tablist` with roving tab focus and arrow-key selection, so give each panel an `id` and point the tab at it with `aria-controls` when you pair it with content.",
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
    // `value` puts the component into controlled mode, where it only ever
    // changes if the parent passes a new one. A playground that set it would
    // hand the reader a tab strip that looks broken, and a snippet missing the
    // `onValueChange` that has to come with it.
    exclude: ["value"],
    fixedSource: `  items={[
    { label: "Preview", value: "preview" },
    { label: "Code", value: "code" },
    { label: "Props", value: "props" },
  ]}`,
  },
};

export default LiquidTabsContent;

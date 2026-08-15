import type { ComponentConfig } from "@/types/component-config.type";

const ShimmerButtonContent: ComponentConfig = {
  name: "shimmer-button",
  category: "button",
  title: "Shimmer Button",
  description:
    "The ShimmerButton component sweeps a band of light across its face on a loop, giving a call to action a slow pulse of movement without asking the reader to hover, click or scroll first.",
  addedAt: "2026-08-15",
  whenToUse:
    "For the one action you want noticed on a quiet screen. A second shimmering button cancels out the first, so pair it with a plain secondary.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Button label or content (required)",
    },
    {
      prop: "shimmerColor",
      type: "string",
      defaultValue: "#ffffff",
      description: "Colour of the light band that crosses the button",
    },
    {
      prop: "shimmerWidth",
      type: "number",
      defaultValue: "40",
      description: "Width of the band, as a percentage of the button's width",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "1.4",
      description: "Seconds for the band to cross once",
    },
    {
      prop: "repeatDelay",
      type: "number",
      defaultValue: "1",
      description: "Seconds the button rests between crossings",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for styling",
    },
    {
      prop: "...props",
      type: "ButtonHTMLAttributes",
      defaultValue: "-",
      description:
        "Any other native button props, including onClick, type and disabled",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    childrenSource: "  Get started",
    ranges: {
      shimmerWidth: { min: 5, max: 100, step: 1, unit: "%" },
    },
  },
};

export default ShimmerButtonContent;

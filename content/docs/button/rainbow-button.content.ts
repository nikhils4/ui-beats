import type { ComponentConfig } from "@/types/component-config.type";

const RainbowButtonContent: ComponentConfig = {
  name: "rainbow-button",
  category: "button",
  title: "Rainbow Button",
  description:
    "The RainbowButton component rings a call to action with a band of colour that travels around it, drawn from the project's own chart tokens so the palette re-themes with the rest of the app.",
  addedAt: "2026-08-15",
  whenToUse:
    "For the single most important action on a landing page or a pricing table, where a plain filled button would disappear into the section around it. One per screen: the effect works by being the only thing moving, and a row of them reads as a toolbar nobody wants to use.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Button label or content (required)",
    },
    {
      prop: "speed",
      type: "number",
      defaultValue: "3",
      description: "Seconds for the colours to travel once around the button",
    },
    {
      prop: "glow",
      type: "boolean",
      defaultValue: "true",
      description: "Cast a blurred copy of the gradient beneath the button",
    },
    {
      prop: "borderWidth",
      type: "number",
      defaultValue: "2",
      description: "Thickness of the gradient border, in pixels",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for styling",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    childrenSource: `  Get started`,
    ranges: {
      speed: { min: 0.5, max: 12, step: 0.25, unit: "s" },
      borderWidth: { min: 0, max: 8, step: 0.5, unit: "px" },
    },
  },
};

export default RainbowButtonContent;

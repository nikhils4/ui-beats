import type { ComponentConfig } from "@/types/component-config.type";

const MagneticButtonContent: ComponentConfig = {
  name: "magnetic-button",
  category: "button",
  title: "Magnetic Button",
  description:
    "The MagneticButton component drifts toward the pointer as it approaches and springs back when the pointer leaves, making calls to action feel responsive before they are even clicked.",
  addedAt: "2026-08-11",
  whenToUse:
    "For the single most important action on a page. The pull only reads as intentional when nothing competes nearby, so avoid two side by side.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Button label or content (required)",
    },
    {
      prop: "strength",
      type: "number",
      defaultValue: "18",
      description: "How far the button travels toward the pointer, in pixels",
    },
    {
      prop: "radius",
      type: "number",
      defaultValue: "120",
      description:
        "Distance from the button, in pixels, at which it starts reacting",
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
    childrenSource: "  Hover me",
  },
};

export default MagneticButtonContent;

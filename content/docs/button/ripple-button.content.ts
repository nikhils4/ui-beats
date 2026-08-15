import type { ComponentConfig } from "@/types/component-config.type";

const RippleButtonContent: ComponentConfig = {
  name: "ripple-button",
  category: "button",
  title: "Ripple Button",
  description:
    "The RippleButton component sends a ripple out from the exact point it was pressed, sized to reach the button's farthest corner so the whole surface floods however near the edge you click.",
  addedAt: "2026-08-13",
  whenToUse:
    "For the primary action in a form or dialog, where confirming the press matters more than restraint. The ripple is the receipt for a click.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Button label",
    },
    {
      prop: "onClick",
      type: "() => void",
      defaultValue: "-",
      description: "Called on click, after the ripple is spawned",
    },
    {
      prop: "rippleColor",
      type: "string",
      defaultValue: '"rgba(255, 255, 255, 0.45)"',
      description: "Colour of the ripple; any CSS colour works",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "0.7",
      description: "Seconds for one ripple to cross the button and fade",
    },
    {
      prop: "pressScale",
      type: "number",
      defaultValue: "0.96",
      description: "Scale the button settles at while held",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disable the button and stop it rippling",
    },
    {
      prop: "type",
      type: '"button" | "submit" | "reset"',
      defaultValue: '"button"',
      description: "Native button type",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes applied to the button",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    childrenSource: "  Press anywhere",
  },
};

export default RippleButtonContent;

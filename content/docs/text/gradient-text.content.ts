import type { ComponentConfig } from "@/types/component-config.type";

const GradientTextContent: ComponentConfig = {
  name: "gradient-text",
  category: "text",
  title: "Gradient Text",
  description:
    "The GradientText component paints a line of text with a colour ramp that travels across it on a loop, so a headline word carries the accent colour as movement rather than as a flat fill.",
  addedAt: "2026-08-15",
  whenToUse:
    "For the one word in a headline that should carry the eye — a product name, the verb in a value proposition. Use it on a short span inside a larger sentence rather than on the whole line: a paragraph of moving gradient is unreadable, and the effect stops meaning anything once everything has it.",
  props: [
    {
      prop: "text",
      type: "string",
      defaultValue: "-",
      description: "The text to paint (required)",
    },
    {
      prop: "from",
      type: "string",
      defaultValue: "'var(--brand)'",
      description: "First and last stop of the gradient. Any CSS colour",
    },
    {
      prop: "via",
      type: "string",
      defaultValue: "'var(--accent-pink)'",
      description: "Middle stop — the colour that travels across the text",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "4",
      description: "Seconds for one pass of the gradient",
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
    defaults: { text: "interface" },
    ranges: {
      duration: { min: 0.5, max: 12, step: 0.5, unit: "s" },
    },
  },
};

export default GradientTextContent;

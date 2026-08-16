import type { ComponentConfig } from "@/types/component-config.type";

const ComparisonSliderContent: ComponentConfig = {
  name: "comparison-slider",
  category: "component",
  title: "Comparison Slider",
  description:
    "The ComparisonSlider component stacks two layers and reveals one against the other with a divider the reader drags, clipping the top layer rather than resizing it so neither side reflows as the divider moves.",
  addedAt: "2026-08-15",
  whenToUse:
    "For a pair that only makes sense side by side and at the same size: a retouch, a redesign, a light and dark treatment of one screen. Two images that differ in more than one respect are better shown as two images — the divider invites a close comparison of a single change, and finds nothing when there are several.",
  props: [
    {
      prop: "before",
      type: "React.ReactNode",
      defaultValue: "-",
      description:
        "The layer revealed on the leading side of the divider (required)",
    },
    {
      prop: "after",
      type: "React.ReactNode",
      defaultValue: "-",
      description:
        "The layer underneath, revealed as the divider moves across it (required)",
    },
    {
      prop: "defaultPosition",
      type: "number",
      defaultValue: "50",
      description: "Where the divider starts, 0 to 100",
    },
    {
      prop: "orientation",
      type: "'horizontal' | 'vertical'",
      defaultValue: "horizontal",
      description: "Which way the divider travels",
    },
    {
      prop: "label",
      type: "string",
      defaultValue: "Compare before and after",
      description: "Accessible name for the divider",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes. Set the frame's size here",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    fixedSource: `  before={<Before />}
  after={<After />}`,
    ranges: {
      defaultPosition: { min: 0, max: 100, step: 1, unit: "%" },
    },
  },
};

export default ComparisonSliderContent;

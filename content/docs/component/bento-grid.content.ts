import type { ComponentConfig } from "@/types/component-config.type";

const BentoGridContent: ComponentConfig = {
  name: "bento-grid",
  category: "component",
  title: "Bento Grid",
  description:
    "The BentoGrid component arranges cards of different sizes into the asymmetric layout known as a bento box, with each cell declaring how many columns and rows it spans and every card collapsing to full width on small screens.",
  addedAt: "2026-08-15",
  whenToUse:
    "For a feature section where the items are not equal, since the layout is what ranks them. Keep spans to two or three columns.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "BentoCard elements to lay out (required)",
    },
    {
      prop: "columns",
      type: "number",
      defaultValue: "3",
      description:
        "Columns from the sm breakpoint up. Below it the grid is always one column",
    },
    {
      prop: "gap",
      type: "number",
      defaultValue: "16",
      description: "Space between cells, in pixels",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for styling",
    },
    {
      prop: "BentoCard: children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Contents of one cell (required)",
    },
    {
      prop: "BentoCard: colSpan",
      type: "number",
      defaultValue: "1",
      description: "Columns this card spans, from sm up",
    },
    {
      prop: "BentoCard: rowSpan",
      type: "number",
      defaultValue: "1",
      description: "Rows this card spans, from sm up",
    },
    {
      prop: "BentoCard: className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for one cell",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    childrenSource: `  <BentoCard colSpan={2}>Copy, paste, own it</BentoCard>
  <BentoCard>Motion included</BentoCard>
  <BentoCard>Themed by default</BentoCard>
  <BentoCard colSpan={2}>Documented properly</BentoCard>`,
    ranges: {
      columns: { min: 1, max: 6, step: 1 },
      gap: { min: 0, max: 48, step: 2, unit: "px" },
    },
  },
};

export default BentoGridContent;

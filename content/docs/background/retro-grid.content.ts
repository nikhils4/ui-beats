import type { ComponentConfig } from "@/types/component-config.type";

const RetroGridContent: ComponentConfig = {
  name: "retro-grid",
  category: "background",
  title: "Retro Grid",
  description:
    "The RetroGrid component lays an infinite grid back in 3D and scrolls it toward the viewer, fading into a horizon — a synthwave backdrop drawn entirely in CSS.",
  isNew: true,
  whenToUse:
    "Use it behind a hero or a section header that needs depth without a background image to download. Lines are drawn with currentColor, so it takes the text colour of whatever wraps it and follows your theme with no JavaScript at all, and the horizon is a mask rather than a painted gradient so it works over any background. Keep the colour faint: it sits under your copy, and a grid bright enough to notice is a grid bright enough to compete with the words on top of it.",
  fullBleedPreview: true,
  props: [
    {
      prop: "cellSize",
      type: "number",
      defaultValue: "60",
      description: "Size of one grid cell, in pixels",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "2.2",
      description:
        "Seconds for the grid to travel one full cell — lower is faster",
    },
    {
      prop: "angle",
      type: "number",
      defaultValue: "65",
      description: "How far the plane is laid back, in degrees",
    },
    {
      prop: "lineWidth",
      type: "number",
      defaultValue: "1",
      description: "Thickness of the grid lines, in pixels",
    },
    {
      prop: "height",
      type: "number",
      defaultValue: "0.7",
      description:
        "Fraction of the frame the grid fills, measured up from the bottom",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description:
        "Additional CSS classes — set the line colour here, e.g. text-brand/40",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
};

export default RetroGridContent;

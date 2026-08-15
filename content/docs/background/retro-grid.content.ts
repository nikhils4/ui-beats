import type { ComponentConfig } from "@/types/component-config.type";

const RetroGridContent: ComponentConfig = {
  name: "retro-grid",
  category: "background",
  title: "Retro Grid",
  description:
    "The RetroGrid component lays an infinite grid back in 3D and scrolls it toward the viewer, fading out into a horizon. A synthwave backdrop drawn entirely in CSS.",
  addedAt: "2026-08-13",
  whenToUse:
    "Behind a hero or a section header that needs depth without downloading a background image. Keep the colour faint or it competes with the copy on top.",
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
        "Seconds for the grid to travel one full cell (lower is faster)",
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
        "Additional CSS classes. Set the line colour here, e.g. text-brand/40",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
};

export default RetroGridContent;

import type { ComponentConfig } from "@/types/component-config.type";

const DotPatternContent: ComponentConfig = {
  name: "dot-pattern",
  category: "background",
  title: "Dot Pattern",
  description:
    "The DotPattern component tiles a grid of dots behind your content and lights the ones nearest the pointer, using a masked second copy of the same grid so the bright dots land exactly on the dim ones.",
  addedAt: "2026-08-15",
  whenToUse:
    "As the quiet texture under a hero, a feature section or an empty state, where a flat background would read as unfinished. Turn the glow off for anything behind long-form copy: a light that follows the cursor is an invitation to move it, which is the opposite of what a reading surface wants.",
  fullBleedPreview: true,
  props: [
    {
      prop: "spacing",
      type: "number",
      defaultValue: "20",
      description: "Distance between dot centres, in pixels",
    },
    {
      prop: "dotSize",
      type: "number",
      defaultValue: "1.4",
      description: "Diameter of each dot, in pixels",
    },
    {
      prop: "glow",
      type: "boolean",
      defaultValue: "true",
      description: "Light the dots nearest the pointer",
    },
    {
      prop: "glowRadius",
      type: "number",
      defaultValue: "160",
      description: "Radius of the lit area around the pointer, in pixels",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description:
        "Additional CSS classes. Set the dot colour here, e.g. text-foreground",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    ranges: {
      spacing: { min: 6, max: 64, step: 1, unit: "px" },
      dotSize: { min: 0.5, max: 6, step: 0.1, unit: "px" },
      glowRadius: { min: 40, max: 400, step: 10, unit: "px" },
    },
  },
};

export default DotPatternContent;

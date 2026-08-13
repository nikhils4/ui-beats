import type { ComponentConfig } from "@/types/component-config.type";

const SparklingGridContent: ComponentConfig = {
  name: "sparkling-grid",
  category: "background",
  title: "Sparkling Grid",
  description:
    "The SparklingGrid component creates an animated grid of dots that ripples outward on mount and sparkles at random, ideal for dynamic, atmospheric backgrounds.",
  addedAt: "2024-08-05",
  fullBleedPreview: true,
  whenToUse:
    "A technical, atmospheric backdrop that suits developer-facing heroes and empty states. It creates one element per grid cell, so raise gridSize on large surfaces to keep the node count sensible.",
  props: [
    {
      prop: "gridSize",
      type: "number",
      defaultValue: "30",
      description: "Spacing between dots, in pixels",
    },
    {
      prop: "sparkleFrequency",
      type: "number",
      defaultValue: "0.03",
      description: "Chance (0-1) that a dot sparkles on each of its ticks",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description:
        "Additional CSS classes. Set a text colour here to recolour the dots, which inherit currentColor",
    },
  ],
};

export default SparklingGridContent;

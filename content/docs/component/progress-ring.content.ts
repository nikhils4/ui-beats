import type { ComponentConfig } from "@/types/component-config.type";

const ProgressRingContent: ComponentConfig = {
  name: "progress-ring",
  category: "component",
  title: "Progress Ring",
  description:
    "The ProgressRing component sweeps an arc round to a value and counts a label up alongside it, driving both from one animation so the number can never finish ahead of the arc describing it.",
  addedAt: "2026-08-15",
  whenToUse:
    "For a single figure that is a share of a whole and wants to be read at a glance: storage used, a score, a completion rate. It is a poor fit for an unbounded number or for anything changing every second, where a ring restarting its sweep on each update reads as a spinner rather than a measurement.",
  props: [
    {
      prop: "value",
      type: "number",
      defaultValue: "72",
      description: "How far round to sweep, 0 to 100",
    },
    {
      prop: "size",
      type: "number",
      defaultValue: "120",
      description: "Outer diameter, in pixels",
    },
    {
      prop: "strokeWidth",
      type: "number",
      defaultValue: "10",
      description: "Thickness of the ring, in pixels",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "1.2",
      description: "Seconds the sweep takes",
    },
    {
      prop: "showLabel",
      type: "boolean",
      defaultValue: "true",
      description: "Print the percentage in the middle",
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
    ranges: {
      value: { min: 0, max: 100, step: 1, unit: "%" },
      size: { min: 48, max: 240, step: 4, unit: "px" },
      strokeWidth: { min: 2, max: 28, step: 1, unit: "px" },
      duration: { min: 0, max: 4, step: 0.1, unit: "s" },
    },
  },
};

export default ProgressRingContent;

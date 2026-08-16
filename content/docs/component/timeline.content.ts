import type { ComponentConfig } from "@/types/component-config.type";

const TimelineContent: ComponentConfig = {
  name: "timeline",
  category: "component",
  title: "Timeline",
  description:
    "The Timeline component lays events down a vertical rail that fills as the reader scrolls through them, scaling a single element rather than resizing it so the fill costs nothing on the main thread.",
  addedAt: "2026-08-15",
  whenToUse:
    "For a sequence where the order carries meaning: a changelog, a roadmap, an onboarding walkthrough, a company history. A list of items that merely happen to be numbered is better as a list — the rail promises the reader that each entry follows from the one above it.",
  props: [
    {
      prop: "items",
      type: "TimelineItem[]",
      defaultValue: "-",
      description: "The events to render, in order (required)",
    },
    {
      prop: "container",
      type: "RefObject<HTMLElement | null>",
      defaultValue: "-",
      description: "Scroll container to track. Omit to track the window",
    },
    {
      prop: "nodeSize",
      type: "number",
      defaultValue: "12",
      description: "Diameter of each node, in pixels",
    },
    {
      prop: "smooth",
      type: "boolean",
      defaultValue: "true",
      description:
        "Ease the rail toward the true position instead of tracking it exactly",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes applied to the list",
    },
    {
      prop: "TimelineItem: id",
      type: "string",
      defaultValue: "-",
      description: "Unique key for the entry",
    },
    {
      prop: "TimelineItem: title",
      type: "string",
      defaultValue: "-",
      description: "Heading for the entry",
    },
    {
      prop: "TimelineItem: meta",
      type: "string",
      defaultValue: "-",
      description: "Small line above the title — a date, a version, a stage",
    },
    {
      prop: "TimelineItem: body",
      type: "string",
      defaultValue: "-",
      description: "The entry's copy",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    fixedSource: `  items={milestones}
  container={scrollArea}`,
    ranges: {
      nodeSize: { min: 6, max: 32, step: 1, unit: "px" },
    },
  },
};

export default TimelineContent;

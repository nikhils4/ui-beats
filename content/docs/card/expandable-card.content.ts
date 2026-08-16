import type { ComponentConfig } from "@/types/component-config.type";

const ExpandableCardContent: ComponentConfig = {
  name: "expandable-card",
  category: "card",
  title: "Expandable Card",
  description:
    "The ExpandableCard component grows any row of a list into a detail panel in place, sharing a layout id between the two so the card the reader pressed is visibly the card that opens rather than one fading out as a dialog fades in.",
  addedAt: "2026-08-15",
  whenToUse:
    "For a list where most rows are scanned and the occasional one is read: a changelog, a set of FAQs, a table of team members. Reach for a real route instead once the detail has its own actions or deserves a URL, because nothing here is linkable and the reader cannot send anyone the thing they just opened.",
  props: [
    {
      prop: "items",
      type: "ExpandableCardItem[]",
      defaultValue: "-",
      description: "The rows to render, in order (required)",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "0.35",
      description: "Seconds the expand and collapse take",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes applied to the list wrapper",
    },
    {
      prop: "ExpandableCardItem: id",
      type: "string",
      defaultValue: "-",
      description: "Unique key, and the namespace for the shared layout ids",
    },
    {
      prop: "ExpandableCardItem: title",
      type: "string",
      defaultValue: "-",
      description: "Row heading, carried into the open panel",
    },
    {
      prop: "ExpandableCardItem: meta",
      type: "string",
      defaultValue: "-",
      description: "Small line above the title — a date, a category, a status",
    },
    {
      prop: "ExpandableCardItem: summary",
      type: "string",
      defaultValue: "-",
      description: "The one line shown while the card is collapsed",
    },
    {
      prop: "ExpandableCardItem: detail",
      type: "string",
      defaultValue: "-",
      description: "The body revealed once it is open",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    fixedSource: `  items={releases}`,
    ranges: {
      duration: { min: 0.1, max: 1.5, step: 0.05, unit: "s" },
    },
  },
};

export default ExpandableCardContent;

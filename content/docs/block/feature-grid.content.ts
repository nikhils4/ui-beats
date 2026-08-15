import type { ComponentConfig } from "@/types/component-config.type";

const FeatureGridContent: ComponentConfig = {
  name: "feature-grid",
  category: "block",
  title: "Feature Grid",
  description:
    "The FeatureGrid block arranges a set of features into a bento layout, letting each one declare how many columns it spans so the arrangement itself ranks them.",
  addedAt: "2026-08-15",
  fullBleedPreview: true,
  whenToUse:
    "For the section after the hero. The uneven spans are what rank your features, so give the one you lead with two columns and the rest one.",
  props: [
    {
      prop: "features",
      type: "Feature[]",
      defaultValue: "-",
      description: "The features to lay out, in display order (required)",
    },
    {
      prop: "heading",
      type: "string",
      defaultValue: "-",
      description: "Section heading above the grid",
    },
    {
      prop: "description",
      type: "string",
      defaultValue: "-",
      description: "Supporting line under the heading",
    },
    {
      prop: "columns",
      type: "number",
      defaultValue: "3",
      description:
        "Columns from the sm breakpoint up. Below it every card is full width",
    },
    {
      prop: "Feature: title",
      type: "string",
      defaultValue: "-",
      description: "The feature's name",
    },
    {
      prop: "Feature: description",
      type: "string",
      defaultValue: "-",
      description: "One or two lines on what it does",
    },
    {
      prop: "Feature: icon",
      type: "LucideIcon",
      defaultValue: "-",
      description: "Optional icon shown above the title",
    },
    {
      prop: "Feature: colSpan",
      type: "number",
      defaultValue: "1",
      description: "Columns this feature spans, from sm up",
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
};

export default FeatureGridContent;

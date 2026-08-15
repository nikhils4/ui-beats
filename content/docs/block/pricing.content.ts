import type { ComponentConfig } from "@/types/component-config.type";

const PricingContent: ComponentConfig = {
  name: "pricing",
  category: "block",
  title: "Pricing",
  description:
    "The Pricing block lays out a row of plans and traces the recommended one with a travelling Border Beam, so the tier you want chosen is the one that moves rather than the one wearing another badge.",
  addedAt: "2026-08-15",
  fullBleedPreview: true,
  whenToUse:
    "For a pricing section where one plan is the one you want chosen. Mark exactly one tier as featured; if every plan is equal, a plain grid says it better.",
  props: [
    {
      prop: "tiers",
      type: "PricingTier[]",
      defaultValue: "-",
      description: "The plans, in display order (required)",
    },
    {
      prop: "heading",
      type: "string",
      defaultValue: "-",
      description: "Section heading above the tiers",
    },
    {
      prop: "description",
      type: "string",
      defaultValue: "-",
      description: "Supporting line under the heading",
    },
    {
      prop: "PricingTier: name",
      type: "string",
      defaultValue: "-",
      description: "Plan name, e.g. Pro",
    },
    {
      prop: "PricingTier: price",
      type: "string",
      defaultValue: "-",
      description: "Headline price, as text so Free and $19 both work",
    },
    {
      prop: "PricingTier: period",
      type: "string",
      defaultValue: "-",
      description: "Shown after the price, e.g. /month",
    },
    {
      prop: "PricingTier: features",
      type: "string[]",
      defaultValue: "-",
      description: "Ticked list of what the plan includes",
    },
    {
      prop: "PricingTier: action",
      type: "{ label: string; href: string }",
      defaultValue: "-",
      description: "The plan's call to action",
    },
    {
      prop: "PricingTier: featured",
      type: "boolean",
      defaultValue: "false",
      description:
        "Traces the card with a Border Beam and promotes its button. Only the first tier claiming it is honoured",
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

export default PricingContent;

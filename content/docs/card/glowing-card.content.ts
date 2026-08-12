import type { ComponentConfig } from "@/types/component-config.type";

const GlowingCardContent: ComponentConfig = {
  name: "glowing-card",
  category: "card",
  title: "Glowing Card",
  description:
    "The GlowingCard component creates an interactive card with a dynamic glow effect that follows the user's cursor, adding a sleek and modern touch to your UI.",
  isNew: true,
  whenToUse:
    "A pointer-tracking highlight for feature grids and pricing tables, where it rewards exploration. It is desktop-first by nature — on touch devices the glow never fires, so the card must still read well without it.",
  props: [
    {
      prop: "width",
      type: "number",
      defaultValue: "256",
      description: "Width of the card in pixels",
    },
    {
      prop: "height",
      type: "number",
      defaultValue: "160",
      description: "Height of the card in pixels",
    },
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Content to be displayed inside the card",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes to apply to the card",
    },
  ],
};

export default GlowingCardContent;

import type { ComponentConfig } from "@/types/component-config.type";

const GlowingCardContent: ComponentConfig = {
  name: "glowing-card",
  category: "card",
  title: "Glowing Card",
  description:
    "The GlowingCard component tracks the cursor across the card and paints a soft glow wherever it goes, so the surface reacts as the pointer moves over it.",
  addedAt: "2024-08-29",
  whenToUse:
    "A pointer-tracking highlight for feature grids and pricing tables, where it rewards exploration. It is desktop-first by nature. On touch devices the glow never fires, so the card has to read well without it.",
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
  playground: {
    childrenSource: '  <div className="p-6">Move the pointer across me</div>',
  },
};

export default GlowingCardContent;

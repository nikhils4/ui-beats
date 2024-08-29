import { ComponentConfigType } from "@/types/component-config.type";
import { getAnimationPreview } from "@/lib/animation-preview";

const GlowingCardContent: ComponentConfigType = {
  breadcrumbs: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Modern Animation",
    },
  ],
  title: "Glowing Card",
  description:
    "The GlowingCard component creates an interactive card with a dynamic glow effect that follows the user's cursor, adding a sleek and modern touch to your UI.",
  usageCode: `${getAnimationPreview("glowing-card", 1, true)}`,
  installation: [
    {
      description: "Add the following code into your project",
      isFullCode: true,
    },
    {
      description: "Update the import paths according to your project setup",
    },
  ],
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

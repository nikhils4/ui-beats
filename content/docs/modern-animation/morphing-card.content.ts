import { ComponentConfigType } from "@/types/component-config.type";
import { getAnimationPreview } from "@/lib/animation-preview";

const MorphingCardContent: ComponentConfigType = {
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
      label: "Components",
    },
  ],
  title: "Morphing Card",
  description:
    "The MorphingCard component creates an engaging, interactive card that smoothly transitions between different shapes and content. It features elegant 3D rotations, customizable gradients, and a clean design that's perfect for showcasing key information or features in a visually striking manner.",
  usageCode: `${getAnimationPreview("morphing-card", 1, true)}`,
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
      type: "string",
      defaultValue: "'300px'",
      description: "Width of the morphing card",
    },
    {
      prop: "height",
      type: "string",
      defaultValue: "'300px'",
      description: "Height of the morphing card",
    },
    {
      prop: "contents",
      type: "Array<{ shape: 'rectangle' | 'circle' | 'hexagon'; title: string; description: string; }>",
      defaultValue: "-",
      description:
        "Array of content objects for each state of the card (required)",
    },
    {
      prop: "colorScheme",
      type: "{ from: string; to: string; }",
      defaultValue: "{ from: '#4F46E5', to: '#7C3AED' }",
      description: "Gradient color scheme for the card background",
    },
    {
      prop: "autoPlay",
      type: "boolean",
      defaultValue: "true",
      description: "Whether the card should automatically cycle through shapes",
    },
    {
      prop: "interval",
      type: "number",
      defaultValue: "3000",
      description:
        "Time interval (in milliseconds) between shape transitions when autoPlay is true",
    },
  ],
    credits:
      "Credits to <a target='_blank' style='font-weight: bold' href='https://github.com/lappemic' rel='noreferrer noopener'>Michael</a> for this awesome component.",
};

export default MorphingCardContent;

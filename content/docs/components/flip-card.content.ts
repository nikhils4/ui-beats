import { ComponentConfigType } from "@/types/component-config.type";
import { getAnimationPreview } from "@/lib/animation-preview";

const FlipCardContent: ComponentConfigType = {
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
  title: "Flip Card",
  description:
    "The FlipCard component creates an elegant, Apple-inspired interactive card that flips to reveal additional content. It features smooth animations, subtle gradients, and a clean design that's perfect for showcasing key information or features.",
  usageCode: `${getAnimationPreview("flip-card", 1, true)}`,
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
      prop: "frontContent",
      type: "{ title: string; subtitle?: string }",
      defaultValue: "-",
      description:
        "Content to display on the front side of the card (required)",
    },
    {
      prop: "backContent",
      type: "{ title: string; description: string }",
      defaultValue: "-",
      description: "Content to display on the back side of the card (required)",
    },
    {
      prop: "width",
      type: "string",
      defaultValue: "'300px'",
      description: "Width of the flip card",
    },
    {
      prop: "height",
      type: "string",
      defaultValue: "'200px'",
      description: "Height of the flip card",
    },
    {
      prop: "flipDirection",
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: "Direction of the flip animation",
    },
    {
      prop: "triggerMode",
      type: "'hover' | 'click'",
      defaultValue: "'hover'",
      description: "Event that triggers the flip animation",
    },
  ],
};

export default FlipCardContent;

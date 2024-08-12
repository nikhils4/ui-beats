import { ComponentConfigType } from "@/types/component-config.type";
import { getAnimationPreview } from "@/lib/animation-preview";

const FadeInContent: ComponentConfigType = {
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
      label: "Animation",
    },
  ],
  title: "Fade In",
  description:
    "The FadeIn component creates a smooth fade-in animation for its children when they enter the viewport.",
  usageCode: `${getAnimationPreview("fade-in", 1, true)}`,
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
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "The content to be faded in (required)",
    },
    {
      prop: "delay",
      type: "number",
      defaultValue: "0",
      description: "Delay before the animation starts (in seconds)",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "0.5",
      description: "Duration of the animation (in seconds)",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for styling",
    },
    {
      prop: "once",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to trigger the animation only once",
    },
  ],
};

export default FadeInContent;

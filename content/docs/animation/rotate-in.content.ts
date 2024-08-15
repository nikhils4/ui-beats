import { ComponentConfigType } from "@/types/component-config.type";
import { getAnimationPreview } from "@/lib/animation-preview";

const RotateInContent: ComponentConfigType = {
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
  title: "Rotate In",
  description:
    "The RotateIn component creates a smooth rotation animation for its children when they enter the viewport.",
  usageCode: `${getAnimationPreview("rotate-in", 1, true)}`,
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
      description: "The content to be rotated in (required)",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "0.5",
      description: "Duration of the animation (in seconds)",
    },
    {
      prop: "delay",
      type: "number",
      defaultValue: "0",
      description: "Delay before the animation starts (in seconds)",
    },
    {
      prop: "rotateFrom",
      type: "number",
      defaultValue: "90",
      description: "Initial rotation angle (in degrees)",
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

export default RotateInContent;

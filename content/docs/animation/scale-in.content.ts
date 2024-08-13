import { ComponentConfigType } from "@/types/component-config.type";
import { getAnimationPreview } from "@/lib/animation-preview";

const ScaleInContent: ComponentConfigType = {
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
  title: "Scale In",
  description:
    "The ScaleIn component creates a smooth scale-in animation for its children when they enter the viewport.",
  usageCode: `${getAnimationPreview("scale-in", 1, true)}`,
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
      description: "The content to be scaled in (required)",
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
      prop: "scaleFrom",
      type: "number",
      defaultValue: "0.8",
      description: "Initial scale value (between 0 and 1)",
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
  credits:
    "Credits to <a target='_blank' style='font-weight: bold' href='https://github.com/lappemic' rel='noreferrer noopener'>Michael</a> for this awesome component.",
};

export default ScaleInContent;

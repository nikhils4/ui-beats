import { ComponentConfigType } from "@/types/component-config.type";
import { getAnimationPreview } from "@/lib/animation-preview";

const GradientFlowContent: ComponentConfigType = {
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
  title: "Gradient Flow",
  description:
    "The GradientFlow component creates a flowing gradient animation effect for its children, adding visual interest to backgrounds or UI elements.",
  usageCode: `${getAnimationPreview("gradient-flow", 1, true)}`,
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
      description:
        "The content to be wrapped with the gradient flow effect (required)",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "10",
      description: "Duration of the animation cycle (in seconds)",
    },
    {
      prop: "colors",
      type: "string[]",
      defaultValue: "['#ff0080', '#7928ca', '#ff4d4d']",
      description: "Array of colors to use in the gradient",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for styling",
    },
  ],
  credits:
    "Credits to <a target='_blank' style='font-weight: bold' href='https://github.com/lappemic' rel='noreferrer noopener'>Michael</a> for this awesome component.",
};

export default GradientFlowContent;

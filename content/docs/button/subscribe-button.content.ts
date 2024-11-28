import { ComponentConfigType } from "@/types/component-config.type";
import { getAnimationPreview } from "@/lib/animation-preview";

const SubscribeButtonContent: ComponentConfigType = {
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
      label: "Button",
    },
  ],
  title: "Subscribe Button",
  description:
    "The SubscribeButton component is an interactive button designed for subscription actions (more like Youtube Subscribe Button Animation), featuring customizable styles and animations.",
  usageCode: `${getAnimationPreview("subscribe-button", 1, true)}`,
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
      prop: "onClick",
      type: "() => void",
      defaultValue: "undefined",
      description: "Function to be called when the button is clicked",
    },
    {
      prop: "text",
      type: "string",
      defaultValue: "'Subscribe'",
      description: "Text to be displayed on the button",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes to be applied to the button",
    },
  ],
};

export default SubscribeButtonContent;

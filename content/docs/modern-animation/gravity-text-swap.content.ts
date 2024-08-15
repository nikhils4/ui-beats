import {ComponentConfigType} from "@/types/component-config.type";
import {getAnimationPreview} from "@/lib/animation-preview";

const GravityTextSwapContent: ComponentConfigType = {
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
  title: "Gravity Text Swap",
  description:
    "The GravityTextSwap component creates a dynamic text animation where characters fall into place with a gravity-like effect, creating an engaging transition between words.",
  usageCode: `${getAnimationPreview("gravity-text-swap", 1, true)}`,
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
      prop: "textArray",
      type: "string[]",
      defaultValue: "-",
      description: "Array of strings to animate between",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "0.5",
      description: "Duration of each word's animation (in seconds)",
    },
    {
      prop: "pauseDuration",
      type: "number",
      defaultValue: "2",
      description:
        "Duration to pause on each word before transitioning (in seconds)",
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

export default GravityTextSwapContent;

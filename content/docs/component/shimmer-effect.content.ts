import { ComponentConfigType } from "@/types/component-config.type";
import { getAnimationPreview } from "@/lib/animation-preview";

const ShimmerEffectContent: ComponentConfigType = {
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
      label: "Component",
    },
  ],
  title: "Shimmer Effect",
  description:
    "The ShimmerEffect component creates a shimmering animation, ideal for loading placeholders or skeleton screens.",
  usageCode: `${getAnimationPreview("shimmer-effect", 1, true)}`,
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
      type: "string | number",
      defaultValue: "'100%'",
      description: "Width of the shimmer effect",
    },
    {
      prop: "height",
      type: "string | number",
      defaultValue: "'1rem'",
      description: "Height of the shimmer effect",
    },
    {
      prop: "borderRadius",
      type: "string | number",
      defaultValue: "'0.25rem'",
      description: "Border radius of the shimmer effect",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "1.5",
      description: "Duration of one shimmer animation cycle (in seconds)",
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

export default ShimmerEffectContent;

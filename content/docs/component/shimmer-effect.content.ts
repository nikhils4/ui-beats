import type { ComponentConfig } from "@/types/component-config.type";

const ShimmerEffectContent: ComponentConfig = {
  name: "shimmer-effect",
  category: "component",
  title: "Shimmer Effect",
  description:
    "The ShimmerEffect component creates a shimmering animation, ideal for loading placeholders or skeleton screens.",
  whenToUse:
    "Use for loading states shaped like the content that will replace them. A placeholder that matches the final layout feels faster than a spinner because nothing shifts when the data arrives.",
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
      defaultValue: "'0.375rem'",
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
  credits: { name: "Michael", url: "https://github.com/lappemic" },
};

export default ShimmerEffectContent;

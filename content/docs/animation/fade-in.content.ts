import type { ComponentConfig } from "@/types/component-config.type";

const FadeInContent: ComponentConfig = {
  name: "fade-in",
  category: "animation",
  title: "Fade In",
  description:
    "The FadeIn component creates a smooth fade-in animation for its children when they enter the viewport.",
  addedAt: "2024-08-04",
  whenToUse:
    "The safest entrance animation, and the right default when you are unsure. Use it for body copy, images and anything below the fold that should feel considered rather than demand attention.",
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
  credits: { name: "Michael", url: "https://github.com/lappemic" },
  playground: {
    childrenSource:
      '  <p className="text-lg font-semibold">Supercharge your UI</p>',
  },
};

export default FadeInContent;

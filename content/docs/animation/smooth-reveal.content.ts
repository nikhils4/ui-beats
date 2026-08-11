import type { ComponentConfig } from "@/types/component-config.type";

const SmoothRevealContent: ComponentConfig = {
  name: "smooth-reveal",
  category: "animation",
  title: "Smooth Reveal",
  description:
    "The SmoothReveal component creates a smooth reveal animation for its children when they enter the viewport.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "The content to be revealed (required)",
    },
    {
      prop: "direction",
      type: "'up' | 'down' | 'left' | 'right'",
      defaultValue: "'up'",
      description: "The direction of the reveal animation",
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
      defaultValue: "0.6",
      description: "Duration of the animation (in seconds)",
    },
    {
      prop: "distance",
      type: "number",
      defaultValue: "50",
      description: "Distance of the reveal animation (in pixels)",
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

export default SmoothRevealContent;

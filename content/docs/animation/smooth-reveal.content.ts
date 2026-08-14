import type { ComponentConfig } from "@/types/component-config.type";

const SmoothRevealContent: ComponentConfig = {
  name: "smooth-reveal",
  category: "animation",
  title: "Smooth Reveal",
  description:
    "The SmoothReveal component creates a smooth reveal animation for its children when they enter the viewport.",
  addedAt: "2024-08-04",
  whenToUse:
    "The workhorse for long scrolling pages. Match the direction to reading order: up for stacked sections, left or right for side-by-side columns. Keep distance under about 60px. Past that the movement reads as a jump instead of a reveal.",
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
  playground: {
    childrenSource:
      '  <p className="text-md md:text-lg">This content will smoothly reveal on scroll</p>',
  },
};

export default SmoothRevealContent;

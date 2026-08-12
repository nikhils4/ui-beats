import type { ComponentConfig } from "@/types/component-config.type";

const BounceContent: ComponentConfig = {
  name: "bounce",
  category: "animation",
  title: "Bounce",
  description:
    "The Bounce component adds a playful, elastic animation to its children when they enter the viewport.",
  whenToUse:
    "Reach for Bounce when an element should feel physical on arrival — a price, a stat, a confirmation. The spring overshoot pulls the eye, so use it on one or two elements per screen rather than across a whole list, where the repeated overshoot reads as noise.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "The content to be animated (required)",
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
      prop: "bounceHeight",
      type: "number",
      defaultValue: "20",
      description: "Height of the bounce effect (in pixels)",
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
};

export default BounceContent;

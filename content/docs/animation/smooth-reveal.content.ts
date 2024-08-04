import { ComponentConfigType } from "@/types/component-config.type";

const SmoothRevealContent: ComponentConfigType = {
  breadcrumbs: [
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Animation",
    },
  ],
  title: "Smooth Reveal",
  description:
    "The SmoothReveal component creates a smooth reveal animation for its children when they enter the viewport.",
  usageCode: `<SmoothReveal>
  <p>This content will smoothly reveal on scroll</p>
</SmoothReveal>`,
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

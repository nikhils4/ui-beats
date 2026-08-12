import type { ComponentConfig } from "@/types/component-config.type";

const ScaleInContent: ComponentConfig = {
  name: "scale-in",
  category: "animation",
  title: "Scale In",
  description:
    "The ScaleIn component creates a smooth scale-in animation for its children when they enter the viewport.",
  whenToUse:
    "Use when an element should feel like it is arriving out of the page rather than sliding onto it — modals, cards, images. Keep scaleFrom between 0.9 and 0.95; anything lower reads as a zoom rather than an entrance.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "The content to be scaled in (required)",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "0.5",
      description: "Duration of the animation (in seconds)",
    },
    {
      prop: "delay",
      type: "number",
      defaultValue: "0",
      description: "Delay before the animation starts (in seconds)",
    },
    {
      prop: "scaleFrom",
      type: "number",
      defaultValue: "0.8",
      description: "Initial scale value (between 0 and 1)",
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

export default ScaleInContent;

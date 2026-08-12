import type { ComponentConfig } from "@/types/component-config.type";

const GravityTextSwapContent: ComponentConfig = {
  name: "gravity-text-swap",
  category: "text",
  title: "Gravity Text Swap",
  description:
    "The GravityTextSwap component creates a dynamic text animation where characters fall into place with a gravity-like effect, creating an engaging transition between words.",
  whenToUse:
    "For a headline that cycles through a few words — audiences, use cases, verbs. Keep the words a similar length so the surrounding layout does not jump on every swap.",
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
  credits: { name: "Michael", url: "https://github.com/lappemic" },
};

export default GravityTextSwapContent;

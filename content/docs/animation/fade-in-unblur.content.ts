import type { ComponentConfig } from "@/types/component-config.type";

const FadeInUnblurContent: ComponentConfig = {
  name: "fade-in-unblur",
  category: "animation",
  title: "Fade In Unblur",
  description:
    "The FadeInUnblur component creates a smooth fade-in while unblurring animation for its children when they enter the viewport.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "The content to be faded in unblurred (required)",
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
  credits: { name: "Divyaswor", url: "https://github.com/divyaswormakai" },
};

export default FadeInUnblurContent;

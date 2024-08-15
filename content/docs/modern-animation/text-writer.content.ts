import { ComponentConfigType } from "@/types/component-config.type";
import { getAnimationPreview } from "@/lib/animation-preview";

const SmoothRevealContent: ComponentConfigType = {
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
      label: "Animation",
    },
  ],
  title: "Text Writer",
  description:
    "The TextWriter component creates a typing animation effect for text, where characters appear one by one to mimic real-time typing.",
  usageCode: `${getAnimationPreview("text-writer", 1, true)}`,
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
      prop: "text",
      type: "string",
      defaultValue: "-",
      description: "The text to be animated (required)",
    },
    {
      prop: "delay",
      type: "number",
      defaultValue: "0.05",
      description: "Time delay between each character (in seconds)",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for styling",
    },
    {
      prop: "animationConfig",
      type: "AnimationProps",
      defaultValue: "{}",
      description: "Custom Framer Motion animation configuration",
    },
    {
      prop: "cursorColor",
      type: "string",
      defaultValue: "'#000'",
      description: "Color of the typing cursor",
    },
    {
      prop: "cursorWidth",
      type: "string",
      defaultValue: "'2px'",
      description: "Width of the typing cursor",
    },
    {
      prop: "cursorStyle",
      type: "string",
      defaultValue: "'solid'",
      description: "CSS border-style of the cursor",
    },
    {
      prop: "onComplete",
      type: "() => void",
      defaultValue: "() => {}",
      description: "Callback function executed when typing is complete",
    },
    {
      prop: "eraseOnComplete",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to erase the text after completion",
    },
    {
      prop: "eraseDelay",
      type: "number",
      defaultValue: "2000",
      description: "Delay before erasing starts (in milliseconds)",
    },
    {
      prop: "loop",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to loop the writing and erasing effect",
    },
  ],
};

export default SmoothRevealContent;

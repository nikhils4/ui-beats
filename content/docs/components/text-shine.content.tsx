import { ComponentConfigType } from "@/types/component-config.type";
import { getAnimationPreview } from "@/lib/animation-preview";

const TextShineContent: ComponentConfigType = {
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
      label: "Components",
    },
  ],
  title: "Text Shine",
  description:
    "The Text Shine component is a simple text animation component where certain portion of the text shines in a specific color. ",
  usageCode: `${getAnimationPreview("text-shine", 1, true)}`,
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
      defaultValue: "'I am Shiny'",
      description: "Text to be displayed",
    },
    {
      prop: "shineColor",
      type: "string",
      defaultValue: "'#FFD700'",
      description: "Shiny Color that appears on the text",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "5",
      description: "Duration of time the shining animation should complete in.",
    },
  ],
  credits:
    "Credits to <a target='_blank' style='font-weight: bold' href='https://github.com/divyaswormakai' rel='noreferrer noopener'>Divyaswor</a> for this awesome component.",
};

export default TextShineContent;

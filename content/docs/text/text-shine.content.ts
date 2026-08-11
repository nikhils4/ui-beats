import type { ComponentConfig } from "@/types/component-config.type";

const TextShineContent: ComponentConfig = {
  name: "text-shine",
  category: "text",
  title: "Text Shine",
  description:
    "The TextShine component sweeps a coloured highlight across your text on a loop, drawing the eye without demanding a click.",
  isNew: true,
  props: [
    {
      prop: "text",
      type: "string",
      defaultValue: "-",
      description: "Text to be displayed (required)",
    },
    {
      prop: "shineColor",
      type: "string",
      defaultValue: "'#FFD700'",
      description: "Colour of the highlight that sweeps across the text",
    },
    {
      prop: "baseColor",
      type: "string",
      defaultValue: "'var(--foreground)'",
      description:
        "Colour of the text itself. Defaults to the theme foreground so it stays legible in both themes",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "5",
      description: "Seconds for one sweep",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for styling",
    },
  ],
  credits: { name: "Divyaswor", url: "https://github.com/divyaswormakai" },
};

export default TextShineContent;

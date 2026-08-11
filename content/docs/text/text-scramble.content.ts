import type { ComponentConfig } from "@/types/component-config.type";

const TextScrambleContent: ComponentConfig = {
  name: "text-scramble",
  category: "text",
  title: "Text Scramble",
  description:
    "The TextScramble component decodes text one character at a time, cycling through random glyphs before each letter settles into place.",
  isNew: true,
  props: [
    {
      prop: "text",
      type: "string",
      defaultValue: "-",
      description: "The final text to decode to (required)",
    },
    {
      prop: "characters",
      type: "string",
      defaultValue: "'!<>-_\\\\/[]{}—=+*^?#'",
      description: "Pool of glyphs cycled through before a letter settles",
    },
    {
      prop: "speed",
      type: "number",
      defaultValue: "40",
      description: "Milliseconds between scramble frames",
    },
    {
      prop: "scrambleCount",
      type: "number",
      defaultValue: "6",
      description: "Frames each character scrambles before locking in",
    },
    {
      prop: "scrambleOnHover",
      type: "boolean",
      defaultValue: "true",
      description: "Re-run the effect when the pointer enters the text",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for styling",
    },
  ],
};

export default TextScrambleContent;

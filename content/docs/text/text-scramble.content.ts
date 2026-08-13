import type { ComponentConfig } from "@/types/component-config.type";

const TextScrambleContent: ComponentConfig = {
  name: "text-scramble",
  category: "text",
  title: "Text Scramble",
  description:
    "The TextScramble component decodes text one character at a time, cycling through random glyphs before each letter settles into place.",
  addedAt: "2026-08-11",
  whenToUse:
    "A decode effect that suits technical and playful brands. It is decorative, so the settled text is what assistive technology announces. Keep the string short enough to finish before a reader looks away.",
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
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    defaults: {
      text: "DECODING",
    },
  },
};

export default TextScrambleContent;

import type { ComponentConfig } from "@/types/component-config.type";

const SplitFlapContent: ComponentConfig = {
  name: "split-flap",
  category: "text",
  title: "Split Flap",
  description:
    "The SplitFlap component turns text into a mechanical departure board, each column riffling through the alphabet until it reaches its letter, a beat behind the column to its left.",
  isNew: true,
  whenToUse:
    "Use it for a short headline, a status line, or a word that changes on a timer — anything where the arrival of the text is worth watching. It is the wrong choice for body copy or anything a visitor needs immediately, since a board takes a moment to land. Columns step toward their target rather than showing random glyphs, so the flip always resolves; the flaps themselves are decorative, and the real text is exposed once to screen readers rather than being read out mid-flip.",
  props: [
    {
      prop: "text",
      type: "string",
      defaultValue: "-",
      description: "The word or phrase to land on. Change it and it re-flaps",
    },
    {
      prop: "charset",
      type: "string",
      defaultValue: '" A–Z 0–9 .,:\'!?-"',
      description: "Characters the flaps cycle through, in order",
    },
    {
      prop: "interval",
      type: "number",
      defaultValue: "55",
      description:
        "Milliseconds each flap is held before turning to the next character",
    },
    {
      prop: "stagger",
      type: "number",
      defaultValue: "70",
      description: "Milliseconds each column waits behind the one to its left",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description:
        "Additional CSS classes — set the font size here, the flaps scale with it",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
};

export default SplitFlapContent;

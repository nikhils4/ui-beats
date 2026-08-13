import type { ComponentConfig } from "@/types/component-config.type";

const SplitFlapContent: ComponentConfig = {
  name: "split-flap",
  category: "text",
  title: "Split Flap",
  description:
    "The SplitFlap component turns text into a mechanical departure board, each column riffling through the alphabet until it reaches its letter, a beat behind the column to its left.",
  addedAt: "2026-08-13",
  whenToUse:
    "Use it for a short headline, a status line, or a word that changes on a timer, where watching the text arrive is part of the appeal. It is wrong for body copy or anything a visitor needs immediately, because a board takes a moment to land. Columns step toward their target instead of cycling random glyphs, so the flip always resolves. The flaps are decorative: a screen reader gets the finished text once, not a running commentary on the way there.",
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
        "Additional CSS classes. Set the font size here; the flaps scale with it",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    defaults: {
      text: "UI BEATS",
    },
  },
};

export default SplitFlapContent;

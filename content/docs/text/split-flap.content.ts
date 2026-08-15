import type { ComponentConfig } from "@/types/component-config.type";

const SplitFlapContent: ComponentConfig = {
  name: "split-flap",
  category: "text",
  title: "Split Flap",
  description:
    "The SplitFlap component turns text into a mechanical departure board, each column riffling through the alphabet until it reaches its letter, a beat behind the column to its left.",
  addedAt: "2026-08-13",
  whenToUse:
    "For a short headline or status line that changes on a timer, where watching it arrive is part of the appeal. Wrong for anything needed immediately.",
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

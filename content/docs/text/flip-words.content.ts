import type { ComponentConfig } from "@/types/component-config.type";

const FlipWordsContent: ComponentConfig = {
  name: "flip-words",
  category: "text",
  title: "Flip Words",
  description:
    "The FlipWords component cycles one slot in a sentence through a list of words, blurring each out as the next rises into its place and animating the width difference so the rest of the line never jumps.",
  addedAt: "2026-08-15",
  whenToUse:
    "For a hero line that has to name several audiences or use cases without listing them all at once. Keep the words a similar length and make the sentence true for every one of them: a reader who arrives mid-cycle sees exactly one, so any word that only works as part of the set is a word that fails for most visitors.",
  props: [
    {
      prop: "words",
      type: "string[]",
      defaultValue: "-",
      description: "The words to cycle through, in order (required)",
    },
    {
      prop: "interval",
      type: "number",
      defaultValue: "2",
      description: "Seconds each word is held before the next one arrives",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "0.5",
      description: "Seconds the swap itself takes",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes applied to the rotating slot",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    fixedSource: `  words={["designers", "engineers", "founders", "small teams"]}`,
    ranges: {
      interval: { min: 0.5, max: 6, step: 0.25, unit: "s" },
      duration: { min: 0.1, max: 2, step: 0.05, unit: "s" },
    },
  },
};

export default FlipWordsContent;

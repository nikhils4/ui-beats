import type { ComponentConfig } from "@/types/component-config.type";

const ScrollRevealContent: ComponentConfig = {
  name: "scroll-reveal",
  category: "text",
  title: "Scroll Reveal",
  description:
    "The ScrollReveal component lights up text word by word as the reader scrolls past it, tied to scroll position rather than a timer.",
  isNew: true,
  whenToUse:
    "Best on a single statement you want read slowly \u2014 a mission line, a manifesto, a section opener. Because the reveal is bound to the scrollbar, the reader controls the pace and can scroll back. Keep it to one or two sentences; a full paragraph turns reading into work.",
  props: [
    {
      prop: "children",
      type: "string",
      defaultValue: "-",
      description: "The text to reveal, as a plain string (required)",
    },
    {
      prop: "restingOpacity",
      type: "number",
      defaultValue: "0.15",
      description: "Opacity of a word before it is reached",
    },
    {
      prop: "spread",
      type: "number",
      defaultValue: "0.5",
      description: "How much of the viewport the reveal is spread across, 0-1",
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
};

export default ScrollRevealContent;

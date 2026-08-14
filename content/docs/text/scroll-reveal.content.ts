import type { ComponentConfig } from "@/types/component-config.type";

const ScrollRevealContent: ComponentConfig = {
  name: "scroll-reveal",
  category: "text",
  title: "Scroll Reveal",
  description:
    "The ScrollReveal component lights up text word by word as the reader scrolls past it, tied to scroll position rather than a timer.",
  addedAt: "2026-08-12",
  whenToUse:
    "Best on a single statement you want read slowly: a mission line, a manifesto, a section opener. The reveal is bound to the scrollbar, so the reader sets the pace and can scroll back. Keep it to one or two sentences. A full paragraph turns reading into work.",
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
  playground: {
    childrenSource: `  Scroll and every word arrives in turn, tied to the scrollbar rather than to
  a timer.`,
  },
};

export default ScrollRevealContent;

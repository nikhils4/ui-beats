import type { ComponentConfig } from "@/types/component-config.type";

const CardStackContent: ComponentConfig = {
  name: "card-stack",
  category: "card",
  title: "Card Stack",
  description:
    "The CardStack component deals your content as a deck: drag the top card aside to throw it away, the cards behind rise a step, and the dismissed card loops around to the back.",
  isNew: true,
  whenToUse:
    "Use it for a small set of peer items a visitor browses rather than compares — testimonials, tips, onboarding steps. It is a poor fit for anything that must be scanned side by side or reached in a specific order, because only the top card is readable at a time. Only the visible cards are mounted, so deck size costs nothing; autoplay pauses on hover, focus and drag, and arrow keys advance it for anyone not using a pointer.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "One card per child, each given the stack's card chrome",
    },
    {
      prop: "visible",
      type: "number",
      defaultValue: "3",
      description: "How many cards are rendered, counting the one on top",
    },
    {
      prop: "offset",
      type: "number",
      defaultValue: "14",
      description:
        "Vertical gap between each card and the one in front of it, in pixels",
    },
    {
      prop: "scaleStep",
      type: "number",
      defaultValue: "0.05",
      description: "How much smaller each card is than the one in front of it",
    },
    {
      prop: "autoplay",
      type: "number",
      defaultValue: "0",
      description:
        "Milliseconds between automatic advances. 0 turns autoplay off",
    },
    {
      prop: "dismissAt",
      type: "number",
      defaultValue: "90",
      description:
        "Distance, in pixels, a card must be dragged before it is dismissed",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description:
        "Additional CSS classes applied to the stack — set its size here",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
};

export default CardStackContent;

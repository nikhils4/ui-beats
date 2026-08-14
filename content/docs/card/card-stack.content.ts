import type { ComponentConfig } from "@/types/component-config.type";

const CardStackContent: ComponentConfig = {
  name: "card-stack",
  category: "card",
  title: "Card Stack",
  description:
    "The CardStack component deals your content as a deck: drag the top card aside to throw it away, the cards behind rise a step, and the dismissed card loops around to the back.",
  addedAt: "2026-08-13",
  whenToUse:
    "Use it for a small set of peer items people browse rather than compare: testimonials, tips, onboarding steps. It is a poor fit for anything that has to be scanned side by side or reached in a specific order, since only the top card is readable at a time. Only the visible cards are mounted, so deck size costs nothing. Autoplay pauses on hover, focus and drag, and arrow keys advance it for anyone not using a pointer.",
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
        "Additional CSS classes applied to the stack. Set its size here",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    childrenSource: `  {quotes.map(({ quote, name }) => (
    <Quote key={name} quote={quote} name={name} />
  ))}`,
  },
};

export default CardStackContent;

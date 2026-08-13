import type { ComponentConfig } from "@/types/component-config.type";

const FlipCardContent: ComponentConfig = {
  name: "flip-card",
  category: "card",
  title: "Flip Card",
  description:
    "The FlipCard component creates an elegant, Apple-inspired interactive card that flips to reveal additional content. It features smooth animations, subtle gradients, and a clean design that's perfect for showcasing key information or features.",
  addedAt: "2024-08-16",
  whenToUse:
    "Good when the back holds genuinely secondary detail: a definition, a statistic, a longer description. Never hide something essential behind a flip. Hover-triggered flips are unreachable on touch, so set triggerMode to 'click' if mobile matters.",
  props: [
    {
      prop: "frontContent",
      type: "{ title: string; subtitle?: string }",
      defaultValue: "-",
      description:
        "Content to display on the front side of the card (required)",
    },
    {
      prop: "backContent",
      type: "{ title: string; description: string }",
      defaultValue: "-",
      description: "Content to display on the back side of the card (required)",
    },
    {
      prop: "width",
      type: "string",
      defaultValue: "'300px'",
      description: "Width of the flip card",
    },
    {
      prop: "height",
      type: "string",
      defaultValue: "'200px'",
      description: "Height of the flip card",
    },
    {
      prop: "flipDirection",
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: "Direction of the flip animation",
    },
    {
      prop: "triggerMode",
      type: "'hover' | 'click'",
      defaultValue: "'hover'",
      description: "Event that triggers the flip animation",
    },
  ],
  credits: { name: "Michael", url: "https://github.com/lappemic" },
  playground: {
    fixedSource: `  frontContent={{ title: "Discover", subtitle: "Hover to learn more" }}
  backContent={{
    title: "UI Beats",
    description: "A collection of modern and interactive UI components for React.",
  }}`,
  },
};

export default FlipCardContent;

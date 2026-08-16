import type { ComponentConfig } from "@/types/component-config.type";

const ConfettiButtonContent: ComponentConfig = {
  name: "confetti-button",
  category: "button",
  title: "Confetti Button",
  description:
    "The ConfettiButton component throws a burst of confetti from its own centre when pressed, measuring the button's position at click time so the pieces come from the thing the reader actually pressed.",
  addedAt: "2026-08-15",
  whenToUse:
    "For the end of something: a completed onboarding, a first deploy, a plan upgrade. It has to stay rare to keep working — a confetti burst on an ordinary save turns the celebration into noise, and the second time a reader sees it they are already waiting for it to clear.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Button label or content (required)",
    },
    {
      prop: "particleCount",
      type: "number",
      defaultValue: "90",
      description: "How many pieces each burst throws",
    },
    {
      prop: "spread",
      type: "number",
      defaultValue: "70",
      description: "How wide the burst fans out, in degrees",
    },
    {
      prop: "colors",
      type: "string[]",
      defaultValue: "5 preset hexes",
      description:
        "Hex colours the pieces are drawn from. canvas-confetti reads hex only",
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
    childrenSource: `  Ship it`,
    ranges: {
      particleCount: { min: 10, max: 300, step: 10 },
      spread: { min: 20, max: 360, step: 5, unit: "°" },
    },
  },
};

export default ConfettiButtonContent;

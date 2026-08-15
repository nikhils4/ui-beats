import type { ComponentConfig } from "@/types/component-config.type";

const ScratchToRevealContent: ComponentConfig = {
  name: "scratch-to-reveal",
  category: "component",
  title: "Scratch to Reveal",
  description:
    "The ScratchToReveal component covers your content in a foil the user rubs away with a pointer, firing onComplete and dropping the rest of the foil once enough has been cleared.",
  addedAt: "2026-08-13",
  whenToUse:
    "For a reward worth uncovering: a discount code, a giveaway result, a launch-day surprise. The delay rules it out for anything needed quickly.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Content hidden under the foil",
    },
    {
      prop: "width",
      type: "number",
      defaultValue: "300",
      description: "Width of the scratch area, in pixels",
    },
    {
      prop: "height",
      type: "number",
      defaultValue: "200",
      description: "Height of the scratch area, in pixels",
    },
    {
      prop: "brushSize",
      type: "number",
      defaultValue: "22",
      description: "Radius of the scratching brush, in pixels",
    },
    {
      prop: "threshold",
      type: "number",
      defaultValue: "0.55",
      description:
        "Fraction of the foil (0–1) that must be cleared before the rest falls away",
    },
    {
      prop: "coverFrom",
      type: "string",
      defaultValue: '"#9ca3af"',
      description: "Start colour of the foil gradient",
    },
    {
      prop: "coverTo",
      type: "string",
      defaultValue: '"#4b5563"',
      description: "End colour of the foil gradient",
    },
    {
      prop: "label",
      type: "string",
      defaultValue: '"Scratch here"',
      description: "Prompt printed on the foil, scratched away with it",
    },
    {
      prop: "onComplete",
      type: "() => void",
      defaultValue: "-",
      description: "Fired once, when the threshold is crossed",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes applied to the card",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    childrenSource: `  <div className="text-center">
    <p className="font-mono text-2xl font-bold text-brand">BEATS-30</p>
  </div>`,
  },
};

export default ScratchToRevealContent;

import type { ComponentConfig } from "@/types/component-config.type";

const BorderBeamContent: ComponentConfig = {
  name: "border-beam",
  category: "component",
  title: "Border Beam",
  description:
    "The BorderBeam component wraps any content in a border traced by a travelling beam of light. It follows the container's rounded corners exactly, and nothing around it moves.",
  addedAt: "2026-08-13",
  whenToUse:
    "For the one element you want looked at first: a recommended tier, a featured card, a call to action. Keep it to one per screen.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Content rendered inside the bordered container",
    },
    {
      prop: "borderWidth",
      type: "number",
      defaultValue: "1.5",
      description: "Thickness of the animated border, in pixels",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "6",
      description: "Seconds for the beam to travel once around the element",
    },
    {
      prop: "colorFrom",
      type: "string",
      defaultValue: '"#a855f7"',
      description: "Leading colour of the beam",
    },
    {
      prop: "colorTo",
      type: "string",
      defaultValue: '"#22d3ee"',
      description: "Trailing colour, faded out into the border",
    },
    {
      prop: "arc",
      type: "number",
      defaultValue: "70",
      description:
        "Degrees of the border the beam covers; smaller reads as a sharper streak",
    },
    {
      prop: "glow",
      type: "boolean",
      defaultValue: "true",
      description:
        "Paint a blurred copy underneath so the beam bleeds onto the page",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes applied to the outer container",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    childrenSource: `  <div className="p-6">
    <h3 className="text-sm font-semibold">Pro plan</h3>
  </div>`,
  },
};

export default BorderBeamContent;

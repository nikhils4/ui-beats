import type { ComponentConfig } from "@/types/component-config.type";

const TiltCardContent: ComponentConfig = {
  name: "tilt-card",
  category: "card",
  title: "Tilt Card",
  description:
    "The TiltCard component tilts toward the pointer in 3D and tracks it with a specular highlight, giving flat cards a tactile, physical feel.",
  addedAt: "2026-08-11",
  whenToUse:
    "Adds physicality to a card that already deserves attention: a featured plan, a case study, a hero product shot. Use a low maxTilt of 10 to 15 degrees for text-heavy cards, since steeper angles make body copy hard to read at the corners.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Content rendered inside the card (required)",
    },
    {
      prop: "maxTilt",
      type: "number",
      defaultValue: "12",
      description: "Maximum rotation in degrees at the edges of the card",
    },
    {
      prop: "hoverScale",
      type: "number",
      defaultValue: "1.03",
      description: "Scale applied while the pointer is over the card",
    },
    {
      prop: "glareOpacity",
      type: "number",
      defaultValue: "0.25",
      description: "Strength of the specular highlight, between 0 and 1",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for the outer perspective wrapper",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    childrenSource: `  <div className="p-6">
    <p className="text-lg font-semibold">Tilt me</p>
  </div>`,
  },
};

export default TiltCardContent;

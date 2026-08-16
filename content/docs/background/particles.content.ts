import type { ComponentConfig } from "@/types/component-config.type";

const ParticlesContent: ComponentConfig = {
  name: "particles",
  category: "background",
  title: "Particles",
  description:
    "The Particles component draws a drifting field of specks on a canvas and scatters them away from the pointer, holding positions as fractions of the frame so a resize redraws the field instead of reshuffling it.",
  addedAt: "2026-08-15",
  whenToUse:
    "Behind a hero or a launch page that wants depth and a reason to move the mouse. It paints on every frame, so keep the quantity modest and use one per view: a page with three particle fields spends more of its frame budget on decoration than on the interface.",
  fullBleedPreview: true,
  props: [
    {
      prop: "quantity",
      type: "number",
      defaultValue: "60",
      description: "How many particles to draw",
    },
    {
      prop: "color",
      type: "string",
      defaultValue: "'currentColor'",
      description: "Colour of the particles. Any CSS colour, or currentColor",
    },
    {
      prop: "speed",
      type: "number",
      defaultValue: "0.03",
      description: "How far they drift, as a fraction of the frame per second",
    },
    {
      prop: "size",
      type: "number",
      defaultValue: "2",
      description: "Largest particle radius, in pixels",
    },
    {
      prop: "repel",
      type: "number",
      defaultValue: "90",
      description:
        "Radius around the pointer that pushes particles away, in pixels",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description:
        "Additional CSS classes. Set the colour here when using currentColor",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    ranges: {
      quantity: { min: 10, max: 240, step: 5 },
      speed: { min: 0, max: 0.3, step: 0.005 },
      size: { min: 0.5, max: 8, step: 0.1, unit: "px" },
      repel: { min: 0, max: 240, step: 10, unit: "px" },
    },
  },
};

export default ParticlesContent;

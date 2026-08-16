import type { ComponentConfig } from "@/types/component-config.type";

const AuroraContent: ComponentConfig = {
  name: "aurora",
  category: "background",
  title: "Aurora",
  description:
    "The Aurora component drifts three soft bands of colour behind your content on different periods, so the layer keeps rearranging itself instead of looping visibly. Pure CSS gradients and transforms, no canvas.",
  addedAt: "2026-08-15",
  whenToUse:
    "Behind a hero, a pricing header or an empty state that needs atmosphere rather than an image. Keep intensity low under body copy: the blur is wide enough that a bright aurora will pull contrast out from under the text sitting on top of it.",
  fullBleedPreview: true,
  props: [
    {
      prop: "from",
      type: "string",
      defaultValue: "'var(--brand)'",
      description: "Colour the ribbons start from. Any CSS colour",
    },
    {
      prop: "via",
      type: "string",
      defaultValue: "'var(--accent-pink)'",
      description: "Colour they pass through at their brightest",
    },
    {
      prop: "speed",
      type: "number",
      defaultValue: "14",
      description: "Seconds for one drift cycle (higher is slower)",
    },
    {
      prop: "blur",
      type: "number",
      defaultValue: "72",
      description: "How far the ribbons are softened, in pixels",
    },
    {
      prop: "intensity",
      type: "number",
      defaultValue: "0.55",
      description: "Overall opacity of the layer, 0 to 1",
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
    ranges: {
      speed: { min: 3, max: 40, step: 0.5, unit: "s" },
      blur: { min: 0, max: 160, step: 4, unit: "px" },
    },
  },
};

export default AuroraContent;

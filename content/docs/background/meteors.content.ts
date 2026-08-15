import type { ComponentConfig } from "@/types/component-config.type";

const MeteorsContent: ComponentConfig = {
  name: "meteors",
  category: "background",
  title: "Meteors",
  description:
    "The Meteors component drops a field of glowing streaks across its container, each one falling at its own pace so the shower never settles into a repeating pattern.",
  addedAt: "2026-08-15",
  fullBleedPreview: true,
  whenToUse:
    "Behind a hero, a pricing panel or an empty state that reads as flat on its own, anywhere you want depth without a picture to load. It is at its best on a dark surface, where the heads have something to glow against; over a light background the streaks wash out and a higher `count` only makes the frame look dusty. Keep the count modest behind text: every streak is an animated element, and forty of them competing with a paragraph costs legibility as well as frames. Nothing moves at all under `prefers-reduced-motion`.",
  props: [
    {
      prop: "count",
      type: "number",
      defaultValue: "20",
      description: "How many streaks are in the air at once",
    },
    {
      prop: "angle",
      type: "number",
      defaultValue: "20",
      description:
        "Direction of travel, in degrees clockwise from straight down",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "3",
      description:
        "Seconds for one streak to cross the frame, before per-streak variation",
    },
    {
      prop: "trailLength",
      type: "number",
      defaultValue: "90",
      description: "Length of a streak's tail in pixels, before variation",
    },
    {
      prop: "color",
      type: "string",
      defaultValue: "#ffffff",
      description: "Colour of the head and the tail it fades out of",
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
      trailLength: { min: 20, max: 240, step: 5, unit: "px" },
    },
  },
};

export default MeteorsContent;

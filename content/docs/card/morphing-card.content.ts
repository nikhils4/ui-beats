import type { ComponentConfig } from "@/types/component-config.type";

const MorphingCardContent: ComponentConfig = {
  name: "morphing-card",
  category: "card",
  title: "Morphing Card",
  description:
    "The MorphingCard component creates an engaging, interactive card that smoothly transitions between different shapes and content. It features elegant 3D rotations, customizable gradients, and a clean design that's perfect for showcasing key information or features in a visually striking manner.",
  addedAt: "2024-08-22",
  whenToUse:
    "For cycling through a small set of related ideas in one slot: three product pillars, three use cases. Because it advances on a timer, keep each piece of copy short enough to read inside one interval, and consider turning autoPlay off where the content matters.",
  props: [
    {
      prop: "width",
      type: "string",
      defaultValue: "'300px'",
      description: "Width of the morphing card",
    },
    {
      prop: "height",
      type: "string",
      defaultValue: "'300px'",
      description: "Height of the morphing card",
    },
    {
      prop: "contents",
      type: "Array<{ shape: 'rectangle' | 'circle' | 'hexagon'; title: string; description: string; }>",
      defaultValue: "-",
      description:
        "Array of content objects for each state of the card (required)",
    },
    {
      prop: "colorScheme",
      type: "{ from: string; to: string; }",
      defaultValue: "{ from: '#4F46E5', to: '#7C3AED' }",
      description: "Gradient color scheme for the card background",
    },
    {
      prop: "autoPlay",
      type: "boolean",
      defaultValue: "true",
      description: "Whether the card should automatically cycle through shapes",
    },
    {
      prop: "interval",
      type: "number",
      defaultValue: "3000",
      description:
        "Time interval (in milliseconds) between shape transitions when autoPlay is true",
    },
  ],
  credits: { name: "Michael", url: "https://github.com/lappemic" },
  playground: {
    fixedSource: `  contents={[
    { shape: "rectangle", title: "Copy", description: "Take the source." },
    { shape: "circle", title: "Own", description: "Change what you like." },
    { shape: "hexagon", title: "Ship", description: "No version to pin." },
  ]}`,
  },
};

export default MorphingCardContent;

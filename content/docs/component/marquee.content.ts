import type { ComponentConfig } from "@/types/component-config.type";

const MarqueeContent: ComponentConfig = {
  name: "marquee",
  category: "component",
  title: "Marquee",
  description:
    "The Marquee component scrolls its children in a seamless, infinite loop, with pause-on-hover and faded edges.",
  isNew: true,
  whenToUse:
    "The standard home for logo walls, testimonial rows and 'trusted by' strips \u2014 content a reader should notice without being asked to read it in order. Because the loop never stops, do not put anything essential in it, and keep the speed low enough that a passing glance can catch a single item.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description:
        "Content to scroll; it is rendered twice to form the loop (required)",
    },
    {
      prop: "speed",
      type: "number",
      defaultValue: "60",
      description: "Pixels travelled per second",
    },
    {
      prop: "direction",
      type: "'left' | 'right'",
      defaultValue: "'left'",
      description: "Direction of travel",
    },
    {
      prop: "pauseOnHover",
      type: "boolean",
      defaultValue: "true",
      description: "Pause while the pointer is over the marquee",
    },
    {
      prop: "fadeEdges",
      type: "boolean",
      defaultValue: "true",
      description: "Fade the leading and trailing edges into the background",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for the container",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
};

export default MarqueeContent;

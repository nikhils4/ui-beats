import type { ComponentConfig } from "@/types/component-config.type";

const AnimatedListContent: ComponentConfig = {
  name: "animated-list",
  category: "animation",
  title: "Animated List",
  description:
    "The AnimatedList component streams its children in one at a time, springing each new entry into place and pushing the older ones down until they fall out of the bottom of the list.",
  isNew: true,
  whenToUse:
    "Use it on a landing page to show a product that produces a feed — notifications, orders, deploys, alerts — where a still screenshot cannot convey that things keep arriving. Only the visible window is mounted, so it costs the same after an hour as it does in its first second. If you wire it to real data rather than a scripted loop, set `live` so arrivals are announced instead of appearing silently to a screen reader.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "One entry per child, emitted in order",
    },
    {
      prop: "delay",
      type: "number",
      defaultValue: "1400",
      description: "Milliseconds between entries arriving",
    },
    {
      prop: "max",
      type: "number",
      defaultValue: "4",
      description:
        "How many entries stay on screen before the oldest is dropped",
    },
    {
      prop: "loop",
      type: "boolean",
      defaultValue: "true",
      description: "Start over once the last child has been emitted",
    },
    {
      prop: "live",
      type: "boolean",
      defaultValue: "false",
      description:
        "Announce arrivals to screen readers — for genuinely live content",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes applied to the list",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
};

export default AnimatedListContent;

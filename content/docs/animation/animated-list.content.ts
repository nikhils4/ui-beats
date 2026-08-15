import type { ComponentConfig } from "@/types/component-config.type";

const AnimatedListContent: ComponentConfig = {
  name: "animated-list",
  category: "animation",
  title: "Animated List",
  description:
    "The AnimatedList component streams its children in one at a time, springing each new entry into place and pushing the older ones down until they fall out of the bottom of the list.",
  addedAt: "2026-08-13",
  whenToUse:
    "For a product that produces a feed: notifications, orders, deploys, alerts. A still screenshot cannot show that things keep arriving.",
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
        "Announce arrivals to screen readers, for genuinely live content",
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
  playground: {
    childrenSource: `  {events.map(({ icon: Icon, title, meta }) => (
    <Notification key={title} icon={Icon} title={title} meta={meta} />
  ))}`,
  },
};

export default AnimatedListContent;

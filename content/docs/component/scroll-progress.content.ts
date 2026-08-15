import type { ComponentConfig } from "@/types/component-config.type";

const ScrollProgressContent: ComponentConfig = {
  name: "scroll-progress",
  category: "component",
  title: "Scroll Progress",
  description:
    "The ScrollProgress component fills a thin bar as the reader moves through a page or a panel, scaling a single transform rather than resizing an element so it costs nothing on the scroll frame.",
  addedAt: "2026-08-15",
  whenToUse:
    "For long reads where the scrollbar alone does not answer how much is left. Pass a container to track a panel, or omit it to track the whole page.",
  props: [
    {
      prop: "container",
      type: "RefObject<HTMLElement | null>",
      defaultValue: "-",
      description:
        "Scroll container to track. Omit to track the window, which also switches the bar from absolute to fixed positioning",
    },
    {
      prop: "height",
      type: "number",
      defaultValue: "3",
      description: "Thickness of the bar, in pixels",
    },
    {
      prop: "color",
      type: "string",
      defaultValue: "var(--primary)",
      description: "Any CSS colour or gradient",
    },
    {
      prop: "position",
      type: "'top' | 'bottom'",
      defaultValue: "top",
      description: "Which edge of the container the bar sits on",
    },
    {
      prop: "smooth",
      type: "boolean",
      defaultValue: "true",
      description:
        "Ease the bar toward the true position with a spring instead of tracking raw scroll deltas",
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
    fixedSource: "  container={scrollArea}",
  },
};

export default ScrollProgressContent;

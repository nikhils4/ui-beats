import type { ComponentConfig } from "@/types/component-config.type";

const AnimatedBeamContent: ComponentConfig = {
  name: "animated-beam",
  category: "background",
  title: "Animated Beam",
  description:
    "The AnimatedBeam component draws a curved line between any two elements and sends a gradient pulse along it, remeasuring whenever the layout moves.",
  isNew: true,
  whenToUse:
    "For architecture and integration diagrams, where the point is that data moves between two things. Because the path is measured from live element geometry it survives responsive reflow, so it holds up in a diagram that stacks on mobile. Stagger the delay across several beams so the pulses read as flow rather than as a single blink.",
  props: [
    {
      prop: "containerRef",
      type: "RefObject<HTMLElement>",
      defaultValue: "-",
      description:
        "The positioned element both endpoints live inside (required)",
    },
    {
      prop: "fromRef",
      type: "RefObject<HTMLElement>",
      defaultValue: "-",
      description: "Element the beam starts at (required)",
    },
    {
      prop: "toRef",
      type: "RefObject<HTMLElement>",
      defaultValue: "-",
      description: "Element the beam ends at (required)",
    },
    {
      prop: "curvature",
      type: "number",
      defaultValue: "0",
      description: "Arc height in pixels; positive bows up, negative bows down",
    },
    {
      prop: "reverse",
      type: "boolean",
      defaultValue: "false",
      description: "Send the pulse from the end to the start",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "3",
      description: "Seconds for one pulse to travel the path",
    },
    {
      prop: "delay",
      type: "number",
      defaultValue: "0",
      description: "Seconds before the pulse starts",
    },
    {
      prop: "pathColor",
      type: "string",
      defaultValue: "'var(--border)'",
      description: "Colour of the static path beneath the pulse",
    },
    {
      prop: "gradientStart",
      type: "string",
      defaultValue: "'var(--brand)'",
      description: "First colour of the travelling gradient",
    },
    {
      prop: "gradientStop",
      type: "string",
      defaultValue: "'var(--accent-pink)'",
      description: "Second colour of the travelling gradient",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for the SVG",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
};

export default AnimatedBeamContent;

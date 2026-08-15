import type { ComponentConfig } from "@/types/component-config.type";

const AvatarStackContent: ComponentConfig = {
  name: "avatar-stack",
  category: "component",
  title: "Avatar Stack",
  description:
    "The AvatarStack component overlaps a row of avatars into a single group, collapses everyone past a limit into a +N chip, and lifts an avatar clear of its neighbours on hover without the row changing width.",
  addedAt: "2026-08-15",
  whenToUse:
    "For social proof beside a headline, the members of a shared document, or the assignees on a task: any short list of people where the group matters more than the individuals. It reads as a group up to about eight faces; past that the overlap hides too much of each one and a plain list serves better. Give every entry a real name even when you pass an image: the name is what a screen reader announces, and the initials fallback is built from it.",
  props: [
    {
      prop: "avatars",
      type: "AvatarStackItem[]",
      defaultValue: "-",
      description: "The people to show, in display order (required)",
    },
    {
      prop: "AvatarStackItem: name",
      type: "string",
      defaultValue: "-",
      description:
        "Full name. Used as the image's alt text and as the source of the initials fallback",
    },
    {
      prop: "AvatarStackItem: src",
      type: "string",
      defaultValue: "-",
      description:
        "Optional image URL. An entry without one renders its initials instead",
    },
    {
      prop: "max",
      type: "number",
      defaultValue: "5",
      description:
        "How many avatars to show before the rest collapse into a +N chip",
    },
    {
      prop: "size",
      type: "number",
      defaultValue: "40",
      description: "Diameter of one avatar, in pixels",
    },
    {
      prop: "overlap",
      type: "number",
      defaultValue: "12",
      description: "How far each avatar sits over the one before it, in pixels",
    },
    {
      prop: "ring",
      type: "boolean",
      defaultValue: "true",
      description:
        "Draw a ring in the page background colour, to separate the discs",
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
    fixedSource: "  avatars={team}",
    ranges: {
      overlap: { min: 0, max: 40, step: 1, unit: "px" },
    },
  },
};

export default AvatarStackContent;

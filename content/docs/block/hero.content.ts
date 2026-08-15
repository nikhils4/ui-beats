import type { ComponentConfig } from "@/types/component-config.type";

const HeroContent: ComponentConfig = {
  name: "hero",
  category: "block",
  title: "Hero",
  description:
    "The Hero block is a complete landing page opening: eyebrow, headline, description, two calls to action and a row of faces for social proof, over a field of falling meteors. Installing it installs the three components it is built from.",
  addedAt: "2026-08-15",
  fullBleedPreview: true,
  whenToUse:
    "The opening section of a marketing page. It ships the whole arrangement, so use it when centred copy with two actions is the layout you want.",
  props: [
    {
      prop: "title",
      type: "React.ReactNode",
      defaultValue: "-",
      description:
        "The headline. Takes nodes, so part of it can be styled or animated (required)",
    },
    {
      prop: "eyebrow",
      type: "string",
      defaultValue: "-",
      description: "Small line above the headline, such as a release note",
    },
    {
      prop: "description",
      type: "string",
      defaultValue: "-",
      description: "Supporting line under the headline",
    },
    {
      prop: "primaryAction",
      type: "{ label: string; href: string }",
      defaultValue: "-",
      description: "The main call to action, rendered as a Shimmer Button",
    },
    {
      prop: "secondaryAction",
      type: "{ label: string; href: string }",
      defaultValue: "-",
      description: "A quieter second action beside the first",
    },
    {
      prop: "avatars",
      type: "AvatarStackItem[]",
      defaultValue: "-",
      description:
        "Faces for the social proof row. Omit it and the row is not rendered",
    },
    {
      prop: "proof",
      type: "string",
      defaultValue: "-",
      description: "The line beside those faces, e.g. 'Joined by 2,400 teams'",
    },
    {
      prop: "showMeteors",
      type: "boolean",
      defaultValue: "true",
      description: "Streaks behind the content. Set false for a plain surface",
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
};

export default HeroContent;

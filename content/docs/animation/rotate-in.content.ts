import type { ComponentConfig } from "@/types/component-config.type";

const RotateInContent: ComponentConfig = {
  name: "rotate-in",
  category: "animation",
  title: "Rotate In",
  description:
    "The RotateIn component creates a smooth rotation animation for its children when they enter the viewport.",
  addedAt: "2024-08-04",
  whenToUse:
    "Best on small, self-contained elements: icons, badges, logos, avatars. Rotating a block of text makes it briefly unreadable, so keep this for things that read as objects instead of as content.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "The content to be rotated in (required)",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "0.5",
      description: "Duration of the animation (in seconds)",
    },
    {
      prop: "delay",
      type: "number",
      defaultValue: "0",
      description: "Delay before the animation starts (in seconds)",
    },
    {
      prop: "rotateFrom",
      type: "number",
      defaultValue: "90",
      description: "Initial rotation angle (in degrees)",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for styling",
    },
    {
      prop: "once",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to trigger the animation only once",
    },
  ],
  credits: { name: "Michael", url: "https://github.com/lappemic" },
  playground: {
    childrenSource:
      '  <p className="text-lg font-semibold">Supercharge your UI</p>',
  },
};

export default RotateInContent;

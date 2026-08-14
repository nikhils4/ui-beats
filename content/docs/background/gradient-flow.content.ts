import type { ComponentConfig } from "@/types/component-config.type";

const GradientFlowContent: ComponentConfig = {
  name: "gradient-flow",
  category: "background",
  title: "Gradient Flow",
  description:
    "The GradientFlow component creates a flowing gradient animation effect for its children, adding visual interest to backgrounds or UI elements.",
  addedAt: "2024-08-15",
  fullBleedPreview: true,
  whenToUse:
    "A calm, always-moving backdrop for heroes and call-to-action sections. Because it never settles, keep it behind large type and avoid placing dense body copy on top of it.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description:
        "The content to be wrapped with the gradient flow effect (required)",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "10",
      description: "Duration of the animation cycle (in seconds)",
    },
    {
      prop: "colors",
      type: "string[]",
      defaultValue: "['#ff0080', '#7928ca', '#ff4d4d']",
      description: "Array of colors to use in the gradient",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for styling",
    },
  ],
  credits: { name: "Michael", url: "https://github.com/lappemic" },
  playground: {
    childrenSource: `  <div className="text-md text-white md:text-lg">
    Flowing Gradient Background
  </div>`,
  },
};

export default GradientFlowContent;

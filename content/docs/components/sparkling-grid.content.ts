import { ComponentConfigType } from "@/types/component-config.type";
import { getAnimationPreview } from "@/lib/animation-preview";

const SparklingGridContent: ComponentConfigType = {
  breadcrumbs: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Components",
    },
  ],
  title: "Sparkling Grid",
  description:
    "The SparklingGrid component creates an animated grid of dots with a sparkling effect, ideal for creating dynamic and engaging backgrounds.",
  usageCode: `${getAnimationPreview("sparkling-grid", 1, true)}`,
  installation: [
    {
      description: "If you want to use dynamic themes, add the following to your project (optional)",
      code: `import { useTheme } from "next-themes";

const YourComponent = () => {
  const { theme } = useTheme();

  return (
    <SparklingGrid theme={theme as "light" | "dark"} />
  );
};`,
  },
    {
      description: "Add the following code into your project",
      isFullCode: true,
    },
    {
      description: "Update the import paths according to your project setup",
    },
  ],
  props: [
    {
      prop: "gridSize",
      type: "number",
      defaultValue: "30",
      description: "Size of each grid cell in pixels",
    },
    {
      prop: "sparkleFrequency",
      type: "number",
      defaultValue: "0.03",
      description: "Frequency of sparkling effect (0-1)",
    },
    {
      prop: "sparkleColor",
      type: "{ light: string; dark: string }",
      defaultValue: "{ light: 'darkgray', dark: 'silver' }",
      description: "Colors for the sparkling effect in light and dark themes",
    },
    {
      prop: "dotColor",
      type: "{ light: string; dark: string }",
      defaultValue: "{ light: 'bg-black/20', dark: 'bg-white/20' }",
      description: "Colors for the grid dots in light and dark themes",
    },
    {
      prop: "theme",
      type: "'light' | 'dark'",
      defaultValue: "'light'",
      description: "Current theme of the component",
    },
  ],
};

export default SparklingGridContent;

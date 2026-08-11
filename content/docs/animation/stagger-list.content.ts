import type { ComponentConfig } from "@/types/component-config.type";

const StaggerListContent: ComponentConfig = {
  name: "stagger-list",
  category: "animation",
  title: "Stagger List",
  description:
    "The StaggerList component animates its children into view one after another when the list enters the viewport, without requiring any changes to the children themselves.",
  isNew: true,
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Items to stagger; each direct child is wrapped (required)",
    },
    {
      prop: "stagger",
      type: "number",
      defaultValue: "0.08",
      description: "Seconds between each child's entrance",
    },
    {
      prop: "delay",
      type: "number",
      defaultValue: "0",
      description: "Seconds before the first child animates",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "0.5",
      description: "Duration of each child's entrance, in seconds",
    },
    {
      prop: "distance",
      type: "number",
      defaultValue: "24",
      description: "Travel distance of the entrance, in pixels",
    },
    {
      prop: "direction",
      type: "'up' | 'down' | 'left' | 'right'",
      defaultValue: "'up'",
      description: "Direction the children travel from",
    },
    {
      prop: "once",
      type: "boolean",
      defaultValue: "true",
      description: "Animate only the first time the list enters the viewport",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for the container",
    },
  ],
};

export default StaggerListContent;

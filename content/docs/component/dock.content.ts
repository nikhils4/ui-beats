import type { ComponentConfig } from "@/types/component-config.type";

const DockContent: ComponentConfig = {
  name: "dock",
  category: "component",
  title: "Dock",
  description:
    "The Dock component recreates the macOS dock: items swell as the pointer approaches, and each one names itself in a tooltip on hover or focus.",
  addedAt: "2026-08-12",
  whenToUse:
    "For a small fixed set of destinations that should feel like an object: a tool palette, a demo launcher, a portfolio nav. Keep it under eight items.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "One <DockItem> per entry (required)",
    },
    {
      prop: "size",
      type: "number",
      defaultValue: "44",
      description: "Resting size of each item, in pixels",
    },
    {
      prop: "magnification",
      type: "number",
      defaultValue: "76",
      description: "Size an item reaches directly under the pointer",
    },
    {
      prop: "reach",
      type: "number",
      defaultValue: "130",
      description:
        "How far, in pixels, the magnification reaches along the dock",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for the dock container",
    },
    {
      prop: "DockItem: label",
      type: "string",
      defaultValue: "-",
      description:
        "Name shown in the tooltip and used as the item's accessible name (required)",
    },
    {
      prop: "DockItem: children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Icon or content for the item (required)",
    },
    {
      prop: "DockItem: onClick",
      type: "() => void",
      defaultValue: "undefined",
      description: "Called when the item is activated",
    },
    {
      prop: "DockItem: href",
      type: "string",
      defaultValue: "undefined",
      description: "Render the item as a link instead of a button",
    },
    {
      prop: "DockItem: className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for the item itself",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    childrenSource: `  {items.map(({ label, icon: Icon }) => (
    <DockItem key={label} label={label}>
      <Icon className="size-1/2 text-muted-foreground" />
    </DockItem>
  ))}`,
  },
};

export default DockContent;

import {
  ArrowUpDown,
  Book,
  Component,
  CreditCard,
  LayoutTemplate,
  MousePointer,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { ComponentCategory } from "@/types/component-config.type";

/**
 * Client-safe category metadata.
 *
 * Kept separate from `lib/registry.ts` because that module is `server-only`
 * (it reads component source off disk) while the sidebar and command menu are
 * client components that still need labels and icons.
 */
export const CATEGORY_META: Record<
  ComponentCategory,
  { label: string; icon: LucideIcon }
> = {
  animation: { label: "Animation", icon: ArrowUpDown },
  background: { label: "Background", icon: Palette },
  block: { label: "Block", icon: LayoutTemplate },
  button: { label: "Button", icon: MousePointer },
  card: { label: "Card", icon: CreditCard },
  component: { label: "Component", icon: Component },
  text: { label: "Text", icon: Sparkles },
};

/**
 * Display order for categories in the sidebar.
 *
 * Blocks lead. They are whole sections assembled from the primitives below
 * them, so they are both the thing most visitors are actually shopping for and
 * the shortest path to seeing what the rest of the library can do. Everything
 * after them stays alphabetical.
 */
export const CATEGORY_ORDER: ComponentCategory[] = [
  "block",
  "animation",
  "background",
  "button",
  "card",
  "component",
  "text",
];

export function isCategory(value: string): value is ComponentCategory {
  return Object.prototype.hasOwnProperty.call(CATEGORY_META, value);
}

export const GETTING_STARTED = {
  title: "Getting Started",
  icon: Book,
  items: [
    { title: "Introduction", path: "/docs/getting-started/introduction" },
    { title: "Installation", path: "/docs/getting-started/installation" },
    { title: "CLI", path: "/docs/getting-started/cli" },
    { title: "MCP Server", path: "/docs/getting-started/mcp" },
    { title: "Contribute", path: "/docs/getting-started/contribute" },
  ],
} as const;

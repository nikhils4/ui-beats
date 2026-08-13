import {
  ArrowUpDown,
  Book,
  Component,
  CreditCard,
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
  button: { label: "Button", icon: MousePointer },
  card: { label: "Card", icon: CreditCard },
  component: { label: "Component", icon: Component },
  text: { label: "Text", icon: Sparkles },
};

/** Display order for categories in the sidebar. */
export const CATEGORY_ORDER = Object.keys(CATEGORY_META) as ComponentCategory[];

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

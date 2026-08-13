import type { LucideIcon } from "lucide-react";
import componentConfigs from "@/content/docs";
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  GETTING_STARTED,
  isCategory,
} from "@/config/categories";
import { isRecentlyAdded } from "@/config/recency";

export interface SideNavItem {
  title: string;
  path: string;
  isNew?: boolean;
}

export interface SideNavSection {
  title: string;
  icon?: LucideIcon;
  subItems: SideNavItem[];
}

/**
 * The sidebar, derived from the component registry rather than hand-listed.
 *
 * The old version was a hardcoded array that had already drifted: every
 * `/docs/<category>` landing page indexed into it by a magic number
 * (`sideNav[1]`, `sideNav[3]`, …) and all six of those numbers pointed at the
 * wrong section. Deriving the nav means a new component shows up here on its
 * own, and in the sitemap, the command menu and the registry too.
 */
export const sideNav: SideNavSection[] = [
  {
    title: GETTING_STARTED.title,
    icon: GETTING_STARTED.icon,
    subItems: GETTING_STARTED.items.map((item) => ({ ...item })),
  },
  ...CATEGORY_ORDER.map((category) => ({
    title: CATEGORY_META[category].label,
    icon: CATEGORY_META[category].icon,
    subItems: componentConfigs
      .filter((config) => config.category === category)
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((config) => ({
        title: config.title,
        path: `/docs/${config.category}/${config.name}`,
        // Derived from the component's date rather than a flag someone has to
        // remember to clear, so the badge ages out on its own.
        ...(isRecentlyAdded(config.addedAt) ? { isNew: true as const } : {}),
      })),
  })).filter((section) => section.subItems.length > 0),
];

/** First documented component in a category, used by category landing pages. */
export function firstComponentPath(category: string): string | undefined {
  if (!isCategory(category)) return undefined;
  const label = CATEGORY_META[category].label;
  return sideNav.find((s) => s.title === label)?.subItems[0]?.path;
}

export default sideNav;

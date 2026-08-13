import type { ComponentCategory } from "@/types/component-config.type";

/**
 * Search-facing titles for component pages.
 *
 * The pages used to be titled "Flip Card | UI Beats", which only competes for
 * a query nobody types. People search "react flip card component" and "react
 * text shine animation", so the title leads with those words and keeps the
 * brand as the suffix.
 */

/** Noun phrase appended per category to match how people phrase the query. */
const CATEGORY_SUFFIX: Record<ComponentCategory, string[]> = {
  animation: ["Animation"],
  background: ["Background"],
  button: ["Button"],
  card: ["Card", "Component"],
  component: ["Component"],
  text: ["Animation"],
};

/**
 * `"Flip Card"` + `["Card", "Component"]` -> `"Flip Card Component"`.
 * Without the dedupe this would read "Flip Card Card Component".
 */
function appendSuffix(title: string, suffix: string[]): string {
  const words = title.split(" ");
  const last = words.at(-1)?.toLowerCase();
  const remaining = suffix.filter(
    (word, index) => !(index === 0 && word.toLowerCase() === last),
  );
  return [...words, ...remaining].join(" ");
}

export function componentSeoTitle(entry: {
  title: string;
  category: string;
}): string {
  const suffix = CATEGORY_SUFFIX[entry.category as ComponentCategory] ?? [
    "Component",
  ];
  return `React ${appendSuffix(entry.title, suffix)}`;
}

/**
 * Keyword set for a component page. Deduped and lowercased so the same term
 * cannot appear twice via different routes.
 */
export function componentKeywords(entry: {
  title: string;
  category: string;
}): string[] {
  const name = entry.title.toLowerCase();
  const seoTitle = componentSeoTitle(entry).toLowerCase();

  return [
    ...new Set([
      seoTitle,
      `${name} react`,
      `react ${name}`,
      `tailwind ${name}`,
      `${name} component`,
      `${name} animation`,
      "react component library",
      "tailwind css components",
      "motion",
      "shadcn registry",
      "copy paste react components",
    ]),
  ];
}

/** Title for a category landing page, e.g. "React Card Components". */
export function categorySeoTitle(label: string, category: string): string {
  if (category === "background") return "React Animated Backgrounds";
  if (category === "animation") return "React Animation Components";
  if (category === "text") return "React Text Animation Components";
  // The "component" category is the catch-all bucket; the naive template
  // produced "React Component Components".
  if (category === "component") return "React Utility Components";
  return `React ${label} Components`;
}

export const CATEGORY_INTRO: Record<ComponentCategory, string> = {
  animation:
    "Entrance and scroll-triggered animations for React. Each one wraps your existing markup, so you can add motion without restructuring a component.",
  background:
    "Animated background layers for React. Drop one behind a hero or section and layer your content above it.",
  button:
    "Interactive React buttons with motion built in, for the moments where a call to action should feel alive.",
  card: "React card components with depth, motion and hover behaviour, for feature grids, pricing and showcases.",
  component:
    "Utility React components for the states between content: loading placeholders, skeletons and effects.",
  text: "React text animation components for headlines that hold attention: typing, scrambling, shining and swapping.",
};

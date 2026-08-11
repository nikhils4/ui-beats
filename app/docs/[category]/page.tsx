import { notFound, redirect } from "next/navigation";
import {
  getComponentsByCategory,
  isCategory,
  CATEGORY_ORDER,
} from "@/lib/registry";

/**
 * Category landing pages redirect to their first component.
 *
 * Every one of these used to be a separate file that indexed the nav array by
 * a hardcoded number — `sideNav[1]`, `sideNav[2]`, `sideNav[3]` — and all six
 * numbers were wrong, so `/docs/text` landed on an animation page and
 * `/docs/button` landed on a background. The destination is now looked up by
 * category, so it cannot drift.
 */
export function generateStaticParams() {
  return CATEGORY_ORDER.map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isCategory(category)) notFound();

  const [first] = getComponentsByCategory(category);
  if (!first) notFound();

  redirect(first.href);
}

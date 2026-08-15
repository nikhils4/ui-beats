import { ImageResponse } from "next/og";
import {
  CATEGORY_ORDER,
  categoryLabel,
  getComponentsByCategory,
  isCategory,
} from "@/lib/registry";
import { CATEGORY_INTRO } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, og } from "@/lib/og";
import { OgCard, clamp } from "@/lib/og-card";

export const alt = "UI Beats components";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return CATEGORY_ORDER.map((category) => ({ category }));
}

/**
 * Category landing card, e.g. `/docs/background`.
 *
 * These six pages fell back to `siteConfig.ogImage`, so the six category links
 * were indistinguishable from each other and from the site root in a feed. The
 * component count is included because it is the one fact a reader wants from a
 * category link and cannot get from its title.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!isCategory(category)) {
    return new ImageResponse(<OgCard title={siteConfig.name} />, size);
  }

  const label = categoryLabel(category);
  const count = getComponentsByCategory(category).length;

  return new ImageResponse(
    (
      <OgCard
        eyebrow="/ Components"
        title={`${label} Components`}
        body={clamp(CATEGORY_INTRO[category], 150)}
        footerLeft={
          <div style={{ color: og.brand, fontWeight: 600 }}>
            {`${count} component${count === 1 ? "" : "s"}`}
          </div>
        }
        footerRight={`uibeats.com/docs/${category}`}
      />
    ),
    size,
  );
}

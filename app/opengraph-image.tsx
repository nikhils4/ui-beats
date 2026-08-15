import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, og } from "@/lib/og";
import { OgCard } from "@/lib/og-card";

export const alt = `${siteConfig.name} — animated React components`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * Homepage social card, and the inherited fallback for every route that has no
 * `opengraph-image` of its own (getting-started, playground, motion-studio).
 *
 * This replaces a checked-in PNG that still carried the retired lowercase
 * `ui/beats` wordmark on a white field, so the homepage unfurled as a
 * different product than every other page on the site. Generating it means the
 * name and description track `siteConfig` instead of a binary nobody
 * re-exports.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        title="Supercharge your UI"
        body={siteConfig.description}
        footerLeft={
          <div style={{ color: og.brand, fontWeight: 600 }}>uibeats.com</div>
        }
        footerRight="React · TypeScript · Tailwind CSS · Motion"
      />
    ),
    size,
  );
}

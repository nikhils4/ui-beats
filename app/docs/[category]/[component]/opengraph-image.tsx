import { ImageResponse } from "next/og";
import { getComponent, getRegistry, categoryLabel } from "@/lib/registry";
import { siteConfig } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, og } from "@/lib/og";
import { OgCard, clamp } from "@/lib/og-card";
import type { ComponentCategory } from "@/types/component-config.type";

export const alt = "UI Beats component";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getRegistry().map((entry) => ({
    category: entry.category,
    component: entry.name,
  }));
}

/**
 * Per-component social card.
 *
 * Every page previously shared the same static image, so twenty different
 * links looked identical in a Slack or Discord unfurl. This renders the
 * component's own name, category and install command at build time.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ category: string; component: string }>;
}) {
  const { category, component } = await params;
  const entry = getComponent(category, component);

  const label = entry ? categoryLabel(entry.category as ComponentCategory) : "";
  const install = `npx shadcn@latest add uibeats.com/r/${entry?.name ?? "component"}.json`;

  return new ImageResponse(
    (
      <OgCard
        eyebrow={label ? `/ ${label}` : undefined}
        title={entry?.title ?? siteConfig.name}
        body={clamp(entry?.description ?? siteConfig.description, 140)}
        footerLeft={
          /*
           * Satori counts each JSX child as its own node, so the `$` and the
           * command are separate elements rather than one interpolated string.
           */
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ color: og.faint }}>$</div>
            <div style={{ color: og.brand }}>{install}</div>
          </div>
        }
      />
    ),
    size,
  );
}

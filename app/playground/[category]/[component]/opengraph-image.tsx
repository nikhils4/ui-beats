import { ImageResponse } from "next/og";
import { getComponent } from "@/lib/registry";
import { getStudioComponents } from "@/lib/studio";
import { siteConfig } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, og } from "@/lib/og";
import { OgCard } from "@/lib/og-card";

export const alt = "UI Beats playground";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/*
 * Mirrors the page's own params (studio components, not the whole registry) so
 * a card is generated for exactly the routes that exist.
 */
export async function generateStaticParams() {
  return getStudioComponents().map((entry) => ({
    category: entry.category,
    component: entry.name,
  }));
}

/**
 * Per-component playground card.
 *
 * Like Motion Studio, these pages declared their own `openGraph` block, which
 * replaces the parent's instead of merging into it — so all thirty-odd
 * playground routes shared a link preview with no image at all.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ category: string; component: string }>;
}) {
  const { category, component } = await params;
  const entry = getComponent(category, component);

  if (!entry) {
    return new ImageResponse(<OgCard title={siteConfig.name} />, size);
  }

  return new ImageResponse(
    <OgCard
      eyebrow="/ Playground"
      title={`${entry.title} Playground`}
      body={`Tune ${entry.title} live: every prop as a control, the code updating as you go.`}
      footerLeft={
        <div style={{ color: og.brand, fontWeight: 600 }}>
          {`uibeats.com/playground/${entry.category}/${entry.name}`}
        </div>
      }
      footerRight="Live controls"
    />,
    size,
  );
}

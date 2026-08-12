import { ImageResponse } from "next/og";
import { getComponent, getRegistry, categoryLabel } from "@/lib/registry";
import { siteConfig } from "@/lib/site";
import type { ComponentCategory } from "@/types/component-config.type";

export const alt = "UI Beats component";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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

  const title = entry?.title ?? siteConfig.name;
  const label = entry ? categoryLabel(entry.category as ComponentCategory) : "";
  const description = entry?.description ?? siteConfig.description;

  /*
   * Satori treats each JSX child as a separate node and requires an explicit
   * display on any element with more than one — and `foo {bar} baz` is three
   * children, not one string. Everything interpolated is joined here so each
   * element receives a single text node.
   */
  const categoryLine = label ? `/ ${label}` : "";
  const installLine = `npx shadcn@latest add uibeats.com/r/${entry?.name ?? "component"}.json`;
  const summary =
    description.length > 140 ? `${description.slice(0, 137)}…` : description;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#131218",
        padding: 72,
        // Satori has no access to the site stylesheet, so every value here
        // is inline and literal rather than a design token.
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
          }}
        />
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>
          {siteConfig.name}
        </div>
        {categoryLine ? (
          <div style={{ marginLeft: 8, fontSize: 20, color: "#a1a1aa" }}>
            {categoryLine}
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 78,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1.05,
            background: "linear-gradient(100deg, #ffffff 40%, #c4b5fd 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 26,
            lineHeight: 1.4,
            color: "#a1a1aa",
            maxWidth: 900,
          }}
        >
          {summary}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 22,
          color: "#8b5cf6",
        }}
      >
        <span style={{ color: "#52525b" }}>$</span>
        <span>{installLine}</span>
      </div>
    </div>,
    size,
  );
}

import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, og } from "@/lib/og";
import { OgCard, clamp } from "@/lib/og-card";

export const alt = "UI Beats blog post";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/**
 * Per-post social card.
 *
 * Posts previously unfurled with their `image` frontmatter — 16:9 hero art
 * carrying a different brand (pastel field, `nikhils.ca` byline), letterboxed
 * into a 1.91:1 slot. That art is still the in-page hero; only the social
 * preview is overridden here, so a shared post now reads as UI Beats.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(<OgCard title={siteConfig.name} />, size);
  }

  /*
   * Fixed locale and UTC: without both, the card's date depends on where the
   * build runs, and a rebuild in another region silently changes the image.
   */
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return new ImageResponse(
    <OgCard
      eyebrow="/ Blog"
      title={post.title}
      body={clamp(post.description, 150)}
      footerLeft={
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ color: og.brand, fontWeight: 600 }}>{post.author}</div>
          <div style={{ color: og.faint }}>·</div>
          <div style={{ color: og.muted }}>{date}</div>
        </div>
      }
      footerRight={post.readTime}
    />,
    size,
  );
}

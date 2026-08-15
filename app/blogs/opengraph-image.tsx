import { ImageResponse } from "next/og";
import { getAllPosts } from "@/lib/blog";
import { OG_CONTENT_TYPE, OG_SIZE, og } from "@/lib/og";
import { OgCard } from "@/lib/og-card";

export const alt = "UI Beats blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * Blog index card.
 *
 * Without this the index inherited the homepage card, so `/` and `/blogs`
 * unfurled identically and a shared blog link gave no hint it led to writing.
 */
export default function OpengraphImage() {
  const count = getAllPosts().length;

  return new ImageResponse(
    <OgCard
      eyebrow="/ Blog"
      title="Frontend, design & animation"
      body="Tutorials and guides on frontend development, UI/UX design, and web animation."
      footerLeft={
        <div style={{ color: og.brand, fontWeight: 600 }}>
          {`${count} post${count === 1 ? "" : "s"}`}
        </div>
      }
      footerRight="uibeats.com/blogs"
    />,
    size,
  );
}

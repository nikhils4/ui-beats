import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, og } from "@/lib/og";
import { OgCard } from "@/lib/og-card";

export const alt = "Motion Studio — cubic bezier and spring editor";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * Motion Studio card.
 *
 * This page shared no image at all: its `metadata` declares an `openGraph`
 * block of its own, and doing that replaces the parent's rather than merging
 * into it, so the root layout's `images` never reached it. A card in the
 * segment is what puts one back.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="/ Motion Studio"
        title="Shape the curve, copy the code"
        body="Tune any UI Beats component live, shape its easing curve or spring, and copy the code. Free, no sign-up."
        footerLeft={
          <div style={{ color: og.brand, fontWeight: 600 }}>
            uibeats.com/motion-studio
          </div>
        }
        footerRight="Cubic bezier · Spring"
      />
    ),
    size,
  );
}

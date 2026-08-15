import { ImageResponse } from "next/og";
import { markGeometry } from "@/lib/brand";

interface BrandMarkOptions {
  /**
   * Paint a solid backdrop instead of leaving the PNG transparent.
   *
   * Only the apple touch icon wants one. iOS composites a transparent icon
   * onto black, so the choice is between picking the backdrop or having the
   * platform pick it.
   */
  background?: string;
  /**
   * Fraction of the canvas the mark occupies. 1 fills it edge to edge.
   *
   * Anything with a backdrop needs headroom: iOS masks the square into a
   * superellipse, and at full bleed the outer bars run into the corner curve.
   */
  scale?: number;
}

/**
 * The brand mark rendered as a PNG.
 *
 * Three slots need a raster version of a mark that is an SVG everywhere else:
 * the favicon, the apple touch icon, and the square avatar a feed reader shows
 * beside every item. All three call this, so there is one definition of the
 * mark and no binary to re-export by hand, which is exactly how the previous
 * logo drifted.
 *
 * Bars are absolutely positioned from `markGeometry` rather than laid out with
 * flexbox. Flex would look about right, but "about right" is how the favicon
 * and the header logo ended up as two different drawings; sharing the geometry
 * function makes them the same picture by construction.
 *
 * The default is transparent, so the favicon is exactly the bars the header
 * shows and a tab strip supplies its own backdrop in either theme.
 */
export function brandMarkImage(
  size: number,
  { background, scale = 1 }: BrandMarkOptions = {},
): ImageResponse {
  const markSize = size * scale;
  const offset = (size - markSize) / 2;
  const bars = markGeometry(markSize);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        ...(background ? { background } : {}),
      }}
    >
      {bars.map((bar, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: offset + bar.x,
            top: offset + bar.y,
            width: bar.width,
            height: bar.height,
            borderRadius: bar.radius,
            background: bar.color,
          }}
        />
      ))}
    </div>,
    { width: size, height: size },
  );
}

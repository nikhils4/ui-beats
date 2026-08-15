import { ImageResponse } from "next/og";
import { markGeometry } from "@/lib/brand";

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
 * The background stays transparent: the mark is the bars, matching the header
 * exactly. A tab strip supplies its own backdrop in either theme, and the
 * purple holds up against both.
 */
export function brandMarkImage(size: number): ImageResponse {
  const bars = markGeometry(size);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
        }}
      >
        {bars.map((bar, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: bar.x,
              top: bar.y,
              width: bar.width,
              height: bar.height,
              borderRadius: bar.radius,
              background: bar.color,
            }}
          />
        ))}
      </div>
    ),
    { width: size, height: size },
  );
}

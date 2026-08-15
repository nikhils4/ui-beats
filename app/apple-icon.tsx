import { brandMarkImage } from "@/lib/brand-image";
import { og } from "@/lib/og";

/**
 * The iOS home-screen icon.
 *
 * The one place the mark gets a backdrop. Everywhere else it is bare bars on
 * transparency, matching the header exactly, but iOS composites a transparent
 * touch icon onto black rather than leaving it clear, so the choice here is
 * between picking the backdrop and letting the platform pick it. `og.background`
 * is the site's own dark, which is also what the social cards use.
 *
 * Scaled to 62% because iOS masks the square into a superellipse: at full
 * bleed the outermost bar runs into the corner curve and loses its top.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return brandMarkImage(180, { background: og.background, scale: 0.62 });
}

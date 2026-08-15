import { brandMarkImage } from "@/lib/brand-image";

/** The iOS home-screen icon, from the same geometry as everything else. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return brandMarkImage(180);
}

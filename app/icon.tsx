import { brandMarkImage } from "@/lib/brand-image";

/**
 * The favicon, generated from the same bar geometry as the header mark.
 *
 * Replaces a checked-in `icon.png` (and a `favicon.ico`) of the old lowercase
 * `b`. Deleting `favicon.ico` is deliberate: a root `favicon.ico` outranks
 * everything Next generates here, so leaving it would have kept serving the
 * retired logo in the browser tab no matter what this file drew.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return brandMarkImage(32);
}

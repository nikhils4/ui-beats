"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/website/footer";

/**
 * The site footer, except on the routes that are tools rather than documents.
 *
 * The studio is laid out to fill the viewport exactly — stage, snippet and
 * every control on screen with nothing to scroll. A 364px footer underneath
 * defeated that on its own: the page scrolled by precisely the height of the
 * footer, which is the worst of both, since the studio still could not use
 * that space. Those routes carry the header, the picker and links out to the
 * docs, so nothing here is the only path to anywhere.
 */
const FULL_SCREEN = [/^\/motion-studio\/?$/, /^\/playground\//];

export function SiteFooter() {
  const pathname = usePathname();
  if (FULL_SCREEN.some((pattern) => pattern.test(pathname))) return null;
  return <Footer />;
}

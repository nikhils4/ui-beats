/**
 * Single source of truth for anything that used to be a hardcoded URL string.
 *
 * The old code spelled the origin six different ways: `uibeats.com` in the
 * canonicals but `www.uibeats.com` in the sitemap, which split ranking
 * signals between two hosts. Everything now derives from `siteConfig.url`.
 */
export const siteConfig = {
  name: "UI Beats",
  title: "UI Beats · Animated React components you own",
  description:
    "Beautifully designed, animated React components built with React, TypeScript, Tailwind CSS and Motion. Copy, paste, or install with the shadcn CLI.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://uibeats.com").replace(
    /\/$/,
    "",
  ),
  /*
   * The generated root card (`app/opengraph-image.tsx`), not a file in
   * `public/`. This is the inherited fallback for routes with no
   * `opengraph-image` of their own, and it used to be a checked-in PNG that
   * nobody re-exported when the wordmark changed — so the fallback drifted
   * off-brand while every generated card stayed current. Pointing at the
   * route means there is one definition of the card and no binary to keep in
   * sync. The hashless URL is stable; Next only adds `?<hash>` for caching.
   */
  ogImage: "/opengraph-image",
  author: {
    name: "Nikhil Singh",
    url: "https://nikhils4.vercel.app",
    email: "hello@nikhils.ca",
  },
  links: {
    github: "https://github.com/nikhils4/ui-beats",
    issues: "https://github.com/nikhils4/ui-beats/issues",
    newIssue:
      "https://github.com/nikhils4/ui-beats/issues/new?template=bug_report.md",
    newFeature:
      "https://github.com/nikhils4/ui-beats/issues/new?template=feature_request.md",
  },
  analyticsId: process.env.NEXT_PUBLIC_GA_ID ?? "G-E5FVREP9R1",
} as const;

export type SiteConfig = typeof siteConfig;

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Single source of truth for anything that used to be a hardcoded URL string.
 *
 * The old code spelled the origin six different ways: `uibeats.com` in the
 * canonicals but `www.uibeats.com` in the sitemap, which split ranking
 * signals between two hosts. Everything now derives from `siteConfig.url`.
 */
export const siteConfig = {
  name: "UI Beats",
  title: "UI Beats — Supercharge your UI",
  description:
    "Beautifully designed, animated React components built with React, TypeScript, Tailwind CSS and Motion. Copy, paste, or install with the shadcn CLI.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://uibeats.com").replace(
    /\/$/,
    "",
  ),
  ogImage: "/uibeats-social-media.png",
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

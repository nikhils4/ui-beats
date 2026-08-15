/**
 * The six component categories, as a path-matching alternation.
 *
 * `getting-started` is deliberately excluded: those five pages have no markdown
 * twin (`app/md/[category]/[component]` generates params from the registry
 * only), so matching them would advertise an alternate that 404s and
 * content-negotiate onto a dead route. `tests/seo.test.ts` fails if this drifts
 * from the registry's real categories.
 */
const COMPONENT_CATEGORIES = "animation|background|button|card|component|text";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The docs pages read component source off disk at build time, so keep the
  // MDX/registry content out of the client bundle trace.
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/r/:path*.json",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=3600" },
        ],
      },
      {
        /*
         * Point agents at the markdown twin of a component page.
         *
         * An agent that fetches the HTML gets told, in the response itself,
         * that a clean markdown version exists — without having to know the
         * `.md` convention or spend a second request finding out.
         *
         * A relative URI so this stays correct on localhost and preview
         * deployments, where an absolute one would send agents to production.
         */
        source: `/docs/:category(${COMPONENT_CATEGORIES})/:component`,
        headers: [
          {
            key: "Link",
            value:
              '</docs/:category/:component.md>; rel="alternate"; type="text/markdown"',
          },
        ],
      },
      {
        // Agents discover the MCP server here rather than from the README.
        source: "/.well-known/mcp.json",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=3600" },
        ],
      },
    ];
  },
  async rewrites() {
    /*
     * No `Accept: text/markdown` negotiation here, deliberately.
     *
     * Serving markdown from the HTML URL needs `Vary: Accept` so a cache keeps
     * the two representations apart. Next owns the `Vary` header on page routes
     * and overwrites it with its own RSC list — verified via both `headers()`
     * and a `proxy.ts`, neither of which survives. Negotiating without that
     * guard risks a shared CDN entry handing markdown to a human visitor, so
     * the `Link: rel="alternate"` header above advertises the markdown twin
     * instead, which needs no cache guarantees.
     */
    return [
      // Agent-facing markdown. `/docs/card/flip-card.md` cannot be a route
      // segment of its own — `[component]/page.tsx` already occupies that
      // level — so the extension is matched here and mapped onto the handler
      // at `app/md/[category]/[component]/route.ts`.
      {
        source: "/docs/:category/:component.md",
        destination: "/md/:category/:component",
      },
    ];
  },
  async redirects() {
    return [
      // The RSS feed used to emit /blog/<slug> while the route was /blogs/<slug>,
      // so every link in the feed 404'd. Feed URLs are fixed at the source; this
      // keeps any already-syndicated links working.
      { source: "/blog/:slug", destination: "/blogs/:slug", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
    ];
  },
};

export default nextConfig;

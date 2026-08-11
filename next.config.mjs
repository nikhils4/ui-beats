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

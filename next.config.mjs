/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/blogs/:path*",
        destination: "https://ui-beats-blogs.vercel.app/blogs/:path*",
      },
    ];
  },
};

export default nextConfig;

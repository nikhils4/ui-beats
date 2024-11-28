import nextMDX from "@next/mdx";
import { withContentlayer } from "next-contentlayer";
import rehypePrism from "rehype-prism-plus";
const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypePrism],
    format: "mdx",
    parseFrontmatter: true,
    development: process.env.NODE_ENV === "development",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

export default withContentlayer(withMDX(nextConfig));

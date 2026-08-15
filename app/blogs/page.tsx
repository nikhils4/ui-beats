import type { Metadata } from "next";
import { BlogList } from "@/components/website/blog-list";
import { getAllPosts, getCategories } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tutorials and guides on frontend development, UI/UX design, and web animation.",
  alternates: { canonical: absoluteUrl("/blogs") },
  openGraph: {
    title: `Blog · ${siteConfig.name}`,
    description:
      "Tutorials and guides on frontend development, UI/UX design, and web animation.",
    url: absoluteUrl("/blogs"),
    type: "website",
  },
};

/**
 * Server component: posts and the category list are resolved at build time and
 * only the filter interaction is client side. Previously the whole page was
 * `"use client"`, so the post list existed only after hydration.
 */
export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 pt-12 pb-24">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Tutorials and guides on frontend, design, and web animation.
        </p>
      </header>

      <BlogList posts={getAllPosts()} categories={getCategories()} />
    </div>
  );
}

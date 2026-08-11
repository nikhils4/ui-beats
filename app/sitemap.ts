import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getRegistry } from "@/lib/registry";
import { GETTING_STARTED } from "@/config/categories";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, priority: 1 },
    { url: absoluteUrl("/blogs"), lastModified: now, priority: 0.7 },
    ...GETTING_STARTED.items.map((item) => ({
      url: absoluteUrl(item.path),
      lastModified: now,
      priority: 0.8,
    })),
  ];

  // Derived from the registry, so a new component is in the sitemap the moment
  // it is documented. The old version walked a hand-maintained nav array and
  // lowercased paths that were already lowercase.
  const componentRoutes: MetadataRoute.Sitemap = getRegistry().map((entry) => ({
    url: absoluteUrl(entry.href),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blogs/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...componentRoutes, ...blogRoutes];
}

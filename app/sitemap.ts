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
    // A standalone free tool, and the query it targets ("cubic bezier
    // editor") has nothing to do with the component pages, so it earns a
    // priority of its own rather than trailing them.
    { url: absoluteUrl("/motion-studio"), lastModified: now, priority: 0.9 },
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

  const playgroundRoutes: MetadataRoute.Sitemap = getRegistry()
    .filter((entry) => entry.hasPlayground)
    .map((entry) => ({
      url: absoluteUrl(`/playground/${entry.category}/${entry.name}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blogs/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...componentRoutes,
    ...playgroundRoutes,
    ...blogRoutes,
  ];
}

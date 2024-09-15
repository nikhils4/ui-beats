import { MetadataRoute } from "next";
import { sideNav } from "@/config/side-nav";
import { allPosts } from "contentlayer/generated";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allURLs =
    sideNav.flatMap(
      (category) =>
        category.subItems?.map(({ path }) => ({
          url: `https://www.uibeats.com${path.toLowerCase()}`,
          lastModified: new Date(),
        })),
    ) || [];
  const allBlogsURL = allPosts.map((post) => ({
    url: `https://www.uibeats.com/blogs/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: "https://www.uibeats.com",
      lastModified: new Date(),
    },
    {
      url: "https://www.uibeats.com/blogs",
      lastModified: new Date(),
    },
    ...allURLs,
    ...allBlogsURL,
  ];
}

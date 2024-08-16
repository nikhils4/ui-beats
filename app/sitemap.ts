import { MetadataRoute } from "next";
import { sideNav } from "@/config/side-nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const allURLs =
    sideNav.flatMap(
      (category) =>
        category.subItems?.map(({ path }) => ({
          url: `https://www.uibeats.com${path.toLowerCase()}`,
          lastModified: new Date(),
        })),
    ) || [];

  return [
    {
      url: "https://www.uibeats.com",
      lastModified: new Date(),
    },
    ...allURLs,
  ];
}

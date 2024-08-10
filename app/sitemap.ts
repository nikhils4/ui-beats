import { MetadataRoute } from "next";
import { sideNav } from "@/config/side-nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const gettingStartedURLs = sideNav[0].subItems?.map(({ path }) => {
    return {
      url: `https://www.uibeats.com${path.toLowerCase()}`,
      lastModified: new Date(),
    };
  });

  const animationURLs = sideNav[1].subItems?.map(({ path }) => {
    return {
      url: `https://www.uibeats.com${path.toLowerCase()}`,
      lastModified: new Date(),
    };
  });
  return [
    {
      url: "https://www.uibeats.com",
      lastModified: new Date(),
    },
    ...gettingStartedURLs,
    ...animationURLs,
  ];
}

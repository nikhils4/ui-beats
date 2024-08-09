import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.uibeats.com",
      lastModified: new Date(),
    },
    {
      url: "https://www.uibeats.com/docs/getting-started/introduction",
      lastModified: new Date(),
    },
    {
      url: "https://www.uibeats.com/docs/getting-started/installation",
      lastModified: new Date(),
    },
    {
      url: "https://www.uibeats.com/docs/getting-started/contribute",
      lastModified: new Date(),
    },
    {
      url: "https://www.uibeats.com/docs/animation/text-writer",
      lastModified: new Date(),
    },
    {
      url: "https://www.uibeats.com/docs/animation/smooth-reveal",
      lastModified: new Date(),
    },
  ];
}

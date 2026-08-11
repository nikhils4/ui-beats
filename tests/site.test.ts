import { describe, expect, it } from "vitest";
import { absoluteUrl, siteConfig } from "@/lib/site";

describe("site config", () => {
  it("stores the origin without a trailing slash", () => {
    expect(siteConfig.url).not.toMatch(/\/$/);
  });

  /*
   * Regression: canonical tags used `uibeats.com` while the sitemap used
   * `www.uibeats.com`, splitting ranking signals across two hosts. Every URL
   * now comes from one constant.
   */
  it("builds absolute URLs from a single origin", () => {
    expect(absoluteUrl("/docs")).toBe(`${siteConfig.url}/docs`);
    expect(absoluteUrl("docs")).toBe(`${siteConfig.url}/docs`);
    expect(absoluteUrl()).toBe(`${siteConfig.url}/`);
  });

  it("never produces a doubled slash", () => {
    for (const p of ["/", "/docs", "docs", "/blogs/post"]) {
      expect(absoluteUrl(p)).not.toMatch(/[^:]\/\//);
    }
  });

  it("points every link at an absolute https URL", () => {
    for (const [key, value] of Object.entries(siteConfig.links)) {
      expect(value, `links.${key}`).toMatch(/^https:\/\//);
    }
  });
});

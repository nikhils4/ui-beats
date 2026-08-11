import { describe, expect, it } from "vitest";
import { generateRssFeed } from "@/lib/rss";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

describe("rss feed", () => {
  it("includes every post", async () => {
    const xml = (await generateRssFeed()).rss2();
    for (const post of getAllPosts()) {
      expect(xml).toContain(post.title);
    }
  });

  /*
   * Regression: the feed emitted `/blog/<slug>` while the route has always
   * been `/blogs/<slug>`, so every link in the feed 404'd.
   */
  it("links to the real /blogs/<slug> route", async () => {
    const xml = (await generateRssFeed()).rss2();

    for (const post of getAllPosts()) {
      expect(xml).toContain(`${siteConfig.url}/blogs/${post.slug}`);
    }

    expect(xml).not.toMatch(
      new RegExp(
        `${siteConfig.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/blog/[a-z0-9-]`,
      ),
    );
  });

  it("produces parseable RSS 2.0", async () => {
    const xml = (await generateRssFeed()).rss2();
    expect(xml).toContain('<?xml version="1.0"');
    expect(xml).toContain("<rss");
    expect(xml).toContain("<channel>");
  });
});

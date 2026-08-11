import { describe, expect, it } from "vitest";
import {
  getAllPosts,
  getCategories,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";

describe("blog content layer", () => {
  const posts = getAllPosts();

  it("reads posts off disk", () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it("sorts newest first", () => {
    const dates = posts.map((p) => new Date(p.date).getTime());
    expect(dates).toEqual([...dates].sort((a, b) => b - a));
  });

  it("normalises dates to ISO strings", () => {
    for (const post of posts) {
      expect(post.date, `${post.slug} date`).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
      );
      expect(Number.isNaN(new Date(post.date).getTime())).toBe(false);
    }
  });

  it("computes a read time for every post", () => {
    for (const post of posts) {
      expect(post.readTime, `${post.slug} readTime`).toMatch(/^\d+ min read$/);
    }
  });

  it("keeps the body separate from the frontmatter", () => {
    for (const post of posts) {
      expect(post.body.length, `${post.slug} body`).toBeGreaterThan(0);
      // gray-matter strips the fenced frontmatter block from `content`.
      expect(post.body.trimStart().startsWith("---")).toBe(false);
    }
  });

  it("has a unique slug per post", () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("looks a post up by slug", () => {
    const first = posts[0];
    expect(first).toBeDefined();
    expect(getPostBySlug(first!.slug)?.title).toBe(first!.title);
    expect(getPostBySlug("no-such-post")).toBeUndefined();
  });

  it("derives categories from the posts, led by All", () => {
    const categories = getCategories();
    expect(categories[0]).toBe("All");

    // Previously this list was hardcoded in types/blogs.type.ts and could
    // advertise categories that matched nothing.
    for (const category of categories.slice(1)) {
      const matches = posts.filter((p) => p.categories.includes(category));
      expect(matches.length, `"${category}" matches no posts`).toBeGreaterThan(
        0,
      );
    }
  });

  it("relates posts by shared category and excludes the post itself", () => {
    for (const post of posts) {
      const related = getRelatedPosts(post.slug);
      expect(related.length).toBeLessThanOrEqual(3);

      for (const other of related) {
        expect(other.slug).not.toBe(post.slug);
        expect(
          other.categories.some((c) => post.categories.includes(c)),
          `${other.slug} shares no category with ${post.slug}`,
        ).toBe(true);
      }
    }
  });

  it("returns no related posts for an unknown slug", () => {
    expect(getRelatedPosts("no-such-post")).toEqual([]);
  });
});

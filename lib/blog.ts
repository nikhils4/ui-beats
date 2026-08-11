import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blogs");
const WORDS_PER_MINUTE = 200;

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  author: string;
  authorBio: string;
  categories: string[];
  tags: string[];
  featured: boolean;
  readTime: string;
  /** Raw MDX body, ready to hand to `<MDXRemote />`. */
  body: string;
}

/** Frontmatter keys a post cannot omit. Missing ones fail the build loudly. */
const REQUIRED_FIELDS = [
  "title",
  "date",
  "description",
  "image",
  "imageAlt",
  "author",
  "authorBio",
  "categories",
  "tags",
] as const;

function calculateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} min read`;
}

function parsePost(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const missing = REQUIRED_FIELDS.filter((field) => data[field] == null);
  if (missing.length > 0) {
    throw new Error(
      `content/blogs/${fileName} is missing required frontmatter: ${missing.join(", ")}`,
    );
  }

  return {
    slug,
    title: String(data.title),
    // Normalise to an ISO string so every consumer gets the same shape,
    // whether the YAML parsed it as a Date or left it a string.
    date: new Date(data.date).toISOString(),
    description: String(data.description),
    image: String(data.image),
    imageAlt: String(data.imageAlt),
    author: String(data.author),
    authorBio: String(data.authorBio),
    categories: (data.categories as string[]) ?? [],
    tags: (data.tags as string[]) ?? [],
    featured: Boolean(data.featured ?? false),
    readTime: calculateReadTime(content),
    body: content,
  };
}

/**
 * Every post, newest first. `cache()` dedupes the filesystem walk across all
 * the server components that need it within a single render pass.
 */
export const getAllPosts = cache((): Post[] => {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map(parsePost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export const getPostBySlug = cache((slug: string): Post | undefined =>
  getAllPosts().find((post) => post.slug === slug),
);

/** Categories actually present in the content, plus a leading "All". */
export const getCategories = cache((): string[] => {
  const found = new Set<string>();
  for (const post of getAllPosts()) {
    for (const category of post.categories) found.add(category);
  }
  return ["All", ...[...found].sort()];
});

/** Posts sharing at least one category with `post`, excluding itself. */
export const getRelatedPosts = cache((slug: string, limit = 3): Post[] => {
  const post = getPostBySlug(slug);
  if (!post) return [];

  return getAllPosts()
    .filter(
      (candidate) =>
        candidate.slug !== post.slug &&
        candidate.categories.some((c) => post.categories.includes(c)),
    )
    .slice(0, limit);
});

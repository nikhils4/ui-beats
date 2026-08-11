"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/website/blog-card";
import type { Post } from "@/lib/blog";

interface BlogListProps {
  posts: Post[];
  categories: string[];
}

/** The interactive slice of the blog index: category filter + grid. */
export function BlogList({ posts, categories }: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? posts
        : posts.filter((post) => post.categories.includes(activeCategory)),
    [posts, activeCategory],
  );

  return (
    <>
      <div
        role="group"
        aria-label="Filter posts by category"
        className="mb-12 flex flex-wrap justify-center gap-2"
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setActiveCategory(category)}
            variant={activeCategory === category ? "default" : "outline"}
            aria-pressed={activeCategory === category}
            className="rounded-full px-4 py-1 text-xs transition-transform hover:scale-105"
          >
            {category}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Keyed by slug — the old list keyed by array index, so filtering
                reused card state across different posts. */}
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} featured={post.featured} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-16 text-center"
          >
            <FileQuestion
              className="mx-auto mb-6 size-20 text-muted-foreground"
              aria-hidden="true"
            />
            <h2 className="mb-2 text-2xl font-semibold">No posts found</h2>
            <p className="mb-6 text-muted-foreground">
              Nothing matches that category yet.
            </p>
            <Button
              onClick={() => setActiveCategory("All")}
              variant="outline"
              className="rounded-full"
            >
              View all posts
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

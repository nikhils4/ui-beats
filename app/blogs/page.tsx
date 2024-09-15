"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileQuestionIcon, PlusIcon } from "lucide-react";
import { allPosts, Post } from "contentlayer/generated";
import { categories } from "@/content/blogs";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "@/components/website/blog-card";

const BlogsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBlogs =
    activeCategory === "All"
      ? allPosts
      : allPosts.filter((post) => post.categories.includes(activeCategory));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold text-center mb-12 text-foreground"
      >
        Blogs Hub
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            <Button
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className="rounded-full px-4 py-1 text-xs transition-all duration-300 ease-in-out hover:scale-105"
            >
              {category}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {filteredBlogs.length > 0 ? (
          <motion.div
            key="blogs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} featured={blog.featured} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-blogs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <FileQuestionIcon
                className="mx-auto h-24 w-24 text-gray-400"
                aria-hidden="true"
              />
            </motion.div>
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2"
            >
              No blogs found
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-gray-500 dark:text-gray-400 mb-6"
            >
              We couldn&apos;t find any blogs matching your current filter. Try
              selecting a different category.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button
                onClick={() => setActiveCategory("All")}
                variant="outline"
                className="rounded-full px-6 py-2 text-sm transition-all duration-300 ease-in-out hover:scale-105"
              >
                View All Blogs
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-16 flex justify-center"
      >
        <a href="https://forms.gle/mbv5MpXnJbrGvrm59" target="_blank">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out hover:scale-105 flex items-center">
            Submit Blog
            <div className="ml-2">
              <PlusIcon className="h-4 w-4" />
            </div>
          </Button>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default BlogsPage;

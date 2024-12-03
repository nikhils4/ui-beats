"use client";
import React from "react";
import { Post } from "@/.contentlayer/generated";
import { format } from "date-fns";
import { CalendarIcon, UserIcon } from "lucide-react";
import Image from "next/image";

const BlogPost = ({
  children,
  post,
}: {
  children: React.ReactNode;
  post: Post;
}) => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-16 mt-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100 leading-tight">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            {post.description}
          </p>
        )}
        <div className="flex items-center mb-8">
          <div>
            {post.author && (
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {post.author}
              </p>
            )}
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
              <time className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                {format(new Date(post.date), "MMM d, yyyy")}
              </time>
              <span className="flex items-center">
                <UserIcon className="w-4 h-4 mr-1" />
                {post.readTime || "5 min read"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {post.image && (
        <div className="mb-12">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={630}
            layout="responsive"
            className="rounded-lg"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none dark:prose-invert">
        {children}
      </div>
    </article>
  );
};

export default BlogPost;

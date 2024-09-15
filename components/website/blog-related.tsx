import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "contentlayer/generated";

interface RelatedPostsProps {
  currentPost: Post;
  allPosts: Post[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({
  currentPost,
  allPosts,
}) => {
  const relatedPosts = allPosts
    .filter(
      (post) =>
        post.slug !== currentPost.slug &&
        post.categories.some((category) =>
          currentPost.categories.includes(category)
        )
    )
    .slice(0, 3);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link key={post.slug} href={`/blogs/${post.slug}`} passHref>
            <Card className="h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                  {post.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{post.readTime}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;

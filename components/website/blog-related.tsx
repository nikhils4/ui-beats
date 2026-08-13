import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post } from "@/lib/blog";

/**
 * Related posts.
 *
 * Selection moved to `getRelatedPosts()` in the content layer. This component
 * used to receive every post in the site and re-run the category matching
 * itself, duplicating a filter the page had already run just to decide whether
 * to render the section at all.
 */
export default function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Related Posts</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blogs/${post.slug}`} className="group">
            <Card className="h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-2 text-xl font-semibold">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2 line-clamp-3 text-sm text-muted-foreground">
                  {post.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{post.readTime}</span>
                  <span className="mx-2">•</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </time>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

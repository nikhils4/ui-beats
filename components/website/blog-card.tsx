import Link from "next/link";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/blog";

interface BlogCardProps {
  post: Post;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col",
        featured && "md:col-span-2 lg:col-span-3",
      )}
    >
      <CardHeader>
        <div className="mb-2 flex flex-wrap gap-2">
          {post.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
        <CardTitle className={featured ? "text-xl" : "text-lg"}>
          {post.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {post.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center">
            <User className="mr-1 size-3" />
            {post.author}
          </span>
          <span className="flex items-center">
            <Calendar className="mr-1 size-3" />
            {/* Fixed locale: `toLocaleDateString()` with no locale renders with
                the server's locale on the server and the visitor's in the
                browser, which is a hydration mismatch. */}
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                timeZone: "UTC",
              })}
            </time>
          </span>
          <span className="flex items-center">
            <Clock className="mr-1 size-3" />
            {post.readTime}
          </span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/blogs/${post.slug}`}>
            Read more
            <span className="sr-only">: {post.title}</span>
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

import type { ReactNode } from "react";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import type { Post } from "@/lib/blog";

/** Article shell: title block, hero image, then the rendered MDX body. */
export default function BlogPost({
  children,
  post,
}: {
  children: ReactNode;
  post: Post;
}) {
  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <header className="mt-16 mb-16">
        <h1 className="mb-4 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
          {post.description}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="font-semibold">{post.author}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.date} className="flex items-center">
              <Calendar className="mr-1 size-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </time>
            <span className="flex items-center">
              <Clock className="mr-1 size-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </header>

      {post.image ? (
        <div className="mb-12">
          <Image
            src={post.image}
            alt={post.imageAlt}
            width={1200}
            height={630}
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="h-auto w-full rounded-lg"
          />
        </div>
      ) : null}

      <div className="prose prose-lg max-w-none dark:prose-invert">
        {children}
      </div>
    </article>
  );
}

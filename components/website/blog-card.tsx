import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Post } from "contentlayer/generated";

interface BlogCardProps {
  blog: Post;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, featured = false }) => {
  return (
    <Card
      className={`h-full flex flex-col ${
        featured ? "col-span-2 md:col-span-3" : ""
      }`}
    >
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {blog.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
        <CardTitle className={featured ? "text-xl" : "text-lg"}>
          {blog.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-3">
          {blog.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
          <div className="flex items-center">
            <UserIcon className="mr-1 h-3 w-3" />
            {blog.author}
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-1 h-3 w-3" />
            {new Date(blog.date).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <ClockIcon className="mr-1 h-3 w-3" />
            {blog.readTime}
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link href={`/blogs/${blog.slug}`} passHref>
          <Button variant="outline" className="w-full">
            Read More
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;

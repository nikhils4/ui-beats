import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import MDXContent from "@/components/website/mdx-content-wrapper";
import RelatedPosts from "@/components/website/blog-related";
import BlogPost from "@/components/website/blog-post";
import BlogPromotionalCard from "@/components/website/blog-promotional-card";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags || [],
    authors: post.author ? [{ name: post.author }] : [{ name: "Nikhil Singh" }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      url: `https://uibeats.com/blogs/${post.slug}`,
      images: [
        {
          url: post.image || "",
          alt: post.imageAlt || post.title,
        },
      ],
      siteName: "UI Beats",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
      creator: post.authorTwitter || "@nikhilScripts",
    },
    alternates: {
      canonical: `https://uibeats.com/blogs/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
    other: {
      structuredData: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        author: {
          "@type": "Person",
          name: post.author || "Nikhil Singh",
        },
        datePublished: post.date,
        dateModified: post.date,
        image: post.image || "",
        url: `https://uibeats.com/blogs/${post.slug}`,
      }),
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <BlogPost post={post}>
        <MDXContent code={post.body.code} />
      </BlogPost>
      {allPosts.filter(
        (p) =>
          p.slug !== post.slug &&
          p.categories.some((category) => post.categories.includes(category))
      ).length > 0 && (
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
          <RelatedPosts currentPost={post} allPosts={allPosts} />
        </div>
      )}
      <BlogPromotionalCard />
    </div>
  );
}

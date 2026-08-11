import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MDXContent from "@/components/website/mdx-content-wrapper";
import RelatedPosts from "@/components/website/blog-related";
import BlogPost from "@/components/website/blog-post";
import BlogPromotionalCard from "@/components/website/blog-promotional-card";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = absoluteUrl(`/blogs/${post.slug}`);
  const image = post.image ? absoluteUrl(post.image) : siteConfig.ogImage;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      url,
      siteName: siteConfig.name,
      images: [{ url: image, alt: post.imageAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(post.slug);

  /*
   * Article JSON-LD as a real script tag.
   *
   * The old page stashed this under Metadata's `other.structuredData`, which
   * renders as `<meta name="structuredData" content="{...}">` — a shape no
   * search engine parses as JSON-LD, so the markup was never actually read.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image ? absoluteUrl(post.image) : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: siteConfig.author.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/uibeats-logo.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blogs/${post.slug}`),
    },
    keywords: post.tags.join(", "),
  };

  return (
    <div className="mx-auto max-w-full px-4 sm:px-6 md:max-w-4xl lg:max-w-5xl lg:px-8 xl:max-w-6xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPost post={post}>
        <MDXContent source={post.body} />
      </BlogPost>
      <BlogPromotionalCard />
      {related.length > 0 ? (
        <div className="mt-12 border-t pt-6">
          <RelatedPosts posts={related} />
        </div>
      ) : null}
    </div>
  );
}

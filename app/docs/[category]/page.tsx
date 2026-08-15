import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/website/code-block";
import { DocsBreadcrumb } from "@/components/website/docs-breadcrumb";
import { DocsPageHeader } from "@/components/website/docs-page-header";
import { DocsSection } from "@/components/website/docs-section";
import { CATEGORY_META } from "@/config/categories";
import {
  CATEGORY_ORDER,
  categoryLabel,
  getComponentsByCategory,
  isCategory,
} from "@/lib/registry";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { CATEGORY_INTRO, categorySeoTitle } from "@/lib/seo";
import type { ComponentCategory } from "@/types/component-config.type";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORY_ORDER.map((category) => ({ category }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};

  const label = categoryLabel(category);
  const title = categorySeoTitle(label, category);
  const description = CATEGORY_INTRO[category];
  const url = absoluteUrl(`/docs/${category}`);

  return {
    title,
    description,
    keywords: [
      title.toLowerCase(),
      `react ${label.toLowerCase()} components`,
      `tailwind ${label.toLowerCase()} components`,
      "animated react components",
      "shadcn registry",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${siteConfig.name}`,
      description,
      url,
      type: "website",
      siteName: siteConfig.name,
      // No `images` here on purpose: `opengraph-image.tsx` in this segment
      // generates the card. An explicit `images` set alongside it wins and
      // would pin all six categories back to one shared image.
    },
  };
}

/**
 * Category landing page.
 *
 * These six routes used to be bare `redirect()` calls straight to the first
 * component, which meant six URLs that could never rank for the plural query
 * ("react card components") that people actually search before they know a
 * component's name. Each is now a real, indexable page listing its components.
 */
export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  if (!isCategory(category)) notFound();

  const items = getComponentsByCategory(category);
  if (items.length === 0) notFound();

  const label = categoryLabel(category as ComponentCategory);
  const title = categorySeoTitle(label, category);
  const CategoryIcon = CATEGORY_META[category].icon;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: CATEGORY_INTRO[category],
    url: absoluteUrl(`/docs/${category}`),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        description: item.description,
        url: absoluteUrl(item.href),
      })),
    },
  };

  return (
    <div className="w-full min-w-0 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DocsBreadcrumb
        items={[
          { label: "Docs", href: "/docs/getting-started/introduction" },
          { label },
        ]}
      />

      <DocsPageHeader
        // The eyebrow names the *kind* of page rather than repeating the
        // category: the title already opens with the category name, and
        // "Card / React Card Components" reads as a stutter.
        eyebrow={
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-brand uppercase">
            <CategoryIcon className="size-3.5" />
            Category
          </span>
        }
        title={title}
        description={CATEGORY_INTRO[category]}
      >
        <p className="text-xs text-muted-foreground">
          {items.length} component{items.length === 1 ? "" : "s"} · free and
          MIT-licensed · install with the shadcn CLI
        </p>
      </DocsPageHeader>

      <DocsSection
        id="components"
        title="Components"
        description={`Every ${label.toLowerCase()} component in the library, with the packages each one pulls in.`}
      >
        <ul className="divide-y divide-border/60 border-y border-border/60">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="group -mx-3 flex items-start gap-4 rounded-lg px-3 py-5 transition-colors hover:bg-accent/50"
              >
                <div className="min-w-0 flex-1">
                  {/* An `h3`: these sit under the "Components" heading above,
                      so promoting them to `h2` would flatten the outline. */}
                  <h3 className="flex flex-wrap items-center gap-2 text-base font-semibold tracking-tight">
                    {item.title}
                    {item.isNew ? (
                      <Badge
                        variant="outline"
                        className="border-brand/25 bg-brand-subtle text-[10px] text-brand"
                      >
                        New
                      </Badge>
                    ) : null}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="mt-2 flex flex-wrap gap-1.5">
                    {item.dependencies.map((dep) => (
                      <span
                        key={dep}
                        className="rounded-full border bg-muted/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {dep}
                      </span>
                    ))}
                  </p>
                </div>
                <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
              </Link>
            </li>
          ))}
        </ul>
      </DocsSection>

      <DocsSection
        id="installation"
        title="Install any of them"
        description="Every component here is installable with the shadcn CLI, which also resolves its npm dependencies."
      >
        <CodeBlock
          language="bash"
          code={`npx shadcn@latest add ${absoluteUrl(`/r/${items[0]!.name}.json`)}`}
        />
      </DocsSection>
    </div>
  );
}

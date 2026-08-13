import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Eye,
  Package,
  PencilLine,
  Scale,
  SlidersHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/website/code-block";
import { ComponentPreview } from "@/components/website/component-preview";
import { DocsBreadcrumb } from "@/components/website/docs-breadcrumb";
import { DocsPageHeader } from "@/components/website/docs-page-header";
import { DocsSection } from "@/components/website/docs-section";
import { InstallTabs } from "@/components/website/install-tabs";
import { PropsTable } from "@/components/website/props-table";
import { CATEGORY_META } from "@/config/categories";
import {
  getComponent,
  getComponentsByCategory,
  getRegistry,
  categoryLabel,
} from "@/lib/registry";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { componentKeywords, componentSeoTitle } from "@/lib/seo";
import { deriveControls, resolvePlaygroundConfig } from "@/lib/playground";
import type { ComponentCategory } from "@/types/component-config.type";

interface PageProps {
  params: Promise<{ category: string; component: string }>;
}

/**
 * Prerender every documented component.
 *
 * This is the fix for the biggest SEO problem in the old site: all six docs
 * routes were `"use client"` with no `generateStaticParams` and no
 * `generateMetadata`, so they built as `ƒ (Dynamic)` and crawlers received an
 * empty shell whose <title> was only set later by a `document.title` effect.
 */
export async function generateStaticParams() {
  return getRegistry().map((entry) => ({
    category: entry.category,
    component: entry.name,
  }));
}

/** Unknown category/component pairs 404 instead of rendering a blank page. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, component } = await params;
  const entry = getComponent(category, component);
  if (!entry) return {};

  const seoTitle = componentSeoTitle(entry);
  const url = absoluteUrl(entry.href);

  return {
    // Leads with the phrase people actually search. The layout template
    // appends the brand, so it still rides along.
    title: seoTitle,
    description: entry.description,
    keywords: componentKeywords(entry),
    alternates: { canonical: url },
    openGraph: {
      title: `${seoTitle} — ${siteConfig.name}`,
      description: entry.description,
      url,
      type: "article",
      siteName: siteConfig.name,
      // No `images` here on purpose. Setting it overrides the generated
      // opengraph-image.tsx alongside this file, which is what puts the
      // component's own name in the social card.
    },
  };
}

export default async function ComponentDocsPage({ params }: PageProps) {
  const { category, component } = await params;
  const entry = getComponent(category, component);

  if (!entry) notFound();

  const label = categoryLabel(entry.category as ComponentCategory);
  const CategoryIcon = CATEGORY_META[entry.category as ComponentCategory].icon;
  const fullBleed = entry.fullBleedPreview ?? false;

  /*
   * The same two conditions the playground route generates on: a harness to
   * render the component, and at least one prop a control can express.
   * Evaluated here so this page never links to a route that would 404.
   */
  const hasPlayground =
    entry.hasPlayground &&
    deriveControls(
      entry.props,
      resolvePlaygroundConfig(entry.name, entry.playground),
    ).length > 0;

  // Previous/next within the category, for the footer pager.
  const siblings = getComponentsByCategory(entry.category as ComponentCategory);
  const index = siblings.findIndex((s) => s.name === entry.name);
  const previous = index > 0 ? siblings[index - 1] : undefined;
  const next = index < siblings.length - 1 ? siblings[index + 1] : undefined;

  const sourceUrl = `${siteConfig.links.github}/blob/main/components/demo/${entry.demoPath}`;
  const contentUrl = `${siteConfig.links.github}/blob/main/content/docs/${entry.category}/${entry.name}.content.ts`;

  /*
   * SoftwareSourceCode JSON-LD.
   *
   * Tells search engines this page *is* a code component rather than an
   * article about one, and exposes the language, license and dependencies.
   * That is what makes a component page eligible for a code-flavoured result
   * instead of a plain blue link.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: entry.title,
    alternateName: componentSeoTitle(entry),
    description: entry.description,
    codeSampleType: "full solution",
    programmingLanguage: "TypeScript",
    runtimePlatform: "React",
    url: absoluteUrl(entry.href),
    license: "https://opensource.org/licenses/MIT",
    isPartOf: {
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      applicationCategory: "DeveloperApplication",
      url: siteConfig.url,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    author: {
      // A tool credited as a `Person` would be a straightforward lie to
      // anything reading this markup.
      "@type":
        entry.credits?.kind === "tool" ? "SoftwareApplication" : "Person",
      name: entry.credits?.name ?? siteConfig.author.name,
      url: entry.credits?.url ?? siteConfig.author.url,
    },
    // The library is published and maintained by a person regardless of who
    // wrote an individual component.
    maintainer: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    keywords: componentKeywords(entry).join(", "),
    ...(entry.whenToUse ? { abstract: entry.whenToUse } : {}),
    ...(entry.dependencies.length
      ? { softwareRequirements: entry.dependencies.join(", ") }
      : {}),
  };

  return (
    // `min-w-0` prevents the wide children below (code blocks, props table)
    // from stretching this column past its share of the docs layout.
    <div className="w-full min-w-0 pb-16">
      <script
        type="application/ld+json"
        // Built from registry data in this repo, never from user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DocsBreadcrumb
        items={[
          { label: "Docs", href: "/docs/getting-started/introduction" },
          { label, href: `/docs/${entry.category}` },
          { label: entry.title },
        ]}
      />

      <DocsPageHeader
        eyebrow={
          <Link
            href={`/docs/${entry.category}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-brand uppercase transition-opacity hover:opacity-80"
          >
            <CategoryIcon className="size-3.5" />
            {label}
          </Link>
        }
        title={entry.title}
        badge={
          entry.isNew ? (
            <Badge className="border-brand/25 bg-brand-subtle text-brand hover:bg-brand-subtle">
              New
            </Badge>
          ) : null
        }
        description={entry.description}
      >
        {/*
          The dependency pills used to sit here on their own: a row of bare
          package names with nothing saying what they were. They are one item
          in a labelled metadata strip now, alongside the two other things worth
          knowing before you commit to a component: how much API it has, and
          what you are allowed to do with it.
        */}
        <dl className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            <dt className="flex items-center gap-1.5">
              <Package aria-hidden="true" className="size-3.5" />
              Dependencies
            </dt>
            <dd className="flex flex-wrap items-center gap-1.5">
              {entry.dependencies.length ? (
                entry.dependencies.map((dep) => (
                  <span
                    key={dep}
                    className="rounded-full border bg-muted/60 px-2 py-0.5 font-mono text-[11px] text-foreground/80"
                  >
                    {dep}
                  </span>
                ))
              ) : (
                <span className="text-foreground/80">None</span>
              )}
            </dd>
          </div>

          <div className="flex items-center gap-1.5">
            <dt className="flex items-center gap-1.5">
              <SlidersHorizontal aria-hidden="true" className="size-3.5" />
              <span className="sr-only">Props</span>
            </dt>
            <dd className="text-foreground/80">
              {entry.props.length} prop{entry.props.length === 1 ? "" : "s"}
            </dd>
          </div>

          <div className="flex items-center gap-1.5">
            <dt className="flex items-center gap-1.5">
              <Scale aria-hidden="true" className="size-3.5" />
              <span className="sr-only">Licence</span>
            </dt>
            <dd className="text-foreground/80">MIT</dd>
          </div>
        </dl>
      </DocsPageHeader>

      {/*
        Preview and source in one frame with a toolbar, rather than a floating
        tab strip above a separate card. Two bordered boxes stacked with a gap
        read as two unrelated things; one box with a tab bar reads as one
        workbench with two views of the same component.
      */}
      <Tabs defaultValue="preview" className="mt-8 min-w-0">
        <div className="w-full max-w-full overflow-hidden rounded-xl border bg-card shadow-subtle">
          <div className="flex items-center justify-between gap-3 border-b bg-muted/40 px-2 py-2">
            <TabsList className="h-8 gap-1 bg-transparent p-0">
              <TabsTrigger
                value="preview"
                className="h-8 gap-1.5 px-2.5 text-xs data-[state=active]:bg-background"
              >
                <Eye className="size-3.5" />
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="h-8 gap-1.5 px-2.5 text-xs data-[state=active]:bg-background"
              >
                <Code2 className="size-3.5" />
                Code
              </TabsTrigger>
            </TabsList>

            {/* The registry name, i.e. what you type after `shadcn add`. */}
            <span className="hidden pr-2 font-mono text-[11px] text-muted-foreground sm:block">
              {entry.name}
            </span>
          </div>

          <TabsContent value="preview" className="mt-0 min-w-0">
            <ComponentPreview
              category={entry.category}
              name={entry.name}
              fullBleed={fullBleed}
              className="rounded-none border-0 shadow-none"
            />
          </TabsContent>
          <TabsContent value="code" className="mt-0 min-w-0">
            <CodeBlock
              code={entry.usage}
              maxHeight="20rem"
              className="my-0 rounded-none border-0 shadow-none"
            />
          </TabsContent>
        </div>
      </Tabs>

      {/*
        A link out rather than the playground itself.

        Inline, it needed a control column beside the stage and a snippet
        below, which pushed the page's real content — when to use it, the
        props, the install command — a full screen further down. It gets a
        page of its own, and this is the invitation to it.
      */}
      {hasPlayground ? (
        <Link
          href={`/playground/${entry.category}/${entry.name}`}
          className="group mt-6 flex items-center gap-4 rounded-xl border bg-card p-4 shadow-subtle transition-colors hover:border-brand/40"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand">
            <SlidersHorizontal aria-hidden="true" className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">
              Tune {entry.title} in the playground
            </span>
            <span className="block text-xs text-muted-foreground">
              Every prop as a control, with the code updating as you go. Plus
              Motion Studio for the easing.
            </span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}

      {entry.whenToUse ? (
        <DocsSection
          id="when-to-use"
          tocLabel="When to use"
          title={`When to use ${entry.title}`}
        >
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            {entry.whenToUse}
          </p>
        </DocsSection>
      ) : null}

      <DocsSection
        id="installation"
        title="Installation"
        description="Add it with the CLI, or copy the source into your project."
      >
        <InstallTabs entry={entry} />
      </DocsSection>

      <DocsSection
        id="props"
        title="Props"
        description={`Everything ${entry.title} accepts.`}
      >
        <PropsTable props={entry.props} />
      </DocsSection>

      <footer className="mt-16 border-t pt-6">
        {entry.credits ? (
          /*
            "Thanks to X for contributing" only reads correctly for a person.
            A neutral "Written by" covers both, and being explicit about which
            components were written by a tool is worth saying plainly rather
            than dressing up as a community contribution.
          */
          <p className="text-sm text-muted-foreground">
            Written by{" "}
            <a
              href={entry.credits.url}
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              {entry.credits.name}
            </a>
            {entry.credits.kind === "tool"
              ? ", reviewed and maintained by Nikhil."
              : ". Thanks for the contribution."}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <a
            href={contentUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <PencilLine className="size-3.5" />
            Edit this page
          </a>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Code2 className="size-3.5" />
            View component source
          </a>
        </div>

        <nav
          aria-label="Component pagination"
          className="mt-8 flex items-stretch justify-between gap-4"
        >
          {previous ? (
            <Link
              href={previous.href}
              className="group flex min-w-0 flex-1 flex-col items-start gap-0.5 rounded-xl border px-4 py-3 transition-colors hover:border-brand/40 hover:bg-accent/50 sm:min-w-56 sm:flex-none"
            >
              <span className="flex items-center text-xs text-muted-foreground">
                <ArrowLeft className="mr-1 size-3 transition-transform group-hover:-translate-x-0.5" />
                Previous
              </span>
              <span className="w-full truncate text-sm font-medium">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={next.href}
              className="group flex min-w-0 flex-1 flex-col items-end gap-0.5 rounded-xl border px-4 py-3 text-right transition-colors hover:border-brand/40 hover:bg-accent/50 sm:min-w-56 sm:flex-none"
            >
              <span className="flex items-center text-xs text-muted-foreground">
                Next
                <ArrowRight className="ml-1 size-3 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="w-full truncate text-sm font-medium">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </footer>
    </div>
  );
}

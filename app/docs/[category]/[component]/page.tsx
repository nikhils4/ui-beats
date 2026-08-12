import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CodeBlock } from "@/components/website/code-block";
import { ComponentPreview } from "@/components/website/component-preview";
import { InstallTabs } from "@/components/website/install-tabs";
import {
  getComponent,
  getComponentsByCategory,
  getRegistry,
  categoryLabel,
} from "@/lib/registry";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { componentKeywords, componentSeoTitle } from "@/lib/seo";
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
    // appends " — UI Beats", so the brand still rides along.
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
  const fullBleed = entry.fullBleedPreview ?? false;

  // Previous/next within the category, for the footer pager.
  const siblings = getComponentsByCategory(entry.category as ComponentCategory);
  const index = siblings.findIndex((s) => s.name === entry.name);
  const previous = index > 0 ? siblings[index - 1] : undefined;
  const next = index < siblings.length - 1 ? siblings[index + 1] : undefined;

  /*
   * SoftwareSourceCode JSON-LD.
   *
   * Tells search engines this page *is* a code component rather than an
   * article about one, and exposes the language, license and dependencies —
   * which is what makes a component page eligible for a code-flavoured result
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
      <Breadcrumb>
        <BreadcrumbList className="text-xs">
          <SidebarTrigger className="mr-1 size-6" />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/getting-started/introduction">
              Docs
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/docs/${entry.category}`}>
              {label}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">
              {entry.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mt-8 mb-10">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tighter text-balance">
            {entry.title}
          </h1>
          {entry.isNew ? (
            <Badge className="border-brand/25 bg-brand-subtle text-brand hover:bg-brand-subtle">
              New
            </Badge>
          ) : null}
        </div>
        <p className="mt-3 text-base leading-relaxed text-balance text-muted-foreground">
          {entry.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {entry.dependencies.map((dep) => (
            <span
              key={dep}
              className="rounded-full border bg-muted/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {dep}
            </span>
          ))}
        </div>
      </header>

      <Tabs defaultValue="preview" className="min-w-0">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="mt-4 min-w-0">
          <ComponentPreview
            category={entry.category}
            name={entry.name}
            fullBleed={fullBleed}
          />
        </TabsContent>
        <TabsContent value="code" className="mt-4 min-w-0">
          <CodeBlock
            code={entry.usage}
            title={`${entry.name}.usage.tsx`}
            maxHeight="20rem"
          />
        </TabsContent>
      </Tabs>

      {entry.whenToUse ? (
        <section className="mt-14 min-w-0">
          <h2 className="mb-3 scroll-m-20 text-2xl font-semibold tracking-tight">
            When to use {entry.title}
          </h2>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            {entry.whenToUse}
          </p>
        </section>
      ) : null}

      <section className="mt-14 min-w-0">
        <h2 className="mb-1 scroll-m-20 text-2xl font-semibold tracking-tight">
          Installation
        </h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Add it with the CLI, or copy the source into your project.
        </p>
        <InstallTabs entry={entry} />
      </section>

      <section className="mt-14 min-w-0">
        <h2 className="mb-1 scroll-m-20 text-2xl font-semibold tracking-tight">
          Props
        </h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Everything {entry.title} accepts.
        </p>
        {/* The table scrolls inside this box rather than widening the page. */}
        <div className="w-full max-w-full overflow-x-auto rounded-xl border bg-card shadow-subtle">
          <Table className="min-w-[42rem]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[20%]">Prop</TableHead>
                <TableHead className="w-[26%]">Type</TableHead>
                <TableHead className="w-[16%]">Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entry.props.map((prop) => (
                <TableRow key={prop.prop}>
                  <TableCell className="align-top font-mono text-xs font-medium text-brand">
                    {prop.prop}
                  </TableCell>
                  <TableCell className="align-top font-mono text-xs break-words text-muted-foreground">
                    {prop.type}
                  </TableCell>
                  <TableCell className="align-top font-mono text-xs text-muted-foreground">
                    {prop.defaultValue}
                  </TableCell>
                  <TableCell className="align-top text-sm">
                    {prop.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {entry.credits ? (
        <section className="mt-14">
          <div className="rounded-xl border bg-muted/40 p-5">
            <h2 className="mb-1 scroll-m-20 text-sm font-semibold">Credits</h2>
            {/*
              "Thanks to X for contributing" only reads correctly for a person.
              A neutral "Written by" covers both, and being explicit about which
              components were written by a tool is worth saying plainly rather
              than dressing up as a community contribution.
            */}
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
                ? ", reviewed and maintained by the Nikhil."
                : ". Thanks for the contribution."}
            </p>
          </div>
        </section>
      ) : null}

      <nav
        aria-label="Component pagination"
        className="mt-14 flex items-center justify-between gap-4 border-t pt-6"
      >
        {previous ? (
          <Link
            href={previous.href}
            className="group flex min-w-0 flex-col items-start rounded-lg px-3 py-2 transition-colors hover:bg-accent"
          >
            <span className="flex items-center text-xs text-muted-foreground">
              <ArrowLeft className="mr-1 size-3 transition-transform group-hover:-translate-x-0.5" />
              Previous
            </span>
            <span className="truncate text-sm font-medium">
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={next.href}
            className="group flex min-w-0 flex-col items-end rounded-lg px-3 py-2 text-right transition-colors hover:bg-accent"
          >
            <span className="flex items-center text-xs text-muted-foreground">
              Next
              <ArrowRight className="ml-1 size-3 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="truncate text-sm font-medium">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

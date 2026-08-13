import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Studio } from "@/components/website/studio";
import { getComponent, categoryLabel } from "@/lib/registry";
import { getStudioComponents } from "@/lib/studio";
import { absoluteUrl, siteConfig } from "@/lib/site";
import type { ComponentCategory } from "@/types/component-config.type";

interface PageProps {
  params: Promise<{ category: string; component: string }>;
}

/**
 * A component's studio, deep-linked.
 *
 * Renders the same tool as `/motion-studio` with this component already
 * selected. Keeping a route per component is what gives each one a page that
 * can rank for "<component> playground" and a stable link from its docs page;
 * the picker inside the studio then handles moving between them without a
 * navigation.
 */
export async function generateStaticParams() {
  return getStudioComponents().map((entry) => ({
    category: entry.category,
    component: entry.name,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, component } = await params;
  const entry = getComponent(category, component);
  if (!entry) return {};

  const title = `${entry.title} Playground`;
  const description = `Tune ${entry.title} live — every prop as a control, the code updating as you go. Shape its easing in Motion Studio.`;
  const url = absoluteUrl(`/playground/${entry.category}/${entry.name}`);

  return {
    title,
    description,
    keywords: [
      `${entry.title.toLowerCase()} playground`,
      `react ${entry.title.toLowerCase()} generator`,
      `customise ${entry.title.toLowerCase()}`,
      "react animation playground",
      "cubic bezier editor",
      "spring animation editor",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${siteConfig.name}`,
      description,
      url,
      type: "website",
      siteName: siteConfig.name,
    },
  };
}

export default async function PlaygroundPage({ params }: PageProps) {
  const { category, component } = await params;
  const entry = getComponent(category, component);
  const components = getStudioComponents();
  const key = `${category}/${component}`;

  if (
    !entry ||
    !components.some((item) => `${item.category}/${item.name}` === key)
  ) {
    notFound();
  }

  const label = categoryLabel(entry.category as ComponentCategory);

  return (
    // Same fixed-viewport shell as /motion-studio; see the note there.
    <main className="flex w-full min-w-0 flex-col lg:h-[calc(100svh-4rem)] lg:overflow-hidden">
      <header className="shrink-0 border-b px-4 py-3 sm:px-6">
        <Link
          href={entry.href}
          className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
          Back to {entry.title} docs
        </Link>

        <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="text-lg font-bold tracking-tight">
            {entry.title} playground
          </h1>
          <p className="text-sm text-muted-foreground">
            {label} · change a prop and it updates.
          </p>
        </div>
      </header>

      <Studio
        components={components}
        initial={key}
        className="lg:min-h-0 lg:flex-1"
      />
    </main>
  );
}

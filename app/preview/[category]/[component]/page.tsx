import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
// `hasPreview` is not imported alongside this: it lives in a "use client"
// module and cannot be called from a Server Component. It would be redundant
// anyway, since `generateStaticParams` only emits blocks and `ComponentPreview`
// renders its own fallback for anything unregistered.
import { ComponentPreview } from "@/components/website/component-preview";
import { getComponent, getRegistry } from "@/lib/registry";

/**
 * A block on its own, at the width it was designed for.
 *
 * The docs page frames every component in a fixed stage, which is right for a
 * button and wrong for a page section: Pricing showed its heading and the top
 * of its cards and nothing else. A block needs the full viewport to be judged,
 * and the responsive behaviour it was built for only happens at real widths,
 * not inside a 700px card.
 *
 * Blocks only. A full page given over to a Magnetic Button would be one button
 * in an ocean of nothing.
 */
interface PageProps {
  params: Promise<{ category: string; component: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getRegistry()
    .filter((entry) => entry.category === "block")
    .map((entry) => ({ category: entry.category, component: entry.name }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, component } = await params;
  const entry = getComponent(category, component);
  if (!entry) return {};

  return {
    title: `${entry.title} preview`,
    description: entry.description,
    // A bare frame with no navigation is not a page anyone should land on
    // from a search result; the documented version is the one that ranks.
    robots: { index: false, follow: false },
  };
}

export default async function BlockPreviewPage({ params }: PageProps) {
  const { category, component } = await params;
  const entry = getComponent(category, component);

  if (!entry || entry.category !== "block") notFound();

  return (
    <main className="min-h-screen bg-background">
      {/* The only chrome: a way back. Floating, so it never takes a slice of
          the width the block is being judged at. */}
      <Link
        href={entry.href}
        className="fixed top-4 left-4 z-50 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-xs font-medium shadow-subtle backdrop-blur transition-colors hover:bg-accent"
      >
        <ArrowLeft className="size-3.5" />
        {entry.title}
      </Link>

      <ComponentPreview
        category={category}
        name={component}
        fullBleed
        /*
         * No frame, no fixed height: the block gets the page. `bg-background`
         * overrides the stage's `bg-card`, which otherwise showed as a seam of
         * a slightly different grey below the section's own background.
         */
        className="h-auto min-h-screen rounded-none border-0 bg-background shadow-none"
      />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, Scale, Terminal } from "lucide-react";
import { DocsBreadcrumb } from "@/components/website/docs-breadcrumb";
import { DocsPageHeader } from "@/components/website/docs-page-header";
import { DocsSection } from "@/components/website/docs-section";
import { getRegistry } from "@/lib/registry";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "UI Beats is a collection of animated React components built with TypeScript, Tailwind CSS and Motion. Copy and paste them, or install with the shadcn CLI.",
  alternates: { canonical: absoluteUrl("/docs/getting-started/introduction") },
};

const nextSteps = [
  {
    href: "/docs/getting-started/installation",
    title: "Installation",
    description: "What your project needs before adding a component.",
  },
  {
    href: "/docs/getting-started/cli",
    title: "CLI",
    description: "Add any component with one command.",
  },
  {
    href: "/docs/getting-started/contribute",
    title: "Contribute",
    description: "The four files a new component needs.",
  },
];

export default function IntroductionPage() {
  const count = getRegistry().length;

  return (
    <div className="w-full min-w-0 pb-16">
      <DocsBreadcrumb
        items={[
          { label: "Docs", href: "/docs/getting-started/introduction" },
          { label: "Getting Started", href: "/docs/getting-started" },
          { label: "Introduction" },
        ]}
      />

      <DocsPageHeader
        title="Introduction"
        description="Beautifully designed, animated components you can drop straight into your app."
      >
        <dl className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <dt className="flex items-center gap-1.5">
              <Boxes aria-hidden="true" className="size-3.5" />
              <span className="sr-only">Components</span>
            </dt>
            <dd className="text-foreground/80">{count} components</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="flex items-center gap-1.5">
              <Terminal aria-hidden="true" className="size-3.5" />
              <span className="sr-only">Install</span>
            </dt>
            <dd className="text-foreground/80">shadcn CLI or copy-paste</dd>
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

      <p className="mt-8 leading-7">
        UI Beats is a collection of {count} reusable components crafted with
        React, TypeScript, Tailwind CSS and{" "}
        <a
          href="https://motion.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          Motion
        </a>
        . Every component is accessible, customisable and open source.
      </p>

      <DocsSection id="you-own-the-code" title="You own the code">
        <p className="max-w-2xl leading-7">
          This is <strong>not</strong> a package you install and import from.
          You own the code: add a component, then change whatever you like. No
          version pinning, no wrapper APIs, no waiting on us to expose a prop.
        </p>
      </DocsSection>

      <DocsSection
        id="adding-a-component"
        title="Two ways to add a component"
        tocLabel="Adding a component"
      >
        <p className="max-w-2xl leading-7">
          The{" "}
          <Link
            href="/docs/getting-started/cli"
            className="font-medium text-brand underline-offset-4 hover:underline"
          >
            shadcn CLI
          </Link>{" "}
          writes the file and installs its dependencies for you, or you can copy
          the source from any component page. Both leave you with plain source
          in your own repo. The CLI just saves you the round trip.
        </p>
      </DocsSection>

      <DocsSection id="next-steps" title="Where to go next">
        <ul className="grid gap-3 sm:grid-cols-3">
          {nextSteps.map((step) => (
            <li key={step.href}>
              <Link
                href={step.href}
                className="group flex h-full flex-col rounded-xl border bg-card p-4 shadow-subtle transition-colors hover:border-brand/40 hover:bg-accent/40"
              >
                <span className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
                  {step.title}
                  <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
                </span>
                <span className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </DocsSection>

      <footer className="mt-16 border-t pt-6">
        <p className="text-sm text-muted-foreground">
          UI Beats is inspired by{" "}
          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand underline-offset-4 hover:underline"
          >
            shadcn/ui
          </a>
          , whose approach to distributing components as source rather than as a
          dependency shaped this project.
        </p>
      </footer>
    </div>
  );
}

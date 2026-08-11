import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbGettingStarted from "@/components/website/breadcrumb-getting-started";
import { getRegistry } from "@/lib/registry";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "UI Beats is a collection of animated React components built with TypeScript, Tailwind CSS and Motion — copy and paste, or install with the shadcn CLI.",
  alternates: { canonical: absoluteUrl("/docs/getting-started/introduction") },
};

export default function IntroductionPage() {
  const count = getRegistry().length;

  return (
    <div className="mx-auto pb-10 md:container">
      <BreadcrumbGettingStarted page="Introduction" />

      <div className="mt-5 space-y-2">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
          Introduction
        </h1>
        <p className="text-base text-muted-foreground">
          Beautifully designed, animated components you can drop straight into
          your app.
        </p>
      </div>

      <div className="space-y-6 pt-8 pb-12 leading-7">
        <p>
          UI Beats is a collection of {count} reusable components crafted with
          React, TypeScript, Tailwind CSS and{" "}
          <a
            href="https://motion.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Motion
          </a>
          . Every component is accessible, customisable and open source.
        </p>

        <p>
          This is <strong>not</strong> a package you install and import from.
          You own the code: add a component, then change whatever you like. No
          version pinning, no wrapper APIs, no waiting on us to expose a prop.
        </p>

        <p>
          There are two ways to get a component. The{" "}
          <Link
            href="/docs/getting-started/cli"
            className="underline underline-offset-4"
          >
            shadcn CLI
          </Link>{" "}
          writes the file and installs its dependencies for you, or you can copy
          the source from any component page.
        </p>

        <p>
          UI Beats is inspired by{" "}
          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            shadcn/ui
          </a>
          , whose approach to distributing components as source rather than as a
          dependency shaped this project.
        </p>
      </div>
    </div>
  );
}

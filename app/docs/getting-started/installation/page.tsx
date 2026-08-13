import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/website/code-block";
import { DocsBreadcrumb } from "@/components/website/docs-breadcrumb";
import { DocsPageHeader } from "@/components/website/docs-page-header";
import { DocsSection } from "@/components/website/docs-section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Set up your project for UI Beats components: Tailwind CSS, Motion, and the cn helper.",
  alternates: { canonical: absoluteUrl("/docs/getting-started/installation") },
};

export default function InstallationPage() {
  return (
    <div className="w-full min-w-0 pb-16">
      <DocsBreadcrumb
        items={[
          { label: "Docs", href: "/docs/getting-started/introduction" },
          { label: "Getting Started", href: "/docs/getting-started" },
          { label: "Installation" },
        ]}
      />

      <DocsPageHeader
        title="Installation"
        description="What your project needs before adding a component."
      />

      <DocsSection id="requirements" title="Requirements">
        <p className="mb-4 max-w-2xl leading-7">
          UI Beats components are written for React 19 with Tailwind CSS v4 and
          Motion. Most components need only Motion; a few also use the{" "}
          <code className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">
            cn
          </code>{" "}
          class helper. Each component page lists exactly what it imports.
        </p>
        <CodeBlock code="npm install motion" language="bash" />
      </DocsSection>

      <DocsSection id="tailwind-css" title="Tailwind CSS">
        <p className="max-w-2xl leading-7">
          Follow the{" "}
          <a
            href="https://tailwindcss.com/docs/installation"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand underline-offset-4 hover:underline"
          >
            official Tailwind installation guide
          </a>{" "}
          for your framework. Components use standard utility classes plus the
          shadcn design tokens (
          <code className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">
            bg-background
          </code>
          ,{" "}
          <code className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">
            text-muted-foreground
          </code>
          , …), so they inherit whatever theme you already have.
        </p>
      </DocsSection>

      <DocsSection
        id="cn-helper"
        tocLabel="The cn helper"
        title={
          <>
            The <code className="font-mono text-[0.9em] text-brand">cn</code>{" "}
            helper
          </>
        }
        description="Only needed for components that merge an incoming className prop."
      >
        <CodeBlock code="npm install clsx tailwind-merge" language="bash" />
        <CodeBlock
          title="lib/utils.ts"
          code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
        />
      </DocsSection>

      <DocsSection id="adding-a-component" title="Adding a component">
        <p className="max-w-2xl leading-7">
          With the project set up, use the{" "}
          <Link
            href="/docs/getting-started/cli"
            className="font-medium text-brand underline-offset-4 hover:underline"
          >
            CLI
          </Link>{" "}
          to add components, or copy the source from any component page and
          adjust the import paths to match your project.
        </p>
      </DocsSection>
    </div>
  );
}

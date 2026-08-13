import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/website/code-block";
import { DocsBreadcrumb } from "@/components/website/docs-breadcrumb";
import { DocsPageHeader } from "@/components/website/docs-page-header";
import { DocsSection } from "@/components/website/docs-section";
import { getRegistry } from "@/lib/registry";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "CLI",
  description:
    "Install any UI Beats component with the shadcn CLI. Dependencies are resolved for you.",
  alternates: { canonical: absoluteUrl("/docs/getting-started/cli") },
};

export default function CliPage() {
  const registry = getRegistry();
  const example = registry.find((e) => e.name === "flip-card") ?? registry[0];

  return (
    <div className="w-full min-w-0 pb-16">
      <DocsBreadcrumb
        items={[
          { label: "Docs", href: "/docs/getting-started/introduction" },
          { label: "Getting Started", href: "/docs/getting-started" },
          { label: "CLI" },
        ]}
      />

      <DocsPageHeader
        title="CLI"
        description="Add components with one command."
      />

      <p className="mt-8 max-w-2xl leading-7">
        UI Beats publishes a{" "}
        <a
          href="https://ui.shadcn.com/docs/registry"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          shadcn-compatible registry
        </a>
        , so the standard CLI can install any component here. It writes the file
        into your project and installs the npm packages that component needs.
      </p>

      <DocsSection
        id="set-up-shadcn"
        title="1. Set up shadcn in your project"
        tocLabel="Set up shadcn"
        description={
          <>
            Skip this if you already have a{" "}
            <code className="font-mono">components.json</code>.
          </>
        }
      >
        <CodeBlock code="npx shadcn@latest init" language="bash" />
      </DocsSection>

      <DocsSection
        id="add-a-component"
        title="2. Add a component"
        tocLabel="Add a component"
      >
        {example ? (
          <CodeBlock
            code={`npx shadcn@latest add ${absoluteUrl(`/r/${example.name}.json`)}`}
            language="bash"
          />
        ) : null}
        <p className="mt-3 text-sm text-muted-foreground">
          Every component page lists its own command under{" "}
          <strong className="font-medium text-foreground">
            Installation → CLI
          </strong>
          .
        </p>
      </DocsSection>

      <DocsSection id="registry-index" title="Registry index">
        <p className="max-w-2xl leading-7">
          The full machine-readable index of every component lives at{" "}
          <a
            href={absoluteUrl("/r/registry.json")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            /r/registry.json
          </a>
          . Individual items are served from{" "}
          <code className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">
            /r/&lt;name&gt;.json
          </code>
          .
        </p>
      </DocsSection>

      <DocsSection
        id="available-components"
        title={`Available components (${registry.length})`}
        tocLabel="Available components"
        description="Every name below is installable with the command above."
      >
        <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-3">
          {registry
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((entry) => (
              <li key={entry.name}>
                <Link
                  href={entry.href}
                  className="font-mono text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
                >
                  {entry.name}
                </Link>
              </li>
            ))}
        </ul>
      </DocsSection>
    </div>
  );
}

import type { Metadata } from "next";
import { CodeBlock } from "@/components/website/code-block";
import { DocsBreadcrumb } from "@/components/website/docs-breadcrumb";
import { DocsPageHeader } from "@/components/website/docs-page-header";
import { DocsSection } from "@/components/website/docs-section";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "How to contribute a component to UI Beats: project setup, the four files a component needs, and the PR checklist.",
  alternates: { canonical: absoluteUrl("/docs/getting-started/contribute") },
};

const inlineCode =
  "rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[0.85em]";

export default function ContributePage() {
  return (
    <div className="w-full min-w-0 pb-16">
      <DocsBreadcrumb
        items={[
          { label: "Docs", href: "/docs/getting-started/introduction" },
          { label: "Getting Started", href: "/docs/getting-started" },
          { label: "Contribute" },
        ]}
      />

      <DocsPageHeader
        title="Contribute"
        description="Add a component, fix a bug, improve the docs."
      />

      <DocsSection id="local-setup" title="Local setup">
        <CodeBlock
          language="bash"
          code={`git clone ${siteConfig.links.github}.git
cd ui-beats
yarn install
yarn dev`}
        />
        <p className="mt-3 text-sm text-muted-foreground">
          Requires Node 20.9 or newer. Run{" "}
          <code className={inlineCode}>yarn typecheck</code>,{" "}
          <code className={inlineCode}>yarn lint</code> and{" "}
          <code className={inlineCode}>yarn test</code> before opening a PR. CI
          runs all three anyway.
        </p>
      </DocsSection>

      <DocsSection
        id="anatomy"
        title="Anatomy of a component"
        description="A component is four files. Once they exist, the sidebar, the docs page, the sitemap and the shadcn registry entry are all generated from them. There is no central list to keep up to date."
      >
        <CodeBlock
          language="bash"
          code={`components/demo/<category>/<name>.tsx        # the component itself
components/usage/<category>/<name>.usage.tsx # a runnable example
content/docs/<category>/<name>.content.ts    # title, description, props table
components/website/component-preview.tsx     # add one line to the preview map`}
        />
        <p className="mt-3 text-sm text-muted-foreground">
          Then add the config to the array in{" "}
          <code className={inlineCode}>content/docs/index.ts</code>.
        </p>
      </DocsSection>

      <DocsSection id="guidelines" title="Component guidelines">
        <ul className="max-w-2xl list-outside list-disc space-y-2 pl-6 leading-7 marker:text-brand">
          <li>
            Type every prop. No <code className={inlineCode}>any</code>.
          </li>
          <li>
            Keep dependencies minimal.{" "}
            <code className={inlineCode}>motion</code> is fine, a new charting
            library is not. Whatever the component imports becomes a dependency
            for everyone who installs it.
          </li>
          <li>
            Use the design tokens (
            <code className={inlineCode}>bg-background</code>,{" "}
            <code className={inlineCode}>text-muted-foreground</code>) rather
            than hardcoded colours, so the component works in both themes.
          </li>
          <li>
            Honour <code className={inlineCode}>prefers-reduced-motion</code>{" "}
            for anything that animates continuously.
          </li>
          <li>Give interactive elements accessible names and visible focus.</li>
        </ul>
      </DocsSection>

      <DocsSection id="pull-request" title="Opening a pull request">
        <CodeBlock
          language="bash"
          code={`git checkout -b feat/your-component
git commit -m "feat(card): add tilt card"
git push origin feat/your-component`}
        />
        <p className="mt-3 max-w-2xl leading-7">
          Include a screenshot or screen recording of the component in the PR
          description. Contributors are credited on their component&apos;s docs
          page.
        </p>
      </DocsSection>
    </div>
  );
}

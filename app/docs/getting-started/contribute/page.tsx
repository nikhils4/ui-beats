import type { Metadata } from "next";
import BreadcrumbGettingStarted from "@/components/website/breadcrumb-getting-started";
import { CodeBlock } from "@/components/website/code-block";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "How to contribute a component to UI Beats — project setup, the four files a component needs, and the PR checklist.",
  alternates: { canonical: absoluteUrl("/docs/getting-started/contribute") },
};

export default function ContributePage() {
  return (
    <div className="mx-auto pb-10 md:container">
      <BreadcrumbGettingStarted page="Contribute" />

      <div className="mt-5 space-y-2">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
          Contribute
        </h1>
        <p className="text-base text-muted-foreground">
          Add a component, fix a bug, improve the docs.
        </p>
      </div>

      <div className="space-y-10 pt-8 pb-12">
        <section>
          <h2 className="mb-3 text-xl font-semibold">Local setup</h2>
          <CodeBlock
            language="bash"
            code={`git clone ${siteConfig.links.github}.git
cd ui-beats
yarn install
yarn dev`}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            Requires Node 20.9 or newer. Run <code>yarn typecheck</code>,{" "}
            <code>yarn lint</code> and <code>yarn test</code> before opening a
            PR — CI runs all three.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Anatomy of a component</h2>
          <p className="mb-4 leading-7">
            A component is four files. Once they exist, the sidebar, the docs
            page, the sitemap and the shadcn registry entry are all generated
            from them — there is no central list to update.
          </p>
          <CodeBlock
            language="bash"
            code={`components/demo/<category>/<name>.tsx        # the component itself
components/usage/<category>/<name>.usage.tsx # a runnable example
content/docs/<category>/<name>.content.ts    # title, description, props table
components/website/component-preview.tsx     # add one line to the preview map`}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            Then add the config to the array in{" "}
            <code className="font-mono">content/docs/index.ts</code>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Component guidelines</h2>
          <ul className="list-outside list-disc space-y-2 pl-6 leading-7">
            <li>
              Type every prop. No <code className="font-mono">any</code>.
            </li>
            <li>
              Keep dependencies minimal —{" "}
              <code className="font-mono">motion</code> is fine, a new charting
              library is not. Whatever the component imports becomes a
              dependency for everyone who installs it.
            </li>
            <li>
              Use the design tokens (
              <code className="font-mono">bg-background</code>,{" "}
              <code className="font-mono">text-muted-foreground</code>) rather
              than hardcoded colours, so the component works in both themes.
            </li>
            <li>
              Honour <code className="font-mono">prefers-reduced-motion</code>{" "}
              for anything that animates continuously.
            </li>
            <li>
              Give interactive elements accessible names and visible focus.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Opening a pull request</h2>
          <CodeBlock
            language="bash"
            code={`git checkout -b feat/your-component
git commit -m "feat(card): add tilt card"
git push origin feat/your-component`}
          />
          <p className="mt-3 leading-7">
            Include a screenshot or screen recording of the component in the PR
            description. Contributors are credited on their component&apos;s
            docs page.
          </p>
        </section>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import BreadcrumbGettingStarted from "@/components/website/breadcrumb-getting-started";
import { CodeBlock } from "@/components/website/code-block";
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
    <div className="mx-auto pb-10 md:container">
      <BreadcrumbGettingStarted page="CLI" />

      <div className="mt-5 space-y-2">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">CLI</h1>
        <p className="text-base text-muted-foreground">
          Add components with one command.
        </p>
      </div>

      <div className="space-y-10 pt-8 pb-12">
        <section>
          <p className="leading-7">
            UI Beats publishes a{" "}
            <a
              href="https://ui.shadcn.com/docs/registry"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              shadcn-compatible registry
            </a>
            , so the standard CLI can install any component here. It writes the
            file into your project and installs the npm packages that component
            needs.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            1. Set up shadcn in your project
          </h2>
          <p className="mb-2 text-sm text-muted-foreground">
            Skip this if you already have a <code>components.json</code>.
          </p>
          <CodeBlock code="npx shadcn@latest init" language="bash" />
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">2. Add a component</h2>
          {example ? (
            <CodeBlock
              code={`npx shadcn@latest add ${absoluteUrl(`/r/${example.name}.json`)}`}
              language="bash"
            />
          ) : null}
          <p className="mt-3 text-sm text-muted-foreground">
            Every component page lists its own command under{" "}
            <strong>Installation → CLI</strong>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Registry index</h2>
          <p className="mb-2 leading-7">
            The full machine-readable index of every component lives at{" "}
            <a
              href={absoluteUrl("/r/registry.json")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm underline underline-offset-4"
            >
              /r/registry.json
            </a>
            . Individual items are served from{" "}
            <code className="font-mono text-sm">/r/&lt;name&gt;.json</code>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            Available components ({registry.length})
          </h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-3">
            {registry
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((entry) => (
                <li key={entry.name}>
                  <a
                    href={entry.href}
                    className="font-mono text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {entry.name}
                  </a>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

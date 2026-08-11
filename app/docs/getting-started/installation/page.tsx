import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbGettingStarted from "@/components/website/breadcrumb-getting-started";
import { CodeBlock } from "@/components/website/code-block";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Set up your project for UI Beats components: Tailwind CSS, Motion, and the cn helper.",
  alternates: { canonical: absoluteUrl("/docs/getting-started/installation") },
};

export default function InstallationPage() {
  return (
    <div className="mx-auto pb-10 md:container">
      <BreadcrumbGettingStarted page="Installation" />

      <div className="mt-5 space-y-2">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
          Installation
        </h1>
        <p className="text-base text-muted-foreground">
          What your project needs before adding a component.
        </p>
      </div>

      <div className="space-y-10 pt-8 pb-12">
        <section>
          <h2 className="mb-3 text-xl font-semibold">Requirements</h2>
          <p className="mb-4 leading-7">
            UI Beats components are written for React 19 with Tailwind CSS v4
            and Motion. Most components need only Motion; a few also use the{" "}
            <code className="font-mono text-sm">cn</code> class helper. Each
            component page lists exactly what it imports.
          </p>
          <CodeBlock code="npm install motion" language="bash" />
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Tailwind CSS</h2>
          <p className="mb-4 leading-7">
            Follow the{" "}
            <a
              href="https://tailwindcss.com/docs/installation"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              official Tailwind installation guide
            </a>{" "}
            for your framework. Components use standard utility classes plus the
            shadcn design tokens (
            <code className="font-mono text-sm">bg-background</code>,{" "}
            <code className="font-mono text-sm">text-muted-foreground</code>,
            …), so they inherit whatever theme you already have.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            The <code className="font-mono">cn</code> helper
          </h2>
          <p className="mb-4 leading-7">
            Only needed for components that merge incoming{" "}
            <code className="font-mono text-sm">className</code> props.
          </p>
          <CodeBlock code="npm install clsx tailwind-merge" language="bash" />
          <CodeBlock
            title="lib/utils.ts"
            code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
          />
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Adding a component</h2>
          <p className="leading-7">
            With the project set up, use the{" "}
            <Link
              href="/docs/getting-started/cli"
              className="underline underline-offset-4"
            >
              CLI
            </Link>{" "}
            to add components, or copy the source from any component page and
            adjust the import paths to match your project.
          </p>
        </section>
      </div>
    </div>
  );
}

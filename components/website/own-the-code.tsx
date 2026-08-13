import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BorderBeamUsage from "@/components/usage/component/border-beam.usage";
import { CodeBlock } from "@/components/website/code-block";
import { getComponent } from "@/lib/registry";
import { siteConfig } from "@/lib/site";

const STEPS = [
  {
    title: "Run one command",
    body: "The CLI grabs the component and installs the packages it needs.",
  },
  {
    title: "The file lands in your repo",
    body: "At components/ui/border-beam.tsx. It shows up in your next diff.",
  },
  {
    title: "Change anything",
    body: "No wrapper API, no version to pin. Rename it, cut the props you do not want.",
  },
];

/**
 * The "you own the code" pitch, made with the actual code.
 *
 * The preview and the snippet are the same file the docs page shows, read out
 * of the registry instead of copied into this component. A landing page with a
 * hand-written approximation of the API goes stale the first time the API
 * changes.
 */
export async function OwnTheCode() {
  const entry = getComponent("component", "border-beam");
  if (!entry) return null;

  const install = `npx shadcn@latest add ${siteConfig.url}/r/${entry.name}.json`;

  /*
   * Rewrite the import to the path the reader will actually have.
   *
   * In this repository the demos live under `components/demo/<category>/`, but
   * the registry installs each one to `components/ui/<name>.tsx`. Showing the
   * raw file here would print an import path that contradicts step two sitting
   * directly beside it.
   */
  const usage = entry.usage.replace(
    new RegExp(`@/components/demo/${entry.category}/`, "g"),
    "@/components/ui/",
  );

  return (
    <section className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-20 md:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            Copy, paste, own
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tighter text-balance sm:text-4xl">
            Every component is a file in your project
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            There is nothing to import from node_modules. The CLI writes the
            source into your repo, and from then on it is yours.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-6">
            {/* The live component, at the same size the docs page renders it. */}
            <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-xl border bg-card shadow-subtle">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)] opacity-60"
              />
              <div className="relative z-10">
                <BorderBeamUsage />
              </div>
            </div>

            <ol className="grid gap-5">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand-subtle font-mono text-xs font-semibold text-brand">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="min-w-0">
            <CodeBlock code={install} language="bash" className="mt-0" />
            <CodeBlock
              code={usage}
              title={`${entry.name}.usage.tsx`}
              maxHeight="24rem"
            />
            <p className="mt-3 text-sm text-muted-foreground">
              That is the whole API.{" "}
              <Link
                href={entry.href}
                className="inline-flex items-center gap-1 font-medium text-brand underline-offset-4 hover:underline"
              >
                Read the props
                <ArrowRight className="size-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/website/code-block";
import { getComponent } from "@/lib/registry";
import { siteConfig } from "@/lib/site";

const STEPS = [
  {
    title: "Run one command.",
    body: "The CLI installs the packages it needs.",
  },
  {
    title: "The file lands in your repo.",
    body: "At components/ui/border-beam.tsx, in your next diff.",
  },
  {
    title: "Change anything.",
    body: "No wrapper API, no version to pin.",
  },
];

/**
 * The "you own the code" pitch, made with the actual code.
 *
 * The snippet is the same file the docs page shows, read out of the registry
 * instead of copied into this component. A landing page with a hand-written
 * approximation of the API goes stale the first time the API changes.
 *
 * No live preview here, deliberately: Border Beam already runs in a tile in
 * the showcase above, and a second copy of it cost this section a 18rem panel
 * to say something the reader had just seen. The claim is about the file.
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
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-20 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div className="max-w-md">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              Copy, paste, own
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tighter text-balance sm:text-4xl">
              Every component is a file in your project
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Nothing to import from node_modules. The CLI writes the source
              into your repo, and from then on it is yours.
            </p>

            {/* Numbered by a mono index rather than a filled circle: three
                short lines should read as a caption, not a feature list. */}
            <ol className="mt-8 grid gap-3">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-3 text-sm">
                  <span className="pt-px font-mono text-xs text-brand/70">
                    0{index + 1}
                  </span>
                  <p className="leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {step.title}
                    </span>{" "}
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="min-w-0">
            <CodeBlock code={install} language="bash" className="mt-0" />
            <CodeBlock
              code={usage}
              title={`${entry.name}.usage.tsx`}
              maxHeight="20rem"
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

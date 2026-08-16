import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/website/code-block";
import {
  deriveControls,
  generateSnippet,
  initialValues,
  resolvePlaygroundConfig,
  tagFor,
} from "@/lib/playground";
import { getComponent } from "@/lib/registry";
import { siteConfig } from "@/lib/site";

function steps(installPath: string) {
  return [
    {
      title: "Run one command.",
      body: "The CLI installs the packages it needs.",
    },
    {
      title: "The file lands in your repo.",
      body: `At ${installPath}, in your next diff.`,
    },
    {
      title: "Change anything.",
      body: "No wrapper API, no version to pin.",
    },
  ];
}

/**
 * The "you own the code" pitch, made with the actual code.
 *
 * Nothing here is hand-written: a landing page carrying its own copy of the
 * API goes stale the first time the API changes. The install path comes from
 * the registry entry and the snippet is generated from the documented props
 * table, the same way the playground generates its own.
 *
 * It shows the call, not the demo file. Printing the whole of
 * `border-beam.usage.tsx` was the obvious thing and the wrong one: two thirds
 * of it is the card's own markup, so the section's tallest element was a
 * scrolling wall of Tailwind sitting under the words "that is the whole API".
 * What the reader owns is a component that takes children and needs no props.
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
   * Where the CLI puts it, which is not where it lives in this repository —
   * the demos sit under `components/demo/<category>/` and the registry
   * installs each one to `components/ui/<name>.tsx`. Step two and the import
   * in the snippet both derive from this pair, so they cannot contradict each
   * other the way a hardcoded path beside a generated one eventually does.
   */
  const installedAt = `components/ui/${entry.name}.tsx`;
  const modulePath = `@/components/ui/${entry.name}`;

  const config = resolvePlaygroundConfig(entry.name, entry.playground);
  const controls = deriveControls(entry.props, config);
  const usage = [
    `import { ${tagFor(entry.name)} } from "${modulePath}";`,
    "",
    // Every control left at its documented default, so the snippet emits no
    // attributes at all. That is the honest shape of the API, and the props
    // are one link away for anyone who wants them.
    generateSnippet(config, controls, initialValues(controls)),
  ].join("\n");

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
              {steps(installedAt).map((step, index) => (
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
            {/* `page.tsx`, not `border-beam.tsx`: the installed file is what
                step two just described, and this is the reader's own file
                calling it. */}
            <CodeBlock code={usage} title="page.tsx" maxHeight="20rem" />
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

import Link from "next/link";
import { ArrowUpRight, Blocks } from "lucide-react";
import { getComponentsByCategory } from "@/lib/registry";

/**
 * The lead sentence of `whenToUse`.
 *
 * `whenToUse` is written as one or two sentences for the docs page, where
 * there is room for both. Here three of them sit side by side under a dense
 * tile grid, and the second sentence is what turns a light row into a
 * paragraph. Clamping by line count would cut mid-word instead.
 */
function lead(text: string | undefined) {
  if (!text) return null;
  return `${(text.split(". ")[0] ?? text).replace(/\.$/, "")}.`;
}

/**
 * Blocks, on the home page.
 *
 * Deliberately not tiles like the component showcase above it. A block is a
 * whole page section, and a section shrunk into a 12rem card is a screenshot
 * of a layout rather than the layout — which is exactly the complaint the
 * dedicated `/preview` route exists to answer. So this sells them in words and
 * sends people to see the real thing at full width.
 *
 * Words, though, do not need card chrome. Three bordered cards carrying a
 * paragraph and a wall of mono pills read heavier than the live grid above
 * them, which is the wrong way round. Hairline rules, one sentence each, and
 * the parts named in a single quiet line.
 *
 * That last line is the part worth saying out loud: it is what makes a block
 * different from every other component here. Installing one installs
 * everything it is built from.
 */
export function BlocksShowcase() {
  const blocks = getComponentsByCategory("block");
  if (blocks.length === 0) return null;

  return (
    <section className="relative border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-20 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              <Blocks className="size-3.5" />
              Blocks
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tighter text-balance sm:text-4xl">
              Whole sections, not just parts
            </h2>
            <p className="mt-3 max-w-lg text-sm text-muted-foreground">
              Install a block and it brings every component it is built from
              with it. One command, a finished section, and a file you own.
            </p>
          </div>
          <Link
            href="/docs/block/hero"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            All {blocks.length} blocks
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block) => (
            <li key={block.name}>
              <Link
                href={block.href}
                className="group flex h-full flex-col border-t border-border/70 py-5 transition-colors hover:border-brand/50"
              >
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  {block.title}
                  <ArrowUpRight className="size-3.5 text-brand opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </p>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {lead(block.whenToUse)}
                </p>

                {/* What it pulls in, named rather than badged. This is the
                    whole pitch, so it stays here rather than a click away. */}
                {block.beatsDependencies.length ? (
                  <p className="mt-4 font-mono text-[11px] text-muted-foreground">
                    {block.beatsDependencies.join(" · ")}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

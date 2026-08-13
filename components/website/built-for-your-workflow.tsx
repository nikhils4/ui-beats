import Link from "next/link";
import { ArrowRight, Bot, SlidersHorizontal } from "lucide-react";
import { CodeBlock } from "@/components/website/code-block";

/**
 * The two things nobody else in this category ships.
 *
 * The landing page argued the library was well built, which every component
 * library claims, and said nothing about the only two features that are
 * genuinely hard to copy: the catalogue being installable from inside a coding
 * agent, and every component being tunable before you take the code. Both were
 * reachable only by already being deep in the docs.
 */
export function BuiltForYourWorkflow() {
  return (
    <section className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-20 md:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            Built for how you build
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tighter text-balance sm:text-4xl">
            Pick it with your agent. Tune it before you copy.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-subtle sm:p-8">
            <span className="flex size-10 items-center justify-center rounded-lg border border-brand/20 bg-brand-subtle text-brand">
              <Bot className="size-5" />
            </span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">
              Your agent knows the catalogue
            </h3>
            <p className="mt-2.5 leading-relaxed text-muted-foreground">
              Add the MCP server once. Claude Code, Cursor and Windsurf can then
              search the components, read the real props and install one without
              opening this site.
            </p>

            <div className="mt-6">
              <CodeBlock
                code="claude mcp add uibeats -- npx -y @uibeats/mcp"
                language="bash"
                className="my-0"
              />
            </div>

            <Link
              href="/docs/getting-started/mcp"
              className="group mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-brand"
            >
              Set up the MCP server
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-subtle sm:p-8">
            <span className="flex size-10 items-center justify-center rounded-lg border border-brand/20 bg-brand-subtle text-brand">
              <SlidersHorizontal className="size-5" />
            </span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">
              Every prop is a dial
            </h3>
            <p className="mt-2.5 leading-relaxed text-muted-foreground">
              Drag a control, watch it change, copy the snippet. It carries only
              what you changed. Motion Studio goes further: shape the easing
              curve or tune the spring, then take the transition.
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border bg-muted/40 px-4 py-3">
                <dt className="text-xs text-muted-foreground">Controls from</dt>
                <dd className="mt-0.5 font-medium">the props table</dd>
              </div>
              <div className="rounded-xl border bg-muted/40 px-4 py-3">
                <dt className="text-xs text-muted-foreground">Springs are</dt>
                <dd className="mt-0.5 font-medium">simulated, not faked</dd>
              </div>
            </dl>

            <Link
              href="/motion-studio"
              className="group mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-brand"
            >
              Open Motion Studio
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

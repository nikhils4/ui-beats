import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Sidebar call-to-action.
 *
 * Was a client component whose only interactivity was a `window.open` inside
 * an `onClick`, plus a `<style jsx global>` block redefining a keyframe that
 * already exists in the theme. It is a link and a gradient now.
 */
export function ShowcaseCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border bg-card p-5 shadow-subtle">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-accent-pink/10"
      />
      <div className="relative">
        <h3 className="text-sm font-semibold tracking-tight">
          Built something?
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          We&apos;d love to feature what you made with UI Beats in the showcase.
        </p>
        <Link
          href="https://forms.gle/eVBGbBEyG1ELqDMv6"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand underline-offset-4 hover:underline"
        >
          Submit your site
          <ArrowUpRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}

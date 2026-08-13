import type { ReactNode } from "react";
import { Hash } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Doubles as the anchor target, so keep it URL-friendly and stable. */
  id: string;
  /** Plain-text label for the "On this page" rail, if the heading is JSX. */
  tocLabel?: string;
  className?: string;
  children: ReactNode;
}

/**
 * A linkable `<h2>`.
 *
 * `data-docs-heading` is what `DocsToc` collects: scoping the rail to a marker
 * attribute rather than to `main h2` keeps a heading rendered *inside* a live
 * component preview from showing up as a page section.
 */
export function SectionHeading({
  id,
  tocLabel,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <h2
      id={id}
      data-docs-heading=""
      data-toc-label={tocLabel}
      // Anchored jumps land with the heading pinned to the very top of the
      // viewport otherwise, with no context above it.
      className={cn(
        "group scroll-mt-24 text-2xl font-semibold tracking-tight",
        className,
      )}
    >
      <a href={`#${id}`} className="inline-flex items-center gap-2">
        {children}
        <Hash
          aria-hidden="true"
          className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
        />
      </a>
    </h2>
  );
}

interface DocsSectionProps {
  id: string;
  title: ReactNode;
  tocLabel?: string;
  description?: ReactNode;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}

/**
 * One section of a docs page: an anchored heading, an optional standfirst, and
 * the content. Every docs page uses this so section rhythm, scroll offsets and
 * the table of contents stay in step across all of them.
 */
export function DocsSection({
  id,
  title,
  tocLabel,
  description,
  className,
  contentClassName,
  children,
}: DocsSectionProps) {
  return (
    <section
      aria-labelledby={id}
      className={cn("mt-14 min-w-0 scroll-mt-24", className)}
    >
      <SectionHeading
        id={id}
        tocLabel={tocLabel}
        className={description ? "mb-1.5" : "mb-5"}
      >
        {title}
      </SectionHeading>

      {description ? (
        <p className="mb-5 max-w-2xl text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}

      <div className={cn("min-w-0", contentClassName)}>{children}</div>
    </section>
  );
}

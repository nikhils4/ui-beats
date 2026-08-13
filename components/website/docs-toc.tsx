"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TocHeading {
  id: string;
  label: string;
  level: 2 | 3;
}

/** Distance below the viewport top at which a heading becomes the current one. */
const ACTIVE_OFFSET = 140;

/**
 * "On this page" rail.
 *
 * Reads the headings out of the rendered page instead of being handed a list.
 * Any docs route (component, category, getting-started) gets a table of
 * contents just by marking its headings up with `DocsSection`, with nothing to
 * thread through the layout.
 */
export function DocsToc() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // Read on the next frame rather than in the effect body: on a client-side
    // navigation this component and the new page commit together, so the
    // headings being collected are the ones the browser has just laid out.
    const frame = requestAnimationFrame(() => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("main [data-docs-heading][id]"),
      );

      setHeadings(
        nodes.map((node) => ({
          id: node.id,
          label: node.dataset.tocLabel ?? node.textContent?.trim() ?? node.id,
          level: node.tagName === "H3" ? 3 : 2,
        })),
      );
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (headings.length === 0) return;

    let frame = 0;

    const sync = () => {
      frame = 0;

      // The last heading to have crossed the offset line is the one the reader
      // is inside. Sections have wildly different heights here (a two-line
      // "When to use" next to a twenty-row props table), which is what makes a
      // plain `IntersectionObserver` ratio unreliable for this.
      let current = headings[0]?.id ?? "";
      for (const heading of headings) {
        const top = document
          .getElementById(heading.id)
          ?.getBoundingClientRect().top;
        if (top !== undefined && top <= ACTIVE_OFFSET) current = heading.id;
      }

      // A short final section can never cross the line, so the rail would stay
      // stuck one section behind for the whole bottom of the page.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = headings.at(-1)?.id ?? current;

      setActiveId(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page">
      <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        On this page
      </p>

      <ul className="border-l border-border/70">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  // Pulled a pixel left so the active marker sits *on* the
                  // rail rather than beside it.
                  "-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors",
                  heading.level === 3 ? "pl-6" : "pl-3",
                  isActive
                    ? "border-brand font-medium text-brand"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {heading.label}
              </a>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowUp className="size-3" />
        Back to top
      </button>
    </nav>
  );
}

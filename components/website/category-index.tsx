import Link from "next/link";
import { CATEGORY_META, CATEGORY_ORDER } from "@/config/categories";
import type { RegistryEntry } from "@/lib/registry";
import type { ComponentCategory } from "@/types/component-config.type";

/**
 * The full catalogue, as an index rather than a card grid.
 *
 * Every component is one row of text, grouped under its category and separated
 * by hairlines. It puts all twenty names on screen at once — a card per
 * category showed six boxes and named almost nothing.
 */
export function CategoryIndex({ entries }: { entries: RegistryEntry[] }) {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: entries.filter((entry) => entry.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <section className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-24 md:px-8">
        <h2 className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
          Index
        </h2>

        {/* Multi-column rather than a grid: groups have very different heights
            (7 animations vs 1 component) and a grid would size every row to
            its tallest member, leaving ragged gaps. Columns pack naturally. */}
        <div className="mt-10 gap-x-12 sm:columns-2 lg:columns-3">
          {grouped.map(({ category, items }) => {
            const Icon = CATEGORY_META[category as ComponentCategory].icon;

            return (
              <div key={category} className="mb-10 break-inside-avoid">
                <Link
                  href={`/docs/${category}`}
                  className="group flex items-baseline gap-2 border-b border-border/70 pb-2.5"
                >
                  <Icon className="size-3.5 shrink-0 translate-y-0.5 text-brand" />
                  <span className="text-sm font-semibold tracking-tight transition-colors group-hover:text-brand">
                    {CATEGORY_META[category as ComponentCategory].label}
                  </span>
                  <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                    {String(items.length).padStart(2, "0")}
                  </span>
                </Link>

                <ul className="mt-1">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="group flex items-baseline gap-2 border-b border-border/40 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <span className="truncate">{item.title}</span>
                        {item.isNew ? (
                          <span className="rounded-full bg-brand-subtle px-1.5 py-px text-[10px] font-medium text-brand">
                            New
                          </span>
                        ) : null}
                        <span
                          aria-hidden="true"
                          className="ml-auto translate-x-1 font-mono text-xs text-brand opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

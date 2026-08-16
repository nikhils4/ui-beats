"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ExpandableCardItem {
  id: string;
  title: string;
  /** Small line above the title: a date, a category, a status. */
  meta?: string;
  /** The one line shown while the card is collapsed. */
  summary: string;
  /** The body revealed once it is open. */
  detail: string;
}

interface ExpandableCardProps {
  items: ExpandableCardItem[];
  /** Seconds the expand and collapse take. */
  duration?: number;
  className?: string;
}

/**
 * A list of cards where any one of them expands in place into a detail panel.
 *
 * The expansion is a shared layout animation, not a card that fades out while
 * a modal fades in: the open panel carries the same `layoutId` as the row that
 * spawned it, so Motion interpolates the one box into the other and the reader
 * never loses track of which card they opened. The title and meta carry their
 * own ids for the same reason; without them the text would stretch with the
 * box instead of travelling to its new position.
 *
 * `layoutId` is namespaced with `useId`, so two of these on one page do not
 * animate into each other's cards.
 *
 * It behaves like the dialog it is: Escape closes, the backdrop closes, focus
 * moves to the panel on open and returns to the row that opened it on close.
 * With reduced motion the panel simply appears: the geometry still explains
 * where it came from, and nothing travels to say so.
 */
export function ExpandableCard({
  items,
  duration = 0.35,
  className = "",
}: ExpandableCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const scope = useId();
  const [activeId, setActiveId] = useState<string | null>(null);
  const triggersRef = useRef(new Map<string, HTMLButtonElement | null>());
  const panelRef = useRef<HTMLDivElement>(null);

  const active = items.find((item) => item.id === activeId) ?? null;

  const close = useCallback(() => {
    setActiveId((current) => {
      // Focus goes back where it came from, or it lands on the document body
      // and the next Tab starts the page over.
      if (current) triggersRef.current.get(current)?.focus();
      return null;
    });
  }, []);

  useEffect(() => {
    if (!activeId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", handleKeyDown);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeId, close]);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className={cn("relative w-full", className)}>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <motion.li
            key={item.id}
            layoutId={`${scope}-${item.id}`}
            transition={transition}
            className="overflow-hidden rounded-xl border bg-card"
          >
            <button
              type="button"
              ref={(node) => {
                triggersRef.current.set(item.id, node);
              }}
              onClick={() => setActiveId(item.id)}
              aria-expanded={activeId === item.id}
              className="flex w-full items-center gap-4 p-4 text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <span className="min-w-0 flex-1">
                {item.meta ? (
                  <motion.span
                    layoutId={`${scope}-${item.id}-meta`}
                    transition={transition}
                    className="block text-xs text-muted-foreground"
                  >
                    {item.meta}
                  </motion.span>
                ) : null}
                <motion.span
                  layoutId={`${scope}-${item.id}-title`}
                  transition={transition}
                  className="block truncate text-sm font-medium"
                >
                  {item.title}
                </motion.span>
                <span className="mt-0.5 block truncate text-sm text-muted-foreground">
                  {item.summary}
                </span>
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {active ? (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              onClick={close}
              className="absolute inset-0 z-20 rounded-xl bg-background/80 backdrop-blur-[2px]"
            />

            <div className="pointer-events-none absolute inset-0 z-30 grid place-items-center p-2">
              <motion.div
                key="panel"
                ref={panelRef}
                layoutId={`${scope}-${active.id}`}
                transition={transition}
                role="dialog"
                aria-modal="true"
                aria-label={active.title}
                tabIndex={-1}
                className="pointer-events-auto max-h-full w-full max-w-sm overflow-auto rounded-xl border bg-card p-5 shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {active.meta ? (
                  <motion.p
                    layoutId={`${scope}-${active.id}-meta`}
                    transition={transition}
                    className="text-xs text-muted-foreground"
                  >
                    {active.meta}
                  </motion.p>
                ) : null}

                <motion.h3
                  layoutId={`${scope}-${active.id}-title`}
                  transition={transition}
                  className="text-base font-semibold"
                >
                  {active.title}
                </motion.h3>

                {/*
                 * The body is not part of the shared layout: it does not exist
                 * in the collapsed card, so it fades in once the box has
                 * finished travelling rather than being stretched into place.
                 */}
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : duration,
                    delay: prefersReducedMotion ? 0 : duration * 0.5,
                  }}
                >
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {active.detail}
                  </p>

                  <button
                    type="button"
                    onClick={close}
                    className="mt-4 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default ExpandableCard;

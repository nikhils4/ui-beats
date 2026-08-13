/**
 * How long a component counts as new.
 *
 * Client-safe, like `config/categories.ts`, because the sidebar needs it and
 * that module is a client component while `lib/registry.ts` is `server-only`.
 */
export const NEW_FOR_DAYS = 30;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Parse a `YYYY-MM-DD` config date as UTC midnight.
 *
 * `new Date("2026-08-13")` is already UTC, but `new Date("2026-08-13T00:00")`
 * is local. Being explicit keeps a build machine in UTC+13 from reading a
 * date as the day before and quietly ageing every component by one day.
 */
export function parseAddedAt(addedAt: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(addedAt)) return null;

  const parsed = new Date(`${addedAt}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime())) return null;

  // V8 rolls an out-of-range day over rather than rejecting it, so a typo like
  // `2026-02-31` would quietly become the third of March. Round-tripping the
  // date back to a string is what catches that.
  return parsed.toISOString().startsWith(addedAt) ? parsed : null;
}

/**
 * Whether a component was added recently enough to still be badged "New".
 *
 * Pages are statically generated, so this is evaluated at build time and again
 * on each revalidation. A badge ages out on the next build instead of the
 * moment the window passes, which is close enough for a label and costs no
 * client JavaScript.
 */
export function isRecentlyAdded(addedAt: string, now: Date = new Date()) {
  const added = parseAddedAt(addedAt);
  if (!added) return false;
  return now.getTime() - added.getTime() <= NEW_FOR_DAYS * DAY_MS;
}

/** Newest first. Components added on the same day keep their registry order. */
export function byNewest<T extends { addedAt: string }>(a: T, b: T): number {
  return b.addedAt.localeCompare(a.addedAt);
}

import { describe, expect, it } from "vitest";
import {
  NEW_FOR_DAYS,
  byNewest,
  isRecentlyAdded,
  parseAddedAt,
} from "@/config/recency";

const AT = (day: string) => new Date(`${day}T12:00:00.000Z`);

describe("parseAddedAt", () => {
  it("reads a config date as UTC midnight", () => {
    expect(parseAddedAt("2026-08-13")?.toISOString()).toBe(
      "2026-08-13T00:00:00.000Z",
    );
  });

  it("rejects anything that is not YYYY-MM-DD", () => {
    for (const bad of ["13-08-2026", "2026/08/13", "2026-08", "", "today"]) {
      expect(parseAddedAt(bad), bad).toBeNull();
    }
  });

  it("rejects a well-shaped date that does not exist", () => {
    expect(parseAddedAt("2026-02-31")).toBeNull();
  });
});

describe("isRecentlyAdded", () => {
  it("counts the day it was added", () => {
    expect(isRecentlyAdded("2026-08-13", AT("2026-08-13"))).toBe(true);
  });

  it("holds through the whole window and drops out after it", () => {
    const added = "2026-08-13";
    const lastDay = new Date(
      Date.UTC(2026, 7, 13) + NEW_FOR_DAYS * 24 * 60 * 60 * 1000,
    );
    const dayAfter = new Date(lastDay.getTime() + 1);

    expect(isRecentlyAdded(added, lastDay)).toBe(true);
    expect(isRecentlyAdded(added, dayAfter)).toBe(false);
  });

  /*
   * The bug this whole field exists to prevent: Text Shine was added in
   * October 2024 and still carried a "New" badge nearly two years later,
   * because the flag was hand-set and nothing ever cleared it.
   */
  it("does not call a two-year-old component new", () => {
    expect(isRecentlyAdded("2024-10-24", AT("2026-08-13"))).toBe(false);
  });

  it("treats an unparseable date as not new rather than throwing", () => {
    expect(isRecentlyAdded("nonsense", AT("2026-08-13"))).toBe(false);
  });
});

describe("byNewest", () => {
  it("sorts newest first", () => {
    const sorted = [
      { addedAt: "2024-08-04" },
      { addedAt: "2026-08-13" },
      { addedAt: "2026-08-11" },
    ].sort(byNewest);

    expect(sorted.map((entry) => entry.addedAt)).toEqual([
      "2026-08-13",
      "2026-08-11",
      "2024-08-04",
    ]);
  });

  it("leaves same-day components in the order they were given", () => {
    const sorted = [
      { addedAt: "2026-08-13", name: "a" },
      { addedAt: "2026-08-13", name: "b" },
      { addedAt: "2026-08-13", name: "c" },
    ].sort(byNewest);

    expect(sorted.map((entry) => entry.name)).toEqual(["a", "b", "c"]);
  });
});

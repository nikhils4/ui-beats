import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * The home showcase grid has to end on a straight line.
 *
 * `grid-auto-flow: dense` backfills holes that appear *before* the last item,
 * which is why the middle of the grid always looks right and hid this for so
 * long. It cannot backfill the end: a two-row tile placed near the bottom
 * leaves its second row half empty, and the section trails off into four cells
 * of background rather than finishing. That is what shipped: Glowing Card
 * spanning two rows in the last row of the six-column layout, with nothing
 * beside it.
 *
 * Nothing failed when it happened, because nothing was checking. This does the
 * arithmetic the layout depends on: parse the tiles out of the source, run the
 * same first-fit placement the browser runs, and assert that no cell is left
 * empty at either breakpoint. The two differ: the same tiles pack differently
 * into four columns and six, so fixing one by eye routinely breaks the other.
 */

const ROOT = process.cwd();
const SHOWCASE = path.join(
  ROOT,
  "components",
  "website",
  "component-showcase.tsx",
);

interface Tile {
  label: string;
  cols: Record<number, number>;
  rows: number;
}

/**
 * The opening `<Tile …>` tags, with their spans.
 *
 * Scanning to the first `>` at brace depth zero keeps expression props like
 * `onAction={() => wait(1400)}` from ending the tag early, and skips the
 * children, where `label="Scratch me"` on a nested demo would otherwise be
 * read as a tile of its own.
 */
function parseTiles(source: string): Tile[] {
  const tiles: Tile[] = [];

  for (const match of source.matchAll(/<Tile\b/g)) {
    const start = match.index;
    let depth = 0;
    let end = -1;

    for (let i = start; i < source.length; i += 1) {
      const character = source[i];
      if (character === "{") depth += 1;
      else if (character === "}") depth -= 1;
      else if (character === ">" && depth === 0) {
        end = i;
        break;
      }
    }

    expect(end, "unterminated <Tile> tag").toBeGreaterThan(-1);
    const tag = source.slice(start, end);
    const className = /className="([^"]*)"/.exec(tag)?.[1] ?? "";
    const span = (breakpoint: string, axis: string) => {
      const found = new RegExp(`${breakpoint}:${axis}-span-(\\d+)`).exec(
        className,
      );
      return found ? Number(found[1]) : null;
    };

    const sm = span("sm", "col") ?? 1;

    tiles.push({
      label: /label="([^"]+)"/.exec(tag)?.[1] ?? "?",
      // `lg:` falls back to whatever `sm:` set, exactly as the cascade does.
      cols: { 4: sm, 6: span("lg", "col") ?? sm },
      rows: span("sm", "row") ?? 1,
    });
  }

  return tiles;
}

/** First-fit placement over a fixed column count, as dense auto-flow does it. */
function pack(tiles: Tile[], columns: number): (string | null)[][] {
  const grid: (string | null)[][] = [];
  const row = (index: number) =>
    (grid[index] ??= Array<string | null>(columns).fill(null));

  for (const tile of tiles) {
    const width = Math.min(tile.cols[columns] ?? 1, columns);
    let placed = false;

    for (let top = 0; !placed; top += 1) {
      for (let left = 0; left + width <= columns; left += 1) {
        let free = true;
        for (let r = top; r < top + tile.rows && free; r += 1) {
          for (let c = left; c < left + width && free; c += 1) {
            if (row(r)[c]) free = false;
          }
        }
        if (!free) continue;

        for (let r = top; r < top + tile.rows; r += 1) {
          for (let c = left; c < left + width; c += 1) row(r)[c] = tile.label;
        }
        placed = true;
        break;
      }
    }
  }

  return grid;
}

describe("home showcase grid", () => {
  const source = fs.readFileSync(SHOWCASE, "utf8");
  const tiles = parseTiles(source);

  it("finds the tiles", () => {
    expect(tiles.length).toBeGreaterThan(20);
    // A tile with no label would be one the parser lost track of.
    expect(tiles.filter((tile) => tile.label === "?")).toEqual([]);
  });

  it.each([4, 6])("leaves no empty cell at %i columns", (columns) => {
    const grid = pack(tiles, columns);

    const holes = grid.flatMap((row, index) =>
      row
        .map((cell, column) => (cell ? null : `row ${index}, column ${column}`))
        .filter((cell): cell is string => cell !== null),
    );

    expect(
      holes,
      `the grid ends ragged, ${holes.length} empty cell(s):\n  ${holes.join("\n  ")}`,
    ).toEqual([]);
  });

  it("keeps every tile inside the narrower grid", () => {
    // A `sm:col-span-6` would silently be clamped to the full width at four
    // columns and quietly break the arithmetic above.
    for (const tile of tiles) {
      expect(
        tile.cols[4],
        `${tile.label} is wider than the sm grid`,
      ).toBeLessThanOrEqual(4);
      expect(
        tile.cols[6],
        `${tile.label} is wider than the lg grid`,
      ).toBeLessThanOrEqual(6);
    }
  });
});

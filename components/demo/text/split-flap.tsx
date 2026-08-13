"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_CHARSET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:'!?-";

/** One column of the board: what it shows, what it just turned over from. */
interface Flap {
  char: string;
  previous: string;
  /** Flips completed by this column. Doubles as the animation's key. */
  flip: number;
}

interface SplitFlapProps {
  /** The word or phrase to land on. Change it and the board re-flaps. */
  text: string;
  /** Characters the flaps cycle through, in order. */
  charset?: string;
  /** Milliseconds each flap is held before turning to the next character. */
  interval?: number;
  /** Milliseconds each column waits behind the one to its left. */
  stagger?: number;
  className?: string;
}

/**
 * A mechanical split-flap board: every column riffles through the alphabet
 * until it reaches its letter, left to right.
 *
 * Columns advance one character per tick toward their target rather than
 * showing random glyphs, so the board always lands — and the ripple comes from
 * each column starting a beat after its neighbour, exactly as a real board's
 * motors do.
 *
 * Each cell renders exactly two flaps, the outgoing card and the incoming one,
 * keyed on the column's flip count. An `AnimatePresence` here would be the
 * obvious choice and the wrong one: at one flip every 55ms the exits cannot
 * retire faster than they arrive, and a spinning column ends up holding twenty
 * invisible cards it has already turned over.
 *
 * The flaps are decorative markup; the text itself is exposed once, to screen
 * readers, so a board mid-flip is never read out as gibberish.
 */
export function SplitFlap({
  text,
  charset = DEFAULT_CHARSET,
  interval = 55,
  stagger = 70,
  className = "",
}: SplitFlapProps) {
  const prefersReducedMotion = useReducedMotion();
  const blank = charset[0] ?? " ";

  // Spread rather than `split("")`, so a character outside the basic plane
  // stays one flap instead of being torn into surrogate halves.
  const target = useMemo(() => [...text.toUpperCase()], [text]);

  const [cells, setCells] = useState<Flap[]>(() =>
    target.map(() => ({ char: blank, previous: blank, flip: 0 })),
  );
  // The authoritative board state, so the ticking loop never has to read
  // through a closure over stale state.
  const board = useRef<Flap[]>(cells);

  useEffect(() => {
    if (prefersReducedMotion) {
      board.current = target.map((char) => ({
        char,
        previous: char,
        flip: 0,
      }));
      setCells(board.current);
      return;
    }

    // Carry over whatever is on the board, so a change of text flips from the
    // old word rather than resetting to blanks first.
    board.current = target.map(
      (_, column) =>
        board.current[column] ?? { char: blank, previous: blank, flip: 0 },
    );
    setCells(board.current);

    let tick = 0;
    const timer = setInterval(() => {
      tick += 1;
      let settled = true;
      const next = [...board.current];

      for (let column = 0; column < target.length; column++) {
        const startsAt = Math.round((column * stagger) / interval);
        const current = next[column];
        const wanted = target[column] ?? blank;
        if (!current) continue;

        if (tick <= startsAt) {
          settled = false;
          continue;
        }
        if (current.char === wanted) continue;

        settled = false;
        const index = charset.indexOf(current.char);
        // A character the board cannot reach by cycling — punctuation outside
        // the charset — is set directly, so a column can never spin forever.
        const advanced =
          charset.includes(wanted) && index !== -1
            ? (charset[(index + 1) % charset.length] ?? wanted)
            : wanted;

        next[column] = {
          char: advanced,
          previous: current.char,
          flip: current.flip + 1,
        };
      }

      board.current = next;
      setCells(next);
      if (settled) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [target, charset, interval, stagger, prefersReducedMotion, blank]);

  // Half a beat, so the incoming card has landed before the next one starts.
  const flipDuration = Math.min(interval / 1000, 0.12);
  // A blank flap still has to hold its cell open, so the space is
  // non-breaking rather than collapsible whitespace.
  const glyph = (char: string) => (char === " " ? "\u00A0" : char);

  return (
    <span className={cn("inline-flex gap-[0.15em] font-mono", className)}>
      <span className="sr-only">{text}</span>

      {cells.map((cell, column) => (
        <span
          key={column}
          aria-hidden="true"
          className={cn(
            "relative inline-flex h-[1.5em] w-[1em] items-center justify-center",
            "overflow-hidden rounded-[0.12em] bg-zinc-900 text-zinc-50",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] dark:bg-zinc-950",
          )}
          style={{ perspective: "120px" }}
        >
          {/* The card being turned over. Remounted on each flip by its key, so
              it replays without any presence bookkeeping. */}
          {cell.flip > 0 ? (
            <motion.span
              key={`out-${cell.flip}`}
              initial={{ rotateX: 0, opacity: 1 }}
              animate={{ rotateX: 75, opacity: 0 }}
              transition={{ duration: flipDuration, ease: "easeIn" }}
              style={{ transformOrigin: "center center" }}
              className="absolute inset-0 flex items-center justify-center leading-none"
            >
              {glyph(cell.previous)}
            </motion.span>
          ) : null}

          {/* The card falling into place. */}
          <motion.span
            key={`in-${cell.flip}`}
            initial={
              cell.flip > 0 ? { rotateX: -75, opacity: 0 } : { opacity: 1 }
            }
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: flipDuration, ease: "easeOut" }}
            // Hinged on the middle seam, which is what makes the character
            // read as a card turning over rather than a letter fading.
            style={{ transformOrigin: "center center" }}
            className="absolute inset-0 flex items-center justify-center leading-none"
          >
            {glyph(cell.char)}
          </motion.span>

          {/* The seam. A split-flap board is two half-cards; without the line
              across the middle this is just a letter in a box. */}
          <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/50" />
        </span>
      ))}
    </span>
  );
}

export default SplitFlap;

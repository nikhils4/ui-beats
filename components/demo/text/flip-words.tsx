"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FlipWordsProps {
  words: string[];
  /** Seconds each word is held before the next one arrives. */
  interval?: number;
  /** Seconds the swap itself takes. */
  duration?: number;
  className?: string;
}

/**
 * One slot in a sentence that cycles through a list of words.
 *
 * `mode="popLayout"` is what makes the sentence hold together: it takes the
 * outgoing word out of the flow the moment it starts leaving, so the incoming
 * one is already in position rather than waiting for an empty box to collapse.
 * The `layout` on the wrapper then animates the width difference, so the text
 * after the slot slides rather than jumping: the thing that makes most
 * word-rotators look broken mid-sentence.
 *
 * With the preference set the list stops advancing altogether. A word that
 * changes under the reader on a timer is motion whether or not the change
 * itself is animated, and the sentence still reads with the first one in
 * place.
 */
export function FlipWords({
  words,
  interval = 2,
  duration = 0.5,
  className = "",
}: FlipWordsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || words.length < 2) return;

    const id = setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      interval * 1000,
    );
    return () => clearInterval(id);
  }, [interval, prefersReducedMotion, words.length]);

  // A shrinking list can leave the index past the end between renders.
  const word = words[index % Math.max(words.length, 1)] ?? "";

  return (
    <motion.span
      layout={!prefersReducedMotion}
      className={cn("inline-flex", className)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: "0.4em", filter: "blur(8px)" }
          }
          animate={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
          exit={
            prefersReducedMotion
              ? undefined
              : { opacity: 0, y: "-0.4em", filter: "blur(8px)" }
          }
          transition={{
            duration: prefersReducedMotion ? 0 : duration,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="whitespace-nowrap"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

export default FlipWords;

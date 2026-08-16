"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface TextScrambleProps {
  text: string;
  /** Characters cycled through before a letter settles. */
  characters?: string;
  /** Milliseconds between scramble frames. */
  speed?: number;
  /** Frames each character scrambles before locking in. */
  scrambleCount?: number;
  /** Re-run the effect whenever the pointer enters the text. */
  scrambleOnHover?: boolean;
  className?: string;
}

const DEFAULT_CHARS = "!<>-_\\/[]{}—=+*^?#________";

/**
 * Decodes text one character at a time, cycling through random glyphs before
 * each letter settles.
 */
export function TextScramble({
  text,
  characters = DEFAULT_CHARS,
  speed = 40,
  scrambleCount = 6,
  scrambleOnHover = true,
  className = "",
}: TextScrambleProps) {
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const [renderedText, setRenderedText] = useState(text);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // React's "adjust state when a prop changes" pattern: resetting during render
  // rather than in an effect avoids a wasted commit with stale text on screen.
  if (text !== renderedText) {
    setRenderedText(text);
    setDisplay(text);
  }

  const stop = useCallback(() => {
    if (frameRef.current) {
      clearInterval(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  /**
   * Starts the scramble interval. Deliberately performs no synchronous state
   * update, so it is safe to call from an effect body: the timer is the
   * external system the effect subscribes to.
   */
  const run = useCallback(() => {
    if (prefersReducedMotion) return;

    stop();
    let frame = 0;

    frameRef.current = setInterval(() => {
      const revealed = Math.floor(frame / scrambleCount);

      if (revealed >= text.length) {
        setDisplay(text);
        stop();
        return;
      }

      const next = text
        .split("")
        .map((char, index) => {
          if (index < revealed || char === " ") return char;
          return (
            characters[Math.floor(Math.random() * characters.length)] ?? char
          );
        })
        .join("");

      setDisplay(next);
      frame += 1;
    }, speed);
  }, [characters, prefersReducedMotion, scrambleCount, speed, stop, text]);

  // `display` starts as the final text, so the server-rendered markup and the
  // reduced-motion path both show real, readable content.
  useEffect(() => {
    run();
    return stop;
  }, [run, stop]);

  return (
    <span
      className={`inline-block font-mono tabular-nums ${className}`}
      onPointerEnter={scrambleOnHover ? run : undefined}
    >
      {/* The settled text is what assistive tech announces; the scrambling
          frames are decorative noise. */}
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

export default TextScramble;

"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TerminalLine {
  /** `command` types out behind a prompt; the rest appear whole. */
  kind?: "command" | "output" | "success" | "error";
  text: string;
}

interface TerminalProps {
  lines: TerminalLine[];
  /** Seconds per character while a command types. */
  typingSpeed?: number;
  /** Seconds between one line finishing and the next starting. */
  lineDelay?: number;
  /** Replay the session from the top once it has finished. */
  loop?: boolean;
  /** Seconds the finished session is held before it replays. */
  loopDelay?: number;
  /** Show the window chrome above the output. */
  chrome?: boolean;
  /** Title shown in the chrome bar. */
  title?: string;
  className?: string;
}

const TONE: Record<string, string> = {
  command: "text-foreground",
  output: "text-muted-foreground",
  success: "text-emerald-500",
  error: "text-destructive",
};

/**
 * A terminal that replays a session, typing the commands and printing the rest.
 *
 * Only commands type. Output arriving one character at a time is the thing
 * that makes most of these read as fake: a real program prints a line at once,
 * and the pause before it is where the work happened. So `lineDelay` sits in
 * front of an output line rather than behind it, which is what turns dead time
 * into something that looks like compilation.
 *
 * The schedule is one timer at a time, re-armed from the state it just
 * produced, rather than a list of timeouts queued up front. A queue cannot be
 * retimed once the reader changes the speed, and cannot be cancelled cleanly
 * when the component unmounts mid-run. It also means the reader's next timing
 * change takes effect on the next line rather than restarting the session.
 *
 * With the preference set the whole session is already printed and no timer is
 * ever armed. That is derived at render rather than written into state, so
 * there is no frame where the transcript is empty because the effect that
 * fills it has not run yet.
 */
export function Terminal({
  lines,
  typingSpeed = 0.03,
  lineDelay = 0.5,
  loop = true,
  loopDelay = 2.5,
  chrome = true,
  title = "bash",
  className = "",
}: TerminalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState({ line: 0, chars: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (progress.line >= lines.length) {
      if (!loop) return;
      const id = setTimeout(
        () => setProgress({ line: 0, chars: 0 }),
        loopDelay * 1000,
      );
      return () => clearTimeout(id);
    }

    const current = lines[progress.line];
    if (!current) return;

    if (current.kind === "command" && progress.chars < current.text.length) {
      const id = setTimeout(
        () => setProgress((state) => ({ ...state, chars: state.chars + 1 })),
        typingSpeed * 1000,
      );
      return () => clearTimeout(id);
    }

    const id = setTimeout(
      () => setProgress((state) => ({ line: state.line + 1, chars: 0 })),
      lineDelay * 1000,
    );
    return () => clearTimeout(id);
  }, [
    progress,
    lines,
    typingSpeed,
    lineDelay,
    loop,
    loopDelay,
    prefersReducedMotion,
  ]);

  const printed = prefersReducedMotion ? lines.length : progress.line;
  const typing = prefersReducedMotion ? undefined : lines[progress.line];
  const isTyping = typing?.kind === "command";

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-xl border bg-card font-mono text-xs",
        className,
      )}
    >
      {chrome ? (
        <div className="flex items-center gap-2 border-b bg-muted/50 px-3 py-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-destructive/70" />
            <span className="size-2.5 rounded-full bg-amber-500/70" />
            <span className="size-2.5 rounded-full bg-emerald-500/70" />
          </span>
          <span className="flex-1 text-center text-[11px] text-muted-foreground">
            {title}
          </span>
        </div>
      ) : null}

      {/*
       * Every line is in the DOM from the first render; the ones that have not
       * been reached yet are held at `opacity-0`.
       *
       * Not a live region, and not a growing list. A live region would
       * re-announce the entire session on every loop, forever, which is the
       * kind of thing that gets a screen reader turned off rather than a
       * component admired. At zero opacity the text stays in the accessibility
       * tree, so the transcript reads in full at any point in the animation —
       * and because the lines are laid out from the start, the box does not
       * grow a row at a time and shove the page around beneath it.
       */}
      <div className="space-y-1 p-4">
        {lines.map((line, index) => {
          const isCurrent = index === printed && isTyping;
          const prompt =
            line.kind === "command" ? (
              <span className="mr-2 text-muted-foreground select-none">$</span>
            ) : null;

          if (isCurrent) {
            return (
              <p key={index} className={TONE.command}>
                {prompt}
                {/*
                 * The half-typed text is a picture of the full line, which is
                 * already available to a reader who is not watching it.
                 */}
                <span aria-hidden="true">
                  {line.text.slice(0, progress.chars)}
                </span>
                <span className="sr-only">{line.text}</span>
                <motion.span
                  aria-hidden="true"
                  className="ml-0.5 inline-block h-3 w-1.5 translate-y-px bg-foreground"
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </p>
            );
          }

          return (
            <p
              key={index}
              className={cn(
                TONE[line.kind ?? "output"],
                index >= printed && "opacity-0",
              )}
            >
              {prompt}
              {line.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Terminal;

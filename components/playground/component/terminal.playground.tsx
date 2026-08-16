"use client";

import { Terminal } from "@/components/demo/component/terminal";
import { TERMINAL_SESSION } from "@/components/playground/demo-content";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for Terminal.
 *
 * `lines` is an array of objects, so it cannot become a control; the harness
 * supplies the same session the docs demo replays.
 */
export default function TerminalPlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(Terminal, values);

  return (
    <div className="w-full max-w-md">
      <Terminal {...props} lines={TERMINAL_SESSION} />
    </div>
  );
}

"use client";

import { useRef } from "react";
import { Timeline } from "@/components/demo/component/timeline";
import { MILESTONES } from "@/components/playground/demo-content";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for Timeline.
 *
 * `items` is an array and `container` is a ref, so neither can become a
 * control; the harness supplies both and the panel drives the rest.
 */
export default function TimelinePlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(Timeline, values);
  const scrollArea = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollArea}
      className="h-72 w-full max-w-sm overflow-y-auto rounded-xl border bg-card p-5"
    >
      <Timeline {...props} items={MILESTONES} container={scrollArea} />
    </div>
  );
}

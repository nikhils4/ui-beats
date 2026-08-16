"use client";

import { useRef } from "react";
import { Timeline } from "@/components/demo/component/timeline";

const milestones = [
  {
    id: "scaffold",
    meta: "Step one",
    title: "Scaffold the component",
    body: "One command writes the four files and edits the three registries that have to know about it.",
  },
  {
    id: "build",
    meta: "Step two",
    title: "Write the animation",
    body: "Motion lives in the same file as the markup, so there is one place to change how it feels.",
  },
  {
    id: "document",
    meta: "Step three",
    title: "Fill in the props table",
    body: "The table is the source of truth: the playground controls are derived from it, not written twice.",
  },
  {
    id: "ship",
    meta: "Step four",
    title: "Open the pull request",
    body: "The suite checks the reduced-motion guard, the title budget and a pixel baseline before it merges.",
  },
];

const TimelineUsage = () => {
  const scrollArea = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollArea}
      className="h-72 w-full max-w-sm overflow-y-auto rounded-xl border bg-card p-5"
    >
      <Timeline items={milestones} container={scrollArea} />
    </div>
  );
};

export default TimelineUsage;

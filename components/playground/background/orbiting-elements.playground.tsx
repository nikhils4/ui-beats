"use client";

import OrbitingElements from "@/components/demo/background/orbiting-elements";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for OrbitingElements.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function OrbitingElementsPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(OrbitingElements, values);

  return (
    <OrbitingElements {...props}>
      {["A", "B", "C"].map((label) => (
        <div
          key={label}
          className="flex size-9 items-center justify-center rounded-full border bg-card text-xs font-semibold shadow-subtle"
        >
          {label}
        </div>
      ))}
    </OrbitingElements>
  );
}

"use client";

import OrbitingElements from "@/components/demo/background/orbiting-elements";
import { asProps } from "@/lib/playground";
import {
  OrbitingCentre,
  OrbitingItems,
} from "@/components/playground/demo-content";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for OrbitingElements.
 *
 * Mirrors `components/usage/background/orbiting-elements.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function OrbitingElementsPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(OrbitingElements, values);

  return (
    <div className="relative flex size-full items-center justify-center">
      <OrbitingCentre />
      <OrbitingElements {...props}>
        <OrbitingItems />
      </OrbitingElements>
    </div>
  );
}

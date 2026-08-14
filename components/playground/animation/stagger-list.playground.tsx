"use client";

import StaggerList from "@/components/demo/animation/stagger-list";
import { asProps } from "@/lib/playground";
import { StaggerItems } from "@/components/playground/demo-content";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for StaggerList.
 *
 * Mirrors `components/usage/animation/stagger-list.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function StaggerListPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(StaggerList, values);

  return (
    <StaggerList {...props} className="space-y-2">
      <StaggerItems />
    </StaggerList>
  );
}

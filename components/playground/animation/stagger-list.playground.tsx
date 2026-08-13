"use client";

import StaggerList from "@/components/demo/animation/stagger-list";
import { asProps } from "@/lib/playground";
import { StageList } from "@/components/playground/stage";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for StaggerList.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function StaggerListPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(StaggerList, values);

  return (
    <StaggerList {...props} className="space-y-2">
      <StageList />
    </StaggerList>
  );
}

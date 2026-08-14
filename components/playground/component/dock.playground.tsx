"use client";

import { Dock, DockItem } from "@/components/demo/component/dock";
import { asProps } from "@/lib/playground";
import { DOCK_ITEMS } from "@/components/playground/demo-content";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for Dock.
 *
 * Mirrors `components/usage/component/dock.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function DockPlayground({ values }: PlaygroundHarnessProps) {
  const props = asProps(Dock, values);

  return (
    <Dock {...props}>
      {DOCK_ITEMS.map(({ label, icon: Icon }) => (
        <DockItem key={label} label={label}>
          <Icon className="size-1/2 text-muted-foreground" />
        </DockItem>
      ))}
    </Dock>
  );
}

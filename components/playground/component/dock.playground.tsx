"use client";

import { Dock, DockItem } from "@/components/demo/component/dock";
import { asProps } from "@/lib/playground";
import { Home, Layers, Mail, Search, Settings } from "lucide-react";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

const DOCK_ITEMS = [
  { label: "Home", icon: Home },
  { label: "Search", icon: Search },
  { label: "Projects", icon: Layers },
  { label: "Mail", icon: Mail },
  { label: "Settings", icon: Settings },
];

/**
 * Playground harness for Dock.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
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

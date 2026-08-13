"use client";

import CardStack from "@/components/demo/card/card-stack";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for CardStack.
 *
 * Supplies whatever the component needs beyond its scalar props — children,
 * object literals — and lets the control panel drive the rest.
 */
export default function CardStackPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(CardStack, values);

  return (
    <CardStack {...props} className="w-64">
      {["Own the code", "No wrapper API", "Ship it"].map((line) => (
        <div key={line} className="text-sm font-medium">
          {line}
        </div>
      ))}
    </CardStack>
  );
}

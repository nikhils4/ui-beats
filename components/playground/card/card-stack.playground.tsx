"use client";

import CardStack from "@/components/demo/card/card-stack";
import { asProps } from "@/lib/playground";
import { QuoteCards } from "@/components/playground/demo-content";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for CardStack.
 *
 * Mirrors `components/usage/card/card-stack.usage.tsx` so the studio and
 * the docs page show the same demo. The component takes its props from the
 * control panel; everything around it is identical.
 */
export default function CardStackPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(CardStack, values);

  return (
    <CardStack {...props} className="h-48 w-80">
      <QuoteCards />
    </CardStack>
  );
}

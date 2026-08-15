"use client";

import LoadingButton from "@/components/demo/button/loading-button";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Playground harness for LoadingButton.
 *
 * Mirrors `components/usage/button/loading-button.usage.tsx` so the studio and
 * the docs page show the same demo. The action is stubbed with a timer here
 * because the whole point of the component is what it does while one is in
 * flight; the labels either side of it come from the control panel.
 */
export default function LoadingButtonPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(LoadingButton, values);

  return (
    <LoadingButton {...props} onAction={() => wait(1400)}>
      Publish changes
    </LoadingButton>
  );
}

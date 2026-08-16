"use client";

import AvatarStack from "@/components/demo/component/avatar-stack";
import { TEAM } from "@/components/playground/demo-content";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for AvatarStack.
 *
 * Mirrors `components/usage/component/avatar-stack.usage.tsx` so the studio and
 * the docs page show the same demo. The roster is fixed: it is the thing being
 * laid out, not a setting, and everything else comes from the control panel.
 */
export default function AvatarStackPlayground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(AvatarStack, values);

  return (
    <div className="flex items-center gap-3">
      <AvatarStack {...props} avatars={TEAM} />
      <p className="text-sm text-muted-foreground">
        Joined by 2,400 teams this month
      </p>
    </div>
  );
}

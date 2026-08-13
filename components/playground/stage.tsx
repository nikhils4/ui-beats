"use client";

import { cn } from "@/lib/utils";

/**
 * Filler content for playground harnesses.
 *
 * A wrapper component like FadeIn or StaggerList needs children before it can
 * render at all, and inventing different children on every page makes the
 * playgrounds look like unrelated demos. Sharing one neutral block keeps the
 * reader's attention on the control they just moved.
 */

export function StageCopy({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className="max-w-xs text-center">
      <p
        className={cn(
          "text-lg font-semibold",
          inverted ? "text-white" : "text-foreground",
        )}
      >
        Supercharge your UI
      </p>
      <p
        className={cn(
          "mt-1 text-sm",
          inverted ? "text-white/70" : "text-muted-foreground",
        )}
      >
        Drag a control to see this change.
      </p>
    </div>
  );
}

const ITEMS = ["Copy the component", "Own the code", "Ship it"];

export function StageList() {
  return (
    <>
      {ITEMS.map((item) => (
        <div
          key={item}
          className="rounded-lg border bg-card px-4 py-2.5 text-sm shadow-subtle"
        >
          {item}
        </div>
      ))}
    </>
  );
}

const LOGOS = ["Vercel", "Linear", "Stripe", "Figma", "Raycast", "Supabase"];

export function StageLogos() {
  return (
    <>
      {LOGOS.map((name) => (
        <div
          key={name}
          className="mx-3 rounded-xl border bg-card px-6 py-3 text-sm font-semibold whitespace-nowrap"
        >
          {name}
        </div>
      ))}
    </>
  );
}

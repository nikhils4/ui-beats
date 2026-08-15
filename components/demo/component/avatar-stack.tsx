"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface AvatarStackItem {
  /** Full name — the image's alt text, and what the initials are built from. */
  name: string;
  /** Optional image. An avatar without one falls back to initials. */
  src?: string;
}

interface AvatarStackProps {
  avatars: AvatarStackItem[];
  /** How many avatars to show before the rest collapse into a `+N` chip. */
  max?: number;
  /** Diameter of one avatar, in pixels. */
  size?: number;
  /** How far each avatar sits over the one before it, in pixels. */
  overlap?: number;
  /** Draw a ring in the page background colour, to separate the discs. */
  ring?: boolean;
  className?: string;
}

/** `"Ada Lovelace"` -> `"AL"`. */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";

  const first = parts[0]?.charAt(0) ?? "";
  const last =
    parts.length > 1 ? (parts[parts.length - 1]?.charAt(0) ?? "") : "";
  return (first + last).toUpperCase();
}

/**
 * A row of overlapping avatars with a `+N` chip for the overflow.
 *
 * Hovering lifts one avatar clear of its neighbours rather than pushing them
 * aside: the row keeps its width, so a "trusted by" line beside it never
 * reflows as the pointer travels along the stack.
 *
 * Every avatar carries its owner's name for a screen reader whether it renders
 * an image or initials — a stack of pictures that announces nothing is a row of
 * strangers, and the initials themselves are marked `aria-hidden` because "AC"
 * read aloud is noise.
 */
export function AvatarStack({
  avatars,
  max = 5,
  size = 40,
  overlap = 12,
  ring = true,
  className = "",
}: AvatarStackProps) {
  const prefersReducedMotion = useReducedMotion();

  const visible = avatars.slice(0, Math.max(0, Math.floor(max)));
  const overflow = avatars.length - visible.length;

  const disc = {
    width: size,
    height: size,
    fontSize: Math.max(10, Math.round(size * 0.32)),
  };

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((avatar, index) => (
        <motion.div
          key={`${avatar.name}-${index}`}
          className={cn(
            "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-medium text-muted-foreground select-none hover:z-10",
            ring && "ring-2 ring-background",
          )}
          style={{ ...disc, marginLeft: index === 0 ? 0 : -overlap }}
          whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          {avatar.src ? (
            /*
             * Stays a plain `img`: a registry component is copied into projects
             * that are not necessarily Next.js, and `next/image` would not
             * resolve there.
             */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar.src}
              alt={avatar.name}
              className="size-full object-cover"
            />
          ) : (
            <>
              <span aria-hidden="true">{initials(avatar.name)}</span>
              <span className="sr-only">{avatar.name}</span>
            </>
          )}
        </motion.div>
      ))}

      {overflow > 0 && (
        <div
          className={cn(
            "relative flex shrink-0 items-center justify-center rounded-full bg-foreground font-medium text-background select-none",
            ring && "ring-2 ring-background",
          )}
          style={{ ...disc, marginLeft: -overlap }}
        >
          <span aria-hidden="true">+{overflow}</span>
          <span className="sr-only">{overflow} more</span>
        </div>
      )}
    </div>
  );
}

export default AvatarStack;

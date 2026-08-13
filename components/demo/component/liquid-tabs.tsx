"use client";

import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

interface LiquidTabItem {
  label: string;
  value: string;
}

interface LiquidTabsProps {
  items: LiquidTabItem[];
  /** Selected tab when uncontrolled. Defaults to the first item. */
  defaultValue?: string;
  /** Selected tab. Pass with `onValueChange` to control the component. */
  value?: string;
  onValueChange?: (value: string) => void;
  /** Peak stretch of the pill at full speed, as a scale factor. */
  squish?: number;
  className?: string;
}

/**
 * A tab switcher whose selection pill flows between tabs, stretching as it
 * accelerates and settling back as it lands.
 *
 * The squash is derived from the pill's own velocity rather than scripted per
 * transition: `useVelocity` reads how fast the spring is travelling and maps
 * that to a horizontal stretch, with the vertical scale as its reciprocal so
 * the pill keeps its area. Short hops barely deform; a jump across five tabs
 * stretches hard and snaps back.
 *
 * Position and width are measured from the tabs themselves, so labels of any
 * length work and a resize is picked up without a re-render.
 */
export function LiquidTabs({
  items,
  defaultValue,
  value,
  onValueChange,
  squish = 0.22,
  className = "",
}: LiquidTabsProps) {
  const prefersReducedMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const measured = useRef(false);

  const [uncontrolled, setUncontrolled] = useState(
    defaultValue ?? items[0]?.value ?? "",
  );
  const selected = value ?? uncontrolled;
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.value === selected),
  );

  const spring = { stiffness: 420, damping: 34, mass: 0.9 };
  const x = useSpring(0, spring);
  const width = useSpring(0, spring);

  // Stretch along the direction of travel, compress across it. The reciprocal
  // keeps the pill's area constant, which is what makes it read as something
  // deforming rather than something being resized.
  const velocity = useVelocity(x);
  const stretch = useTransform(
    velocity,
    [-2600, 0, 2600],
    [1 + squish, 1, 1 + squish],
    { clamp: true },
  );
  const scaleX = useSpring(stretch, { stiffness: 500, damping: 30 });
  const scaleY = useTransform(scaleX, (current) => 1 / current);

  const sync = useCallback(() => {
    const tab = tabRefs.current[activeIndex];
    const list = listRef.current;
    if (!tab || !list) return;

    const left = tab.offsetLeft;
    const tabWidth = tab.offsetWidth;

    // The first measurement is a jump, not an animation: a pill that slides in
    // from the left edge on mount looks like a bug, not a flourish.
    if (!measured.current || prefersReducedMotion) {
      measured.current = true;
      x.jump(left);
      width.jump(tabWidth);
      return;
    }

    x.set(left);
    width.set(tabWidth);
  }, [activeIndex, prefersReducedMotion, x, width]);

  useLayoutEffect(sync, [sync]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;

    // Fonts loading, a container resizing, a label changing — all move the
    // tabs under the pill without anything re-rendering.
    const observer = new ResizeObserver(sync);
    observer.observe(list);
    return () => observer.disconnect();
  }, [sync]);

  const select = (next: string) => {
    if (value === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      Home: -activeIndex,
      End: items.length - 1 - activeIndex,
    };
    const step = moves[event.key];
    if (step === undefined) return;

    event.preventDefault();
    const next = (activeIndex + step + items.length) % items.length;
    const target = items[next];
    if (!target) return;

    select(target.value);
    // Focus follows selection, which is what the tab pattern expects.
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation="horizontal"
      onKeyDown={handleKeyDown}
      className={cn(
        "relative isolate inline-flex items-center gap-1 rounded-full border bg-muted/50 p-1",
        className,
      )}
    >
      <motion.span
        aria-hidden="true"
        style={{ x, width, scaleX, scaleY }}
        className="absolute inset-y-1 left-0 -z-10 rounded-full bg-background shadow-subtle ring-1 ring-border/70"
      />

      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={item.value}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            // Roving tabindex: one stop for the whole group, then arrow keys.
            tabIndex={isActive ? 0 : -1}
            onClick={() => select(item.value)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export default LiquidTabs;

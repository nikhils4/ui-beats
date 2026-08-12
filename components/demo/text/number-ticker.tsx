"use client";

import {
  useInView,
  useMotionValueEvent,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef } from "react";

interface NumberTickerProps {
  /** The value to count to. */
  value: number;
  /** Where the count starts. */
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Count only the first time it scrolls into view. */
  once?: boolean;
  /** BCP 47 locale for grouping separators. */
  locale?: string;
  className?: string;
}

/**
 * A number that counts up when it scrolls into view.
 *
 * The animated digits are written straight to the DOM node rather than held
 * in state: a spring emits a value every frame, and re-rendering React sixty
 * times a second to print a number is wasted work.
 */
export function NumberTicker({
  value,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  once = true,
  locale = "en-US",
  className = "",
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -20% 0px" });
  const prefersReducedMotion = useReducedMotion();

  const spring = useSpring(from, {
    damping: 40,
    stiffness: 90,
    restDelta: decimals > 0 ? 0.001 : 0.5,
  });

  const format = (input: number) =>
    `${prefix}${new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(input)}${suffix}`;

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      spring.jump(value);
      return;
    }
    spring.set(value);
  }, [isInView, prefersReducedMotion, spring, value]);

  useMotionValueEvent(spring, "change", (latest) => {
    const node = ref.current;
    if (!node) return;
    // firstChild is the visible span; see the markup below.
    const visible = node.firstChild as HTMLElement | null;
    if (visible) visible.textContent = format(latest);
  });

  return (
    <span ref={ref} className={className}>
      {/* Only the settled value is announced. Without this, a screen reader
          would read out every intermediate number as the spring runs. */}
      <span aria-hidden="true" className="tabular-nums">
        {format(from)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}

export default NumberTicker;

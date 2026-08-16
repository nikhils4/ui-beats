"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface CardStackProps {
  /** One card per child. Each is given the stack's own card chrome. */
  children: ReactNode;
  /** How many cards are rendered, counting the one on top. */
  visible?: number;
  /** Vertical gap between each card and the one in front of it, in pixels. */
  offset?: number;
  /** How much smaller each card is than the one in front of it. */
  scaleStep?: number;
  /** Milliseconds between automatic advances. `0` turns autoplay off. */
  autoplay?: number;
  /** Distance, in pixels, a card must be dragged before it is dismissed. */
  dismissAt?: number;
  className?: string;
}

/**
 * A deck of cards you can throw away: drag the top one aside and it flies off,
 * the rest rise a step, and the dismissed card returns to the back of an
 * endless loop.
 *
 * Only `visible` cards are ever mounted, so a hundred-card deck costs the same
 * as a three-card one. Keys carry the lap number as well as the card index,
 * which is what lets a card leave and come back: without it a short deck would
 * find the dismissed card already in the window and shrink it into the stack
 * instead of dealing it away.
 */
export function CardStack({
  children,
  visible = 3,
  offset = 14,
  scaleStep = 0.05,
  autoplay = 0,
  dismissAt = 90,
  className = "",
}: CardStackProps) {
  const cards = Children.toArray(children);
  const prefersReducedMotion = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const dragging = useRef(false);

  const advance = useCallback(
    (towards: 1 | -1 = 1) => {
      if (cards.length === 0) return;
      setDirection(towards);
      setIndex((current) => (current + 1) % cards.length);
    },
    [cards.length],
  );

  /*
   * Autoplay pauses on hover, focus and drag.
   *
   * A deck that keeps dealing while someone is reading the card in front of
   * them, or halfway through dragging it, is actively working against them.
   */
  useEffect(() => {
    if (!autoplay || paused || cards.length < 2) return;
    const timer = setTimeout(() => advance(1), autoplay);
    return () => clearTimeout(timer);
  }, [autoplay, paused, advance, index, cards.length]);

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    dragging.current = false;
    setPaused(false);
    // A fast flick counts even if it did not travel far, which is how a throw
    // is supposed to feel.
    const thrown =
      Math.abs(info.offset.x) > dismissAt || Math.abs(info.velocity.x) > 500;
    if (thrown) advance(info.offset.x < 0 ? -1 : 1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    advance(event.key === "ArrowLeft" ? -1 : 1);
  };

  if (cards.length === 0) return null;

  const depth = Math.min(visible, cards.length);

  return (
    <div
      role="group"
      aria-roledescription="card stack"
      aria-label="Card stack. Use the arrow keys to advance."
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => !dragging.current && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn(
        "relative h-52 w-full max-w-sm rounded-xl",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:outline-none",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        {Array.from({ length: depth }, (_, position) => {
          const absolute = index + position;
          const card = absolute % cards.length;
          const lap = Math.floor(absolute / cards.length);
          const isTop = position === 0;

          return (
            <motion.div
              key={`${card}-${lap}`}
              // Front card on top of the pile, and above the ones behind it.
              style={{ zIndex: depth - position }}
              initial={{
                y: (position + 1) * offset,
                scale: 1 - (position + 1) * scaleStep,
                opacity: 0,
              }}
              animate={{
                x: 0,
                y: position * offset,
                scale: 1 - position * scaleStep,
                opacity: 1 - position * 0.15,
                rotate: 0,
              }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : {
                      x: direction * 340,
                      opacity: 0,
                      rotate: direction * 14,
                      transition: { duration: 0.32, ease: "easeOut" },
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 320, damping: 32 }
              }
              drag={isTop && cards.length > 1 ? "x" : false}
              // Zero-width constraints plus elasticity: the card resists as it
              // is pulled and springs home if it was not thrown hard enough.
              dragElastic={0.55}
              dragConstraints={{ left: 0, right: 0 }}
              onDragStart={() => {
                dragging.current = true;
                setPaused(true);
              }}
              onDragEnd={handleDragEnd}
              className={cn(
                "absolute inset-0 flex flex-col justify-between overflow-hidden rounded-xl",
                "border bg-card p-5 shadow-raised select-none",
                isTop && cards.length > 1
                  ? "cursor-grab active:cursor-grabbing"
                  : "pointer-events-none",
              )}
            >
              {cards[card]}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default CardStack;

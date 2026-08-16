"use client";

import { ChevronsLeftRight, ChevronsUpDown } from "lucide-react";
import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface ComparisonSliderProps {
  /** The layer revealed on the leading side of the divider. */
  before: ReactNode;
  /** The layer underneath, revealed as the divider moves across it. */
  after: ReactNode;
  /** Where the divider starts, 0 to 100. */
  defaultPosition?: number;
  orientation?: "horizontal" | "vertical";
  /** Accessible name for the divider. */
  label?: string;
  className?: string;
}

const clamp = (value: number) => Math.min(100, Math.max(0, value));

/**
 * Two layers stacked, with a divider the reader drags to compare them.
 *
 * The top layer is revealed with `clip-path` rather than a width. A clipped
 * layer is laid out at full size and only painted in part, so both sides stay
 * pinned to the same geometry. Resize a width instead and the top copy
 * reflows as it narrows, which turns a comparison of two designs into a
 * comparison of one design against itself at a different width.
 *
 * It is a real slider to anything that is not a mouse: `role="slider"` with a
 * live value, arrow keys for fine steps, Home and End for the extremes. A
 * comparison that can only be operated by dragging is one a keyboard user
 * cannot see the other half of.
 *
 * No Motion here. The divider tracks the pointer exactly, because anything
 * easing toward the cursor would feel broken, so the only animated case is a
 * keyboard step, which is a CSS transition that `motion-reduce` turns off.
 */
export function ComparisonSlider({
  before,
  after,
  defaultPosition = 50,
  orientation = "horizontal",
  label = "Compare before and after",
  className = "",
}: ComparisonSliderProps) {
  const [position, setPosition] = useState(clamp(defaultPosition));
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const isHorizontal = orientation === "horizontal";

  const positionFromPointer = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const frame = frameRef.current;
      if (!frame) return;

      const bounds = frame.getBoundingClientRect();
      const next = isHorizontal
        ? ((event.clientX - bounds.left) / bounds.width) * 100
        : ((event.clientY - bounds.top) / bounds.height) * 100;

      setPosition(clamp(next));
    },
    [isHorizontal],
  );

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    // Capture on the frame, so a drag that leaves the component still tracks
    // until the button is released.
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    positionFromPointer(event);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    positionFromPointer(event);
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = {
      ArrowLeft: -2,
      ArrowRight: 2,
      ArrowUp: -2,
      ArrowDown: 2,
      PageDown: -10,
      PageUp: 10,
    };

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setPosition(event.key === "Home" ? 0 : 100);
      return;
    }

    const step = steps[event.key];
    if (step === undefined) return;

    event.preventDefault();
    setPosition((current) => clamp(current + step));
  };

  // `inset()` trims from each edge, so the value is how much to hide.
  const clipPath = isHorizontal
    ? `inset(0 ${100 - position}% 0 0)`
    : `inset(0 0 ${100 - position}% 0)`;

  const Grip = isHorizontal ? ChevronsLeftRight : ChevronsUpDown;

  return (
    <div
      ref={frameRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className={cn(
        "relative touch-none overflow-hidden select-none",
        isHorizontal ? "cursor-ew-resize" : "cursor-ns-resize",
        className,
      )}
    >
      <div className="size-full">{after}</div>

      <div
        className={cn(
          "absolute inset-0",
          dragging
            ? ""
            : "transition-[clip-path] duration-150 ease-out motion-reduce:transition-none",
        )}
        style={{ clipPath }}
      >
        {before}
      </div>

      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-orientation={isHorizontal ? "horizontal" : "vertical"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={handleKeyDown}
        className={cn(
          "absolute flex items-center justify-center focus-visible:outline-none",
          isHorizontal
            ? "top-0 bottom-0 w-8 -translate-x-1/2"
            : "right-0 left-0 h-8 -translate-y-1/2",
          dragging
            ? ""
            : "transition-[left,top] duration-150 ease-out motion-reduce:transition-none",
        )}
        style={
          isHorizontal ? { left: `${position}%` } : { top: `${position}%` }
        }
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute bg-background/90",
            isHorizontal ? "inset-y-0 w-0.5" : "inset-x-0 h-0.5",
          )}
        />
        <span className="relative flex size-8 items-center justify-center rounded-full border bg-background text-foreground shadow-md">
          <Grip className="size-4" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

export default ComparisonSlider;

"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface ScratchToRevealProps {
  children: ReactNode;
  /** Width of the scratch area, in pixels. */
  width?: number;
  /** Height of the scratch area, in pixels. */
  height?: number;
  /** Radius of the scratching brush, in pixels. */
  brushSize?: number;
  /** Fraction (0–1) that must be cleared before the rest falls away. */
  threshold?: number;
  /** Foil gradient, from top-left to bottom-right. */
  coverFrom?: string;
  coverTo?: string;
  /** Prompt printed on the foil. Scratched away with everything else. */
  label?: string;
  /** Fired once, when the threshold is crossed. */
  onComplete?: () => void;
  className?: string;
}

/** Sample every 16th pixel — precise to well under a percent, 16× cheaper. */
const SAMPLE_STRIDE = 16;

/**
 * A scratch card: drag over the foil to rub it away and reveal what is under
 * it, which falls away on its own once enough has been cleared.
 *
 * Erasing is a canvas composite (`destination-out`) rather than a mask built
 * from tracked points, so the cost of a scratch is constant no matter how long
 * the user keeps dragging.
 *
 * The foil is also a keyboard target. A control that can only be operated by
 * dragging a pointer across it is unusable to anyone who does not have one, so
 * Enter and Space reveal the content outright.
 */
export function ScratchToReveal({
  children,
  width = 300,
  height = 200,
  brushSize = 22,
  threshold = 0.55,
  coverFrom = "#9ca3af",
  coverTo = "#4b5563",
  label = "Scratch here",
  onComplete,
  className = "",
}: ScratchToRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const moveCount = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Read through a ref so the drawing effect never re-runs when the parent
  // passes a new inline callback.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const finish = useCallback(() => {
    setRevealed((already) => {
      if (!already) onCompleteRef.current?.();
      return true;
    });
  }, []);

  /**
   * The drawing context, always requested with the same attributes.
   *
   * `willReadFrequently` has to be set on the call that *creates* the context —
   * later calls return the existing one and ignore their options — so asking
   * for it in only the read path would silently do nothing.
   */
  const getContext = () =>
    canvasRef.current?.getContext("2d", { willReadFrequently: true }) ?? null;

  /** Paint the foil. Re-runs if the card is resized or restyled. */
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !context) return;

    context.globalCompositeOperation = "source-over";

    // Back the canvas at device resolution so the scratched edge is crisp on
    // a retina screen, then work in CSS pixels for everything after.
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, coverFrom);
    gradient.addColorStop(1, coverTo);
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    // Diagonal hatching gives the foil a texture, so a partly scratched card
    // reads as a surface being removed rather than a shape being drawn.
    context.strokeStyle = "rgba(255, 255, 255, 0.07)";
    context.lineWidth = 6;
    for (let x = -height; x < width; x += 18) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x + height, height);
      context.stroke();
    }

    if (label) {
      context.fillStyle = "rgba(255, 255, 255, 0.85)";
      context.font =
        "600 13px ui-sans-serif, system-ui, -apple-system, sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(label, width / 2, height / 2);
    }
  }, [width, height, coverFrom, coverTo, label]);

  /** Share of the foil already erased, from the canvas' own alpha channel. */
  const clearedFraction = () => {
    const canvas = canvasRef.current;
    const context = getContext();
    if (!canvas || !context) return 0;

    const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    let total = 0;

    for (let i = 3; i < data.length; i += 4 * SAMPLE_STRIDE) {
      total++;
      if ((data[i] ?? 0) < 128) cleared++;
    }

    return total === 0 ? 0 : cleared / total;
  };

  const scratch = (x: number, y: number) => {
    const context = getContext();
    if (!context) return;

    context.globalCompositeOperation = "destination-out";
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = brushSize * 2;
    // Under `destination-out` it is the *source alpha* that erases, and the
    // context still holds the translucent white the foil's hatching and label
    // were painted with — leaving it would rub away 7% of the foil per stroke.
    context.strokeStyle = "#000";
    context.fillStyle = "#000";

    const from = lastPoint.current ?? { x, y };
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(x, y);
    context.stroke();

    // A dot as well as the segment, so a tap with no movement still erases.
    context.beginPath();
    context.arc(x, y, brushSize, 0, Math.PI * 2);
    context.fill();

    lastPoint.current = { x, y };
  };

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    // Capture keeps the scratch going when the pointer leaves the card
    // mid-drag, instead of stranding a half-finished stroke.
    event.currentTarget.setPointerCapture(event.pointerId);
    lastPoint.current = null;

    const bounds = event.currentTarget.getBoundingClientRect();
    scratch(event.clientX - bounds.left, event.clientY - bounds.top);
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (revealed || !event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    scratch(event.clientX - bounds.left, event.clientY - bounds.top);

    // Reading pixels back is the expensive half of this component, so it runs
    // on every eighth move rather than every one.
    if (++moveCount.current % 8 === 0 && clearedFraction() >= threshold) {
      finish();
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    lastPoint.current = null;
    if (!revealed && clearedFraction() >= threshold) finish();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLCanvasElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    finish();
  };

  return (
    <div
      style={{ width, height }}
      className={cn(
        "relative isolate overflow-hidden rounded-xl border bg-card shadow-subtle",
        className,
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>

      <motion.canvas
        ref={canvasRef}
        role="button"
        tabIndex={revealed ? -1 : 0}
        aria-label={revealed ? "Revealed" : "Scratch to reveal"}
        aria-pressed={revealed}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        style={{ width, height, touchAction: "none" }}
        animate={{ opacity: revealed ? 0 : 1, scale: revealed ? 1.06 : 1 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.5, ease: "easeOut" }
        }
        className={cn(
          "absolute inset-0 rounded-[inherit]",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          revealed ? "pointer-events-none" : "cursor-crosshair",
        )}
      />
    </div>
  );
}

export default ScratchToReveal;

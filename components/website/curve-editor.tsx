"use client";

import { useCallback, useRef } from "react";
import { clampHandle, type CurvePoint } from "@/lib/easing";
import { cn } from "@/lib/utils";

/**
 * The draggable cubic-bezier plot.
 *
 * Data space is the unit square: (0,0) bottom-left, (1,1) top-right. The
 * viewBox is taller than the square on both sides so a curve that overshoots
 * (`back-out`) or dips below zero (`anticipate`) stays visible instead of
 * being clipped at the frame.
 */

const SIZE = 100;
const BASE = 130;

const toSvgX = (x: number) => x * SIZE;
const toSvgY = (y: number) => BASE - y * SIZE;

interface CurveEditorProps {
  points: [number, number, number, number];
  curve: CurvePoint[];
  /** Spring curves are computed, not dragged, so the handles are hidden. */
  editable?: boolean;
  onChange?: (points: [number, number, number, number]) => void;
  className?: string;
}

export function CurveEditor({
  points,
  curve,
  editable = true,
  onChange,
  className,
}: CurveEditorProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [x1, y1, x2, y2] = points;

  const path = curve
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${toSvgX(point.x).toFixed(2)} ${toSvgY(point.y).toFixed(2)}`,
    )
    .join(" ");

  /** Client coordinates to data coordinates, via the SVG's own screen matrix. */
  const toData = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;

    const screenPoint = svg.createSVGPoint();
    screenPoint.x = clientX;
    screenPoint.y = clientY;

    const matrix = svg.getScreenCTM()?.inverse();
    if (!matrix) return null;

    const local = screenPoint.matrixTransform(matrix);
    return { x: local.x / SIZE, y: (BASE - local.y) / SIZE };
  }, []);

  const drag = useCallback(
    (handle: 1 | 2) => (event: React.PointerEvent<SVGGElement>) => {
      if (!editable || !onChange) return;
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);

      const move = (moveEvent: PointerEvent) => {
        const data = toData(moveEvent.clientX, moveEvent.clientY);
        if (!data) return;
        const [x, y] = clampHandle(data.x, data.y);
        onChange(handle === 1 ? [x, y, x2, y2] : [x1, y1, x, y]);
      };

      const stop = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", stop);
      };

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", stop);
    },
    [editable, onChange, toData, x1, y1, x2, y2],
  );

  /** Arrow keys nudge a handle, so the editor is not pointer-only. */
  const nudge = useCallback(
    (handle: 1 | 2) => (event: React.KeyboardEvent) => {
      if (!editable || !onChange) return;

      const step = event.shiftKey ? 0.1 : 0.01;
      const deltas: Record<string, [number, number]> = {
        ArrowLeft: [-step, 0],
        ArrowRight: [step, 0],
        ArrowUp: [0, step],
        ArrowDown: [0, -step],
      };

      const delta = deltas[event.key];
      if (!delta) return;
      event.preventDefault();

      const current = handle === 1 ? [x1, y1] : [x2, y2];
      const [x, y] = clampHandle(
        current[0]! + delta[0],
        current[1]! + delta[1],
      );
      onChange(handle === 1 ? [x, y, x2, y2] : [x1, y1, x, y]);
    },
    [editable, onChange, x1, y1, x2, y2],
  );

  const handles: { key: 1 | 2; x: number; y: number }[] = [
    { key: 1, x: x1, y: y1 },
    { key: 2, x: x2, y: y2 },
  ];

  return (
    <svg
      ref={svgRef}
      /*
        Tuned so the unit square stays large.
        This was `-10 -52 120 264` — over twice as tall as it was wide, which
        meant any height cap shrank the whole drawing to a sliver and the plot
        rendered about as big as a postage stamp. The vertical padding now
        covers the range handles can actually reach (-0.5 to 1.5) and no more.
      */
      viewBox="-14 -22 128 204"
      className={cn("mx-auto w-full touch-none select-none", className)}
      role="img"
      aria-label="Easing curve"
    >
      {/* The unit square the curve is measured against. */}
      <rect
        x={0}
        y={toSvgY(1)}
        width={SIZE}
        height={SIZE}
        className="fill-muted/30 stroke-border"
        strokeWidth={0.5}
      />
      {[0.25, 0.5, 0.75].map((tick) => (
        <g key={tick} className="stroke-border/50" strokeWidth={0.4}>
          <line
            x1={toSvgX(tick)}
            y1={toSvgY(0)}
            x2={toSvgX(tick)}
            y2={toSvgY(1)}
          />
          <line x1={0} y1={toSvgY(tick)} x2={SIZE} y2={toSvgY(tick)} />
        </g>
      ))}

      {/* Linear reference, so the shape of the curve is readable at a glance. */}
      <line
        x1={toSvgX(0)}
        y1={toSvgY(0)}
        x2={toSvgX(1)}
        y2={toSvgY(1)}
        className="stroke-border"
        strokeWidth={0.5}
        strokeDasharray="3 3"
      />

      <path
        d={path}
        fill="none"
        className="stroke-brand"
        strokeWidth={2}
        strokeLinecap="round"
      />

      {editable ? (
        <>
          {handles.map(({ key, x, y }) => (
            <line
              key={`leash-${key}`}
              x1={toSvgX(key === 1 ? 0 : 1)}
              y1={toSvgY(key === 1 ? 0 : 1)}
              x2={toSvgX(x)}
              y2={toSvgY(y)}
              className="stroke-brand/40"
              strokeWidth={1}
            />
          ))}

          {handles.map(({ key, x, y }) => (
            <g
              key={`handle-${key}`}
              role="slider"
              tabIndex={0}
              aria-label={`Control point ${key}`}
              aria-valuetext={`x ${x.toFixed(2)}, y ${y.toFixed(2)}`}
              onPointerDown={drag(key)}
              onKeyDown={nudge(key)}
              className="cursor-grab outline-none active:cursor-grabbing [&:focus-visible>circle:last-child]:stroke-[3]"
            >
              {/* A generous invisible target: the visible dot is 4 units wide,
                  which is a very small thing to hit with a finger. */}
              <circle cx={toSvgX(x)} cy={toSvgY(y)} r={10} fill="transparent" />
              {/* Focus is drawn as a ring rather than a radius change: `r` is
                  an SVG attribute, not something a Tailwind variant can set. */}
              <circle
                cx={toSvgX(x)}
                cy={toSvgY(y)}
                r={4}
                className="fill-background stroke-brand"
                strokeWidth={2}
              />
            </g>
          ))}
        </>
      ) : null}
    </svg>
  );
}

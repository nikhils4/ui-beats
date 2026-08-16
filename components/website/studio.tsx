"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Play, RotateCcw, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentPicker } from "@/components/website/component-picker";
import { CurveEditor } from "@/components/website/curve-editor";
import { PlaygroundControls } from "@/components/website/playground-controls";
import { PlaygroundSnippet } from "@/components/website/playground-snippet";
import { playgroundHarnesses } from "@/components/website/playground-harnesses";
import { generateSnippet, initialValues, isDirty } from "@/lib/playground";
import {
  SPRING_PRESETS,
  TWEEN_PRESETS,
  cssSnippet,
  matchPreset,
  motionSnippet,
  sampleSpring,
  sampleTween,
  springOvershoot,
  type EasingMode,
  type SpringSettings,
} from "@/lib/easing";
import { cn } from "@/lib/utils";
import type {
  PlaygroundConfig,
  PlaygroundControl,
  PlaygroundValues,
} from "@/types/playground.type";

/**
 * The studio: one full-page tool for both halves of tuning a component.
 *
 * This replaces two smaller things that sat in tabs on a narrow page: a props
 * playground and a separate easing editor, each squeezed into half the width
 * they wanted. The canvas now gets the whole page and every control lives in
 * one rail on the right, which is also what makes swapping the component a
 * one-click move rather than a navigation.
 */

export interface StudioComponent {
  name: string;
  category: string;
  title: string;
  href: string;
  fullBleed: boolean;
  config: PlaygroundConfig;
  controls: PlaygroundControl[];
}

const DEFAULT_TWEEN: [number, number, number, number] = [0.22, 1, 0.36, 1];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors",
        active
          ? "border-brand/40 bg-brand-subtle text-brand"
          : "border-border/70 text-muted-foreground hover:border-brand/30 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="font-mono text-xs font-medium">{label}</span>
        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
          {value}
          {unit ?? ""}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-brand"
      />
    </label>
  );
}

interface StudioProps {
  components: StudioComponent[];
  /** `category/name` to open with. Defaults to the first component. */
  initial?: string;
  className?: string;
}

export function Studio({ components, initial, className }: StudioProps) {
  const keyOf = (item: StudioComponent) => `${item.category}/${item.name}`;

  const [selected, setSelected] = useState(
    () => initial ?? (components[0] ? keyOf(components[0]) : ""),
  );
  const [tab, setTab] = useState<"props" | "motion">("props");

  /*
   * Values are held per component rather than reset on every switch, so
   * flicking between two components to compare them does not throw away the
   * settings you just dialled in on the first one.
   */
  const [valuesByKey, setValuesByKey] = useState<
    Record<string, PlaygroundValues>
  >({});

  const [mode, setMode] = useState<EasingMode>("tween");
  const [points, setPoints] =
    useState<[number, number, number, number]>(DEFAULT_TWEEN);
  const [duration, setDuration] = useState(0.6);
  const [spring, setSpring] = useState<SpringSettings>({
    stiffness: 260,
    damping: 20,
    mass: 1,
  });
  const [runId, setRunId] = useState(0);

  const component = components.find((item) => keyOf(item) === selected);
  const defaults = useMemo(
    () => (component ? initialValues(component.controls) : {}),
    [component],
  );
  const values = valuesByKey[selected] ?? defaults;

  const setValue = (prop: string, value: string | number | boolean) =>
    setValuesByKey((current) => ({
      ...current,
      [selected]: { ...(current[selected] ?? defaults), [prop]: value },
    }));

  const springSample = useMemo(() => sampleSpring(spring), [spring]);
  const curve = useMemo(
    () => (mode === "spring" ? springSample.points : sampleTween(points)),
    [mode, points, springSample.points],
  );
  const preset = mode === "tween" ? matchPreset(points) : null;
  const overshoot = springOvershoot(springSample.points);

  const transition =
    mode === "spring"
      ? { type: "spring" as const, ...spring }
      : { duration, ease: points };

  const componentSnippet = component
    ? generateSnippet(component.config, component.controls, values)
    : "";
  const dirty = component ? isDirty(component.controls, values) : false;

  const Harness = playgroundHarnesses[selected];

  return (
    /*
     * On desktop the studio is a fixed-height app, not a document: the parent
     * gives it whatever is left under the site header, and nothing here
     * scrolls the page. The canvas takes the slack, the snippet is pinned to
     * the bottom of it, and the config rail scrolls inside itself. Below `lg`
     * this all falls back to normal flow, because a stage plus a rail plus a
     * snippet cannot share a phone screen.
     */
    <div
      className={cn(
        "grid min-w-0 gap-0",
        "lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem]",
        "lg:h-full lg:overflow-hidden",
        className,
      )}
    >
      {/* ---------------------------------------------------------------- */}
      {/* Canvas                                                            */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex min-w-0 flex-col gap-4 p-4 sm:p-6 lg:min-h-0 lg:p-6">
        {tab === "props" ? (
          <div className="relative h-[26rem] w-full max-w-full shrink-0 overflow-hidden rounded-2xl border bg-card shadow-subtle lg:h-auto lg:min-h-0 lg:flex-1">
            {!component?.fullBleed ? (
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)] opacity-60"
              />
            ) : null}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Replay animation"
              onClick={() => setRunId((id) => id + 1)}
              className="absolute top-3 right-3 z-20 size-8 text-muted-foreground hover:text-foreground"
            >
              <RotateCw className="size-4" />
            </Button>

            <div
              className={cn(
                "relative z-10 flex size-full",
                component?.fullBleed
                  ? ""
                  : "items-center justify-center p-6 sm:p-10",
              )}
            >
              {Harness ? (
                <Harness
                  key={`${selected}-${runId}-${componentSnippet}`}
                  values={values}
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  No preview for this component.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-2">
            <div className="flex flex-col rounded-2xl border bg-card p-4 shadow-subtle lg:min-h-0">
              <div className="mb-2 flex items-center justify-between gap-2">
                <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Curve
                </h2>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {mode === "spring"
                    ? `${springSample.duration.toFixed(2)}s${overshoot > 0.01 ? ` · +${Math.round(overshoot * 100)}%` : ""}`
                    : (preset ?? "custom")}
                </span>
              </div>
              {/* `min-h-0` so the SVG shrinks to the space it is given rather
                  than forcing the card past the bottom of the screen. */}
              <div className="flex min-h-0 flex-1 items-center justify-center">
                <CurveEditor
                  points={points}
                  curve={curve}
                  editable={mode === "tween"}
                  onChange={setPoints}
                  className="max-h-full"
                />
              </div>
              <p className="mt-1 shrink-0 text-center text-[11px] text-muted-foreground">
                {mode === "spring"
                  ? "Simulated from the physics on the right."
                  : "Drag a handle, or focus one and use the arrow keys."}
              </p>
            </div>

            <div className="flex flex-col rounded-2xl border bg-card p-4 shadow-subtle lg:min-h-0 lg:overflow-y-auto">
              <div className="mb-4 flex shrink-0 items-center justify-between gap-2">
                <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Preview
                </h2>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setRunId((id) => id + 1)}
                  className="h-7 gap-1.5 px-2 text-xs"
                >
                  <Play className="size-3" />
                  Replay
                </Button>
              </div>

              {/* Centred in whatever height is left, rather than stacked at
                  the top of a tall card with dead space under them. */}
              <div
                key={runId}
                className="flex min-h-0 flex-1 flex-col justify-center gap-5"
              >
                <div className="relative h-11 shrink-0 rounded-lg bg-muted/40">
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "calc(100% - 2.75rem)" }}
                    transition={transition}
                    className="absolute top-1.5 left-1.5 flex size-8 items-center justify-center rounded-md bg-brand text-xs font-bold text-brand-foreground"
                  >
                    →
                  </motion.div>
                </div>

                <div className="flex h-24 items-center justify-center rounded-lg bg-muted/40">
                  <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={transition}
                    className="size-14 rounded-xl bg-brand shadow-brand"
                  />
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-muted/40">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={transition}
                    className="h-full origin-left rounded-full bg-gradient-to-r from-brand to-accent-pink"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pinned under the canvas. Capped and scrollable so a long snippet
            grows a scrollbar of its own instead of pushing the stage off the
            top of the screen. */}
        <div className="grid min-w-0 shrink-0 gap-4 lg:max-h-[13rem] lg:grid-cols-2">
          {tab === "props" ? (
            <PlaygroundSnippet
              code={componentSnippet}
              title={`${component?.title ?? "Component"}: your configuration`}
              className="lg:col-span-2 lg:overflow-y-auto"
            />
          ) : (
            <>
              <PlaygroundSnippet
                code={motionSnippet(mode, { points, duration }, spring)}
                title="Motion"
                className="lg:overflow-y-auto"
              />
              <PlaygroundSnippet
                code={cssSnippet(mode, { points, duration }, spring)}
                title="CSS"
                className="lg:overflow-y-auto"
              />
            </>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Config rail                                                       */}
      {/* ---------------------------------------------------------------- */}
      <aside className="min-w-0 border-t bg-card/40 lg:min-h-0 lg:border-t-0 lg:border-l">
        <div className="lg:h-full lg:overflow-y-auto">
          <div className="space-y-5 p-4 sm:p-6">
            {/* Component picker */}
            <div>
              <p className="mb-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Component
              </p>
              <ComponentPicker
                items={components}
                value={selected}
                onChange={setSelected}
              />

              {component ? (
                <Link
                  href={component.href}
                  className="group mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Open the docs
                  <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ) : null}
            </div>

            {/* Props / Motion */}
            <div
              role="tablist"
              aria-label="What to tune"
              className="grid grid-cols-2 gap-1 rounded-lg bg-muted/60 p-1"
            >
              {(["props", "motion"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={tab === value}
                  onClick={() => setTab(value)}
                  className={cn(
                    "rounded-md px-2 py-1.5 text-xs font-medium capitalize transition-colors",
                    tab === value
                      ? "bg-background text-foreground shadow-subtle"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {value === "motion" ? "Motion" : "Props"}
                </button>
              ))}
            </div>

            {tab === "props" ? (
              component ? (
                <div>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                      {component.controls.length} props
                    </h2>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={!dirty}
                      onClick={() =>
                        setValuesByKey((current) => ({
                          ...current,
                          [selected]: defaults,
                        }))
                      }
                      className="h-7 gap-1.5 px-2 text-xs"
                    >
                      <RotateCcw className="size-3" />
                      Reset
                    </Button>
                  </div>
                  <PlaygroundControls
                    controls={component.controls}
                    values={values}
                    onChange={setValue}
                  />
                </div>
              ) : null
            ) : (
              <div className="space-y-5">
                <div
                  role="tablist"
                  aria-label="Easing type"
                  className="grid grid-cols-2 gap-1 rounded-lg border p-1"
                >
                  {(["tween", "spring"] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="tab"
                      aria-selected={mode === value}
                      onClick={() => setMode(value)}
                      className={cn(
                        "rounded-md px-2 py-1.5 text-xs font-medium capitalize transition-colors",
                        mode === value
                          ? "bg-brand-subtle text-brand"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {value}
                    </button>
                  ))}
                </div>

                {mode === "tween" ? (
                  <>
                    <div>
                      <p className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                        Presets
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {TWEEN_PRESETS.map((item) => (
                          <Chip
                            key={item.name}
                            active={preset === item.name}
                            onClick={() => setPoints(item.points)}
                          >
                            {item.name}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    <Slider
                      label="duration"
                      value={duration}
                      min={0.05}
                      max={3}
                      step={0.05}
                      unit="s"
                      onChange={setDuration}
                    />

                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t pt-4 font-mono text-[11px]">
                      {(["x1", "y1", "x2", "y2"] as const).map(
                        (axis, index) => (
                          <div key={axis} className="flex justify-between">
                            <dt className="text-muted-foreground">{axis}</dt>
                            <dd className="tabular-nums">
                              {points[index]!.toFixed(2)}
                            </dd>
                          </div>
                        ),
                      )}
                    </dl>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                        Presets
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {SPRING_PRESETS.map((item) => (
                          <Chip
                            key={item.name}
                            active={
                              item.settings.stiffness === spring.stiffness &&
                              item.settings.damping === spring.damping &&
                              item.settings.mass === spring.mass
                            }
                            onClick={() => setSpring(item.settings)}
                          >
                            {item.name}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    <Slider
                      label="stiffness"
                      value={spring.stiffness}
                      min={20}
                      max={800}
                      step={10}
                      onChange={(stiffness) =>
                        setSpring((current) => ({ ...current, stiffness }))
                      }
                    />
                    <Slider
                      label="damping"
                      value={spring.damping}
                      min={2}
                      max={60}
                      step={1}
                      onChange={(damping) =>
                        setSpring((current) => ({ ...current, damping }))
                      }
                    />
                    <Slider
                      label="mass"
                      value={spring.mass}
                      min={0.2}
                      max={5}
                      step={0.1}
                      onChange={(mass) =>
                        setSpring((current) => ({ ...current, mass }))
                      }
                    />

                    <p className="border-t pt-4 text-[11px] leading-snug text-muted-foreground">
                      Less damping bounces. More stiffness arrives sooner. Mass
                      is inertia. Raise it and everything feels heavier.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

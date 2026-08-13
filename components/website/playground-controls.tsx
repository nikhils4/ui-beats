"use client";

import { useId } from "react";
import { PropSelect } from "@/components/website/prop-select";
import { cn } from "@/lib/utils";
import type {
  PlaygroundControl,
  PlaygroundValues,
} from "@/types/playground.type";

/**
 * The control panel for a component playground.
 *
 * Built on native `input`/`select` rather than another Radix primitive: a
 * range, a checkbox and a select are already accessible, already keyboard
 * operable, and already themeable through `accent-color`. Three more
 * dependencies to re-implement them would ship more JavaScript to a docs page
 * than the components being demonstrated.
 */

/** Trim float noise: 0.30000000000000004 -> 0.3. */
function formatNumber(value: number, step: number): string {
  const decimals = step < 1 ? (String(step).split(".")[1]?.length ?? 2) : 0;
  return value.toFixed(decimals).replace(/\.?0+$/, "") || "0";
}

interface FieldProps {
  htmlFor: string;
  label: string;
  description: string;
  hint?: string;
  children: React.ReactNode;
}

function Field({ htmlFor, label, description, hint, children }: FieldProps) {
  return (
    <div className="min-w-0">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label
          htmlFor={htmlFor}
          className="font-mono text-xs font-medium text-foreground"
        >
          {label}
        </label>
        {hint ? (
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
      {/* Repeating the documented prose keeps the panel self-explanatory
          without making the reader look back up at the props table. */}
      <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border bg-background px-2.5 py-1.5 font-mono text-xs shadow-subtle outline-none transition-colors focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30";

interface ControlRowProps {
  control: PlaygroundControl;
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
}

function ControlRow({ control, value, onChange }: ControlRowProps) {
  const id = useId();

  switch (control.kind) {
    case "select":
      return (
        <Field
          htmlFor={id}
          label={control.prop}
          description={control.description}
        >
          <PropSelect
            id={id}
            value={String(value)}
            options={control.options}
            onChange={onChange}
          />
        </Field>
      );

    case "boolean":
      return (
        <div className="min-w-0">
          <label
            htmlFor={id}
            className="flex cursor-pointer items-center justify-between gap-3"
          >
            <span className="font-mono text-xs font-medium">
              {control.prop}
            </span>
            <input
              id={id}
              type="checkbox"
              checked={Boolean(value)}
              onChange={(event) => onChange(event.target.checked)}
              className="size-4 shrink-0 accent-brand"
            />
          </label>
          <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
            {control.description}
          </p>
        </div>
      );

    case "number":
      return (
        <Field
          htmlFor={id}
          label={control.prop}
          description={control.description}
          hint={`${formatNumber(Number(value), control.step)}${control.unit ?? ""}`}
        >
          <input
            id={id}
            type="range"
            min={control.min}
            max={control.max}
            step={control.step}
            value={Number(value)}
            onChange={(event) => onChange(Number(event.target.value))}
            className="w-full accent-brand"
          />
        </Field>
      );

    case "color":
      return (
        <Field
          htmlFor={id}
          label={control.prop}
          description={control.description}
        >
          <div className="flex items-center gap-2">
            <input
              id={id}
              type="color"
              value={String(value)}
              onChange={(event) => onChange(event.target.value)}
              className="size-8 shrink-0 cursor-pointer rounded-lg border bg-background p-0.5"
            />
            <input
              type="text"
              aria-label={`${control.prop} hex value`}
              value={String(value)}
              onChange={(event) => onChange(event.target.value)}
              className={cn(inputClass, "flex-1")}
            />
          </div>
        </Field>
      );

    case "text":
      return (
        <Field
          htmlFor={id}
          label={control.prop}
          description={control.description}
        >
          <input
            id={id}
            type="text"
            value={String(value)}
            onChange={(event) => onChange(event.target.value)}
            className={inputClass}
          />
        </Field>
      );
  }
}

interface PlaygroundControlsProps {
  controls: PlaygroundControl[];
  values: PlaygroundValues;
  onChange: (prop: string, value: string | number | boolean) => void;
  className?: string;
}

export function PlaygroundControls({
  controls,
  values,
  onChange,
  className,
}: PlaygroundControlsProps) {
  return (
    <div className={cn("space-y-5", className)}>
      {controls.map((control) => (
        <ControlRow
          key={control.prop}
          control={control}
          value={values[control.prop] ?? control.value}
          onChange={(next) => onChange(control.prop, next)}
        />
      ))}
    </div>
  );
}

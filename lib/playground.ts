import type { ComponentProps, ElementType } from "react";
import type { ComponentProp } from "@/types/component-config.type";
import type {
  NumberControlOverride,
  PlaygroundConfig,
  PlaygroundControl,
  PlaygroundOverrides,
  PlaygroundValues,
} from "@/types/playground.type";

/**
 * Turning a documented props table into a working control panel.
 *
 * The props table is already the single source of truth for a component's API,
 * so the playground reads it rather than duplicating it. That means a control
 * cannot drift from the documented prop: change the type in the content file
 * and the control changes with it.
 *
 * Deliberately dependency-free and pure so it can be unit tested and run in
 * either a server or client component.
 */

/**
 * Props no control should offer.
 *
 * `className` and `style` are escape hatches, not API. A text box for
 * arbitrary Tailwind is a worse editor than the user's own, and it would let a
 * generated snippet carry classes the component never documented.
 */
const ALWAYS_EXCLUDED = new Set([
  "children",
  "className",
  "style",
  "ref",
  "key",
  "id",
]);

/** Type strings that describe something a slider or a select cannot express. */
const UNSUPPORTED_TYPE =
  /=>|\bRef\b|RefObject|ReactNode|ReactElement|JSX\.|\{|\[\]|\bany\b|\bunknown\b|Element|Component/;

/** Placeholders the content files use for "no default". */
const NO_DEFAULT = new Set(["", "-", "--", "–", "—", "none", "n/a"]);

const REQUIRED_SUFFIX = /\s*\(required\)\.?\s*$/i;

function unquote(value: string): string {
  const trimmed = value.trim();
  const match = /^(['"`])(.*)\1$/s.exec(trimmed);
  return match?.[2] ?? trimmed;
}

function hasDefault(prop: ComponentProp): boolean {
  return !NO_DEFAULT.has(prop.defaultValue.trim().toLowerCase());
}

/** `'a' | 'b' | 'c'` -> `["a", "b", "c"]`, or null if the type is not a union. */
function parseUnion(type: string): string[] | null {
  const parts = type.split("|").map((part) => part.trim());
  if (parts.length < 2) return null;

  const options: string[] = [];
  for (const part of parts) {
    // Only string-literal unions become a select. A union with `undefined` or
    // a non-literal member is not a closed set of choices.
    if (!/^(['"`]).*\1$/s.test(part)) return null;
    options.push(unquote(part));
  }
  return options;
}

/**
 * A sensible range for a numeric prop, inferred from what it is called.
 *
 * A single generic 0–100 slider makes `duration` unusable (every useful value
 * sits in the first two percent) and `opacity` meaningless. The prop name is
 * the only signal available, and in practice it is a reliable one.
 */
function inferRange(
  prop: string,
  value: number,
): { min: number; max: number; step: number; unit?: string } {
  const name = prop.toLowerCase();

  if (/opacity|amount|threshold|intensity|strength|damping/.test(name)) {
    return { min: 0, max: 1, step: 0.01 };
  }
  if (/duration|delay|stagger|interval|stiffness$/.test(name)) {
    return { min: 0, max: 4, step: 0.05, unit: "s" };
  }
  if (/decimal|digits/.test(name)) {
    return { min: 0, max: 4, step: 1 };
  }
  if (/rotat|angle|degree|tilt|skew/.test(name)) {
    return { min: -180, max: 180, step: 1, unit: "°" };
  }
  if (/speed/.test(name)) {
    return { min: 0, max: 200, step: 5 };
  }
  if (
    /blur|radius|spread|gap|spacing|offset|distance|size|width|height/.test(
      name,
    )
  ) {
    const max = Math.max(100, Math.ceil(Math.abs(value) * 4));
    return { min: 0, max, step: max > 200 ? 5 : 1, unit: "px" };
  }
  if (/count|columns|rows|items|repeat|copies|max|min/.test(name)) {
    return { min: 1, max: Math.max(20, Math.ceil(value * 3)), step: 1 };
  }
  if (/^(x|y|translatex|translatey)$/.test(name)) {
    return { min: -200, max: 200, step: 4, unit: "px" };
  }

  // Fall back to a window around the default rather than a fixed 0–100, so a
  // prop defaulting to 0.3 is still adjustable.
  if (value > 0 && value <= 1) return { min: 0, max: 1, step: 0.01 };
  const max = value > 0 ? Math.ceil(value * 4) : 100;
  return { min: 0, max, step: max <= 10 ? 0.1 : 1 };
}

function applyOverride(
  range: { min: number; max: number; step: number; unit?: string },
  override: NumberControlOverride | undefined,
) {
  if (!override) return range;
  return {
    min: override.min ?? range.min,
    max: override.max ?? range.max,
    step: override.step ?? range.step,
    unit: override.unit ?? range.unit,
  };
}

function isColorProp(prop: string, defaultValue: string): boolean {
  if (!/colou?r/i.test(prop)) return false;
  // `<input type="color">` only accepts hex, so a named colour or a CSS
  // gradient stays a text field rather than silently snapping to black.
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(unquote(defaultValue));
}

/** Build one control, or null if the prop cannot be represented by one. */
function toControl(
  prop: ComponentProp,
  config: PlaygroundConfig,
): PlaygroundControl | null {
  if (ALWAYS_EXCLUDED.has(prop.prop)) return null;
  if (config.exclude?.includes(prop.prop)) return null;
  // Some props tables document a sub-component's API in the same table, with
  // rows named like "DockItem: label". Those are prose, not props of this
  // component, and emitting one produced `<Dock DockItem: label="" >`: JSX
  // that does not parse. Anything that is not a plain identifier is not a prop.
  if (!/^[A-Za-z_$][\w$]*$/.test(prop.prop)) return null;

  const type = prop.type.trim();
  const description = prop.description.replace(REQUIRED_SUFFIX, "").trim();
  // What the playground opens on when the docs give no default, which is the
  // normal case for a required prop.
  const seed = config.defaults?.[prop.prop];

  const base = {
    prop: prop.prop,
    description,
    /*
     * "Must appear in the generated snippet."
     *
     * That is the documented required props, plus any prop the docs give no
     * default for that needed a starting value configured: a component that
     * cannot render without one is required in practice however its
     * description is worded. Split Flap is the case in point: its `text` is
     * not marked required, but `<SplitFlap />` displays nothing.
     */
    required:
      REQUIRED_SUFFIX.test(prop.description) ||
      (!hasDefault(prop) && seed !== undefined),
  };

  const options = parseUnion(type);
  if (options) {
    const fallback = options[0] ?? "";
    return {
      ...base,
      kind: "select",
      options,
      value: hasDefault(prop)
        ? unquote(prop.defaultValue)
        : (String(seed ?? fallback) as string),
    };
  }

  if (UNSUPPORTED_TYPE.test(type)) return null;

  if (/^boolean$/i.test(type)) {
    return {
      ...base,
      kind: "boolean",
      value: hasDefault(prop)
        ? unquote(prop.defaultValue) === "true"
        : Boolean(seed ?? false),
    };
  }

  if (/^number$/i.test(type)) {
    const parsed = hasDefault(prop)
      ? Number(unquote(prop.defaultValue))
      : Number(seed);
    const value = Number.isFinite(parsed) ? parsed : 0;
    const range = applyOverride(
      inferRange(prop.prop, value),
      config.ranges?.[prop.prop],
    );
    // A default outside the inferred window would sit pinned at one end.
    return {
      ...base,
      kind: "number",
      value,
      ...range,
      min: Math.min(range.min, value),
      max: Math.max(range.max, value),
    };
  }

  if (/^string$/i.test(type)) {
    const value = hasDefault(prop)
      ? unquote(prop.defaultValue)
      : String(seed ?? "");
    return isColorProp(prop.prop, prop.defaultValue)
      ? { ...base, kind: "color", value }
      : { ...base, kind: "text", value };
  }

  return null;
}

export function deriveControls(
  props: ComponentProp[],
  config: PlaygroundConfig,
): PlaygroundControl[] {
  return props
    .map((prop) => toControl(prop, config))
    .filter((control): control is PlaygroundControl => control !== null);
}

/**
 * Hand live control values to the component they were derived from.
 *
 * Every control is built from that component's own documented props, so the
 * shape is correct by construction, but the derivation happens at runtime
 * from strings, which the type system cannot follow. Stating the cast once
 * here keeps it out of all thirty-four harnesses, and keeps the component
 * itself inferring the target type rather than each harness restating it.
 */
export function asProps<C extends ElementType>(
  _component: C,
  values: PlaygroundValues,
): ComponentProps<C> {
  return values as unknown as ComponentProps<C>;
}

/** The initial value of every control, as the playground's starting state. */
export function initialValues(controls: PlaygroundControl[]): PlaygroundValues {
  return Object.fromEntries(
    controls.map((control) => [control.prop, control.value]),
  );
}

/**
 * A control's current value, as the number the reader should see beside it.
 *
 * The step decides the precision: a 0.05 slider reporting
 * `0.30000000000000004` is float noise, not information.
 *
 * Trailing zeros are dropped only from a fractional part. Applying
 * `/\.?0+$/` to the whole string, which is what this did, also ate the
 * zeros of an integer, so a slider sitting at 90 read "9px" and one at 100
 * read "1px". Every round number in the studio was labelled as a different
 * number, on every numeric control in the library.
 */
export function formatNumber(value: number, step: number): string {
  const decimals = step < 1 ? (String(step).split(".")[1]?.length ?? 2) : 0;
  const fixed = value.toFixed(decimals);
  return decimals === 0 ? fixed : fixed.replace(/\.?0+$/, "") || "0";
}

/** `"a \"quoted\" string"`, safe inside a JSX double-quoted attribute. */
function jsxString(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, "&quot;")}"`;
}

function formatAttribute(
  control: PlaygroundControl,
  value: string | number | boolean,
): string {
  if (typeof value === "boolean") {
    // `<Marquee pauseOnHover />` is what a person writes; `={true}` is noise.
    return value ? control.prop : `${control.prop}={false}`;
  }
  if (typeof value === "number") {
    return `${control.prop}={${value}}`;
  }
  return `${control.prop}=${jsxString(value)}`;
}

/** `flip-card` -> `FlipCard`. Every component's export follows this. */
export function tagFor(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/**
 * Fill in the parts of a playground config that can be derived.
 *
 * A component with a harness file needs no configuration at all: the tag comes
 * from its name and the controls come from its props table. The content file
 * only declares what neither can produce: object props and children.
 */
export function resolvePlaygroundConfig(
  name: string,
  overrides: PlaygroundOverrides = {},
): PlaygroundConfig {
  return { tag: tagFor(name), ...overrides };
}

/**
 * The JSX for the current control values.
 *
 * Only props that differ from their documented default are emitted: a snippet
 * restating every default is longer, harder to read, and misrepresents which
 * choices the reader actually made.
 */
export function generateSnippet(
  config: PlaygroundConfig,
  controls: PlaygroundControl[],
  values: PlaygroundValues,
): string {
  const attributes = controls
    .filter((control) => {
      const value = values[control.prop];
      if (value === undefined) return false;
      // A required prop is emitted whether or not it was touched: leaving it
      // out because it still matches its starting value produces a snippet
      // that does not compile.
      return control.required || value !== control.value;
    })
    .map((control) => `  ${formatAttribute(control, values[control.prop]!)}`);

  const fixed = config.fixedSource?.trimEnd();
  const lines = [...(fixed ? [fixed] : []), ...attributes];
  const children = config.childrenSource?.trimEnd();

  const open = lines.length
    ? `<${config.tag}\n${lines.join("\n")}\n${children ? ">" : "/>"}`
    : `<${config.tag}${children ? ">" : " />"}`;

  if (!children) return open;
  return `${open}\n${children}\n</${config.tag}>`;
}

/** Whether the reader has moved anything away from the documented defaults. */
export function isDirty(
  controls: PlaygroundControl[],
  values: PlaygroundValues,
): boolean {
  return controls.some((control) => values[control.prop] !== control.value);
}

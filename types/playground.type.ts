/**
 * The interactive playground on a component's docs page.
 *
 * Controls are derived from the props table the component already documents,
 * so a component gains a playground without restating its API a second time.
 * What cannot be derived — the JSX tag name, and the required props that are
 * objects or nodes rather than scalars — is declared here.
 */

/** Narrow an inferred number range where the guess from the prop name is wrong. */
export interface NumberControlOverride {
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

/**
 * What a component's content file may declare about its playground.
 *
 * Everything here is optional: the JSX tag is derived from the component name,
 * and the controls are derived from the props table. A component gets a
 * working playground by having a harness file and nothing else — this exists
 * only for what genuinely cannot be inferred.
 */
export interface PlaygroundOverrides {
  /** Override the derived tag, for a component whose export is not PascalCase. */
  tag?: string;
  /**
   * Required props the harness supplies that a control cannot express: object
   * literals and refs. Rendered verbatim into the generated snippet, so it
   * must be valid JSX attribute source, one prop per line, indented two spaces.
   */
  fixedSource?: string;
  /**
   * Children to show in the generated snippet, for a component that wraps
   * content. Indented two spaces; omitted entirely for a self-closing tag.
   */
  childrenSource?: string;
  /** Props to leave out of the controls, on top of the always-excluded ones. */
  exclude?: string[];
  /** Per-prop range tweaks where the inferred range is a poor fit. */
  ranges?: Record<string, NumberControlOverride>;
  /**
   * Starting values for props the docs give no default for.
   *
   * A required prop has no default by definition, so a control derived from it
   * alone starts at `0` or `""` — which is why Number Ticker opened counting
   * to zero and the three text components rendered nothing at all. This is the
   * value the playground opens on; it is not a claim about the component's
   * behaviour, so it stays out of the props table.
   */
  defaults?: Record<string, string | number | boolean>;
}

/** An `PlaygroundOverrides` with the derived fields filled in. */
export interface PlaygroundConfig extends PlaygroundOverrides {
  tag: string;
}

interface ControlBase {
  prop: string;
  description: string;
  /**
   * Required props are always written into the generated snippet, even when
   * untouched — omitting one because it matched its starting value would emit
   * a snippet that does not compile.
   */
  required: boolean;
}

export type PlaygroundControl =
  | (ControlBase & { kind: "select"; options: string[]; value: string })
  | (ControlBase & { kind: "boolean"; value: boolean })
  | (ControlBase & {
      kind: "number";
      value: number;
      min: number;
      max: number;
      step: number;
      unit?: string;
    })
  | (ControlBase & { kind: "text"; value: string })
  | (ControlBase & { kind: "color"; value: string });

/** The live value of every control, keyed by prop name. */
export type PlaygroundValues = Record<string, string | number | boolean>;

/**
 * A playground harness: renders the real component with `values` merged over
 * whatever fixed props it needs to be renderable at all.
 */
export interface PlaygroundHarnessProps {
  values: PlaygroundValues;
}

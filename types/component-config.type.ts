/** A row in a component's props table. */
export interface ComponentProp {
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
}

/**
 * Attribution for a community-contributed component.
 *
 * This used to be a raw HTML string rendered through `dangerouslySetInnerHTML`
 * and scrubbed with DOMPurify — which meant shipping JSDOM to the server just
 * to sanitise text we author ourselves. Structured data removes the sink.
 */
export interface ComponentCredits {
  name: string;
  url: string;
  /**
   * Whether the credit is a person or a tool.
   *
   * Only affects schema.org typing: crediting a tool as a `Person` in the
   * structured data would be a plain lie to anything consuming it.
   */
  kind?: "person" | "tool";
}

/** An extra, component-specific installation step. */
export interface InstallationStep {
  description: string;
  code?: string;
  language?: string;
}

export type ComponentCategory =
  "animation" | "background" | "button" | "card" | "component" | "text";

/**
 * The hand-authored half of a registry entry: one file per component under
 * `content/docs/<category>/<name>.content.ts`. Everything derivable from the
 * source (dependencies, code samples, breadcrumbs) is computed in
 * `lib/registry.ts` instead of being restated here.
 */
export interface ComponentConfig {
  name: string;
  category: ComponentCategory;
  title: string;
  description: string;
  isNew?: boolean;
  /**
   * Render the preview edge to edge instead of centred.
   *
   * Was inferred from `category === "background"`, which is wrong: a beam or an
   * orbit lives in the background category but is a centred diagram, and got
   * pinned to the top-left of the stage.
   */
  fullBleedPreview?: boolean;
  /**
   * Guidance on where the component fits and where it does not.
   *
   * Also the fix for thin pages: a component page of one description plus a
   * props table has almost no unique prose for a search engine to rank, which
   * is why competitors outranked us on our own component names.
   */
  whenToUse?: string;
  props: ComponentProp[];
  credits?: ComponentCredits;
  /** Appended after the standard copy-the-code steps. */
  extraInstallation?: InstallationStep[];
}

export type ComponentRegistry = Record<string, ComponentConfig>;

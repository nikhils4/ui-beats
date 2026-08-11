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
  props: ComponentProp[];
  credits?: ComponentCredits;
  /** Appended after the standard copy-the-code steps. */
  extraInstallation?: InstallationStep[];
}

export type ComponentRegistry = Record<string, ComponentConfig>;

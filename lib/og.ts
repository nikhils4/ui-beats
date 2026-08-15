/**
 * Shared vocabulary for every generated social card.
 *
 * The cards used to drift: the homepage shipped a static PNG using the old
 * lowercase `ui/beats` wordmark on white, while the component cards were dark
 * with a placeholder gradient square standing in for a logo that never
 * existed. Both now build from the same constants, so a palette change lands
 * on every card at once instead of on one of them.
 *
 * Satori has no access to the stylesheet, so the `--brand`, `--background` and
 * friends from `globals.css` (dark block) are resolved to literal sRGB here.
 * Keep these in step with that file if the tokens ever move.
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_CONTENT_TYPE = "image/png";

export const og = {
  /** `--background` */
  background: "#0c0c11",
  /** `--foreground` */
  foreground: "#f3f3f6",
  /** `--brand` */
  brand: "#9c86ff",
  /** A lift of `--brand`, used as the far stop of headline gradients. */
  brandBright: "#c0b6ff",
  /** `--accent-cyan` */
  cyan: "#1acfdf",
  /** `--accent-pink` */
  accentPink: "#ff74b0",
  /** `--muted-foreground` */
  muted: "#9d9daa",
  /** Dimmer than `--muted-foreground`, for the `$` and other furniture. */
  faint: "#545460",
} as const;

/**
 * The logo's rainbow arcs read as sound waves coming off the `b`. The mark
 * itself is deliberately absent from the cards, so this sweep carries the
 * same idea typographically.
 */
export const OG_ACCENT_SWEEP = `linear-gradient(90deg, ${og.brand}, ${og.accentPink}, ${og.cyan})`;

/** Headline treatment shared by the homepage and per-component cards. */
export const OG_HEADLINE_GRADIENT = `linear-gradient(100deg, ${og.foreground} 35%, ${og.brandBright} 100%)`;

/**
 * Gradient headline base. Callers set their own `fontSize` and `letterSpacing`.
 *
 * `alignSelf` matters more than it looks: a `backgroundClip: text` gradient is
 * painted across the element's box, not its glyphs, so a full-width box left a
 * short title like "Bounce" sitting entirely in the white first stop and
 * rendering flat. Shrinking the box to the text makes every title, long or
 * short, travel the same ramp.
 */
export const ogHeadline = {
  alignSelf: "flex-start",
  maxWidth: 1000,
  fontWeight: 800,
  backgroundImage: OG_HEADLINE_GRADIENT,
  backgroundClip: "text",
  color: "transparent",
} as const;

/** The outer frame: identical padding and rhythm on every card. */
export const ogFrame = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: og.background,
  padding: 72,
  color: og.foreground,
  fontFamily: "sans-serif",
} as const;

/** The wordmark line that opens every card. No logo mark, by design. */
export const ogWordmark = {
  fontSize: 24,
  fontWeight: 700,
  letterSpacing: 3,
  textTransform: "uppercase",
  color: og.foreground,
} as const;

/** The gradient hairline that separates the body from the footer. */
export const ogRule = {
  width: 96,
  height: 5,
  borderRadius: 3,
  background: OG_ACCENT_SWEEP,
} as const;

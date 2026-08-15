import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";
import { og, ogFrame, ogHeadline, ogRule, ogWordmark } from "@/lib/og";

/**
 * Truncate on a word boundary so a clamped description doesn't end mid-word.
 *
 * Descriptions come from component config and blog frontmatter, neither of
 * which is written to a length budget, so every card has to assume the string
 * is too long rather than trusting it to fit.
 */
export function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/**
 * Pick a headline size that keeps the title on at most three lines.
 *
 * The cards render titles as short as "Bounce" and as long as "Mastering
 * Custom React Hooks: State Management & API Calls". A single fixed size
 * either wastes the canvas on the short ones or overflows on the long ones.
 */
function headlineSize(title: string): { fontSize: number; letterSpacing: number } {
  if (title.length <= 24) return { fontSize: 86, letterSpacing: -3.5 };
  if (title.length <= 40) return { fontSize: 74, letterSpacing: -3 };
  if (title.length <= 62) return { fontSize: 60, letterSpacing: -2 };
  return { fontSize: 50, letterSpacing: -1.5 };
}

interface OgCardProps {
  /** Sits next to the wordmark, e.g. `/ Background`. */
  eyebrow?: string;
  title: string;
  body?: string;
  /** Bottom-left slot — an install command, a byline, whatever the route has. */
  footerLeft?: ReactNode;
  /** Bottom-right slot, set in the faint furniture colour. */
  footerRight?: string;
}

/**
 * The one social card every route renders.
 *
 * Each surface previously decided its own OG image: the homepage had a static
 * PNG, component pages generated their own layout, and categories, the blog
 * index and blog posts all fell back to `siteConfig.ogImage`. Routing every
 * card through this component means a shared link looks like the same product
 * whichever page it points at, and a palette or layout change is one edit.
 *
 * Deliberately no logo mark: the wordmark plus the gradient rule carries the
 * brand, and a mark at this size only competed with the headline.
 */
export function OgCard({
  eyebrow,
  title,
  body,
  footerLeft,
  footerRight,
}: OgCardProps) {
  const { fontSize, letterSpacing } = headlineSize(title);

  return (
    <div style={ogFrame}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={ogWordmark}>{siteConfig.name}</div>
        {eyebrow ? (
          <div style={{ fontSize: 22, color: og.muted }}>{eyebrow}</div>
        ) : null}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ ...ogHeadline, fontSize, letterSpacing, lineHeight: 1.05 }}>
          {title}
        </div>
        {body ? (
          <div
            style={{
              marginTop: 22,
              fontSize: 26,
              lineHeight: 1.4,
              color: og.muted,
              maxWidth: 900,
            }}
          >
            {body}
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={ogRule} />
        <div
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
          }}
        >
          {footerLeft ?? <div />}
          {footerRight ? (
            <div style={{ color: og.faint }}>{footerRight}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

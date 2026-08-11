import "server-only";

import { cache } from "react";
import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
} from "shiki";

const LANGS: BundledLanguage[] = [
  "tsx",
  "ts",
  "jsx",
  "js",
  "bash",
  "json",
  "css",
];

let highlighterPromise: Promise<Highlighter> | null = null;

/**
 * One Shiki instance for the whole build.
 *
 * Highlighting happens here, at build time, instead of in the browser. The old
 * `CodeSnippet` pulled in `prism-react-renderer` + `react-code-block` and
 * tokenised on every render on the client; this ships plain HTML and no
 * highlighting runtime at all.
 */
function getHighlighter(): Promise<Highlighter> {
  highlighterPromise ??= createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: LANGS,
  });
  return highlighterPromise;
}

function isSupported(lang: string): lang is BundledLanguage {
  return (LANGS as string[]).includes(lang);
}

export const highlight = cache(
  async (code: string, lang = "tsx"): Promise<string> => {
    const highlighter = await getHighlighter();

    return highlighter.codeToHtml(code.trim(), {
      lang: isSupported(lang) ? lang : "tsx",
      // Dual themes emit CSS variables for both, so the theme toggle is a
      // class flip rather than a re-highlight.
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    });
  },
);

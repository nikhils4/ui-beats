/**
 * Fetching and searching the UI Beats catalogue.
 *
 * The catalogue is the static `/r/components.json` the site emits at build
 * time, so this server has no backend of its own: it is a thin, cached client
 * over files that are already on the CDN.
 */

const DEFAULT_ORIGIN = "https://uibeats.com";

/** Point the server at a local `next dev` with `UIBEATS_URL=http://localhost:3000`. */
export const ORIGIN = (process.env.UIBEATS_URL ?? DEFAULT_ORIGIN).replace(
  /\/$/,
  "",
);

export interface CatalogueProp {
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
}

export interface CatalogueComponent {
  name: string;
  title: string;
  category: string;
  description: string;
  whenToUse?: string;
  docs: string;
  markdown: string;
  install: string;
  registry: string;
  dependencies: string[];
  registryDependencies: string[];
  props: CatalogueProp[];
  author?: string;
}

export interface Catalogue {
  name: string;
  homepage: string;
  license: string;
  count: number;
  categories: string[];
  components: CatalogueComponent[];
}

/**
 * Ten minutes is long enough that a burst of tool calls costs one request, and
 * short enough that a newly published component shows up within a session.
 */
const TTL_MS = 10 * 60 * 1000;

let cached: { at: number; value: Catalogue } | undefined;
/** In-flight request, so N concurrent tool calls on a cold cache make one fetch. */
let inFlight: Promise<Catalogue> | undefined;

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url, {
    headers: { accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(
      `GET ${url} failed: ${response.status} ${response.statusText}`,
    );
  }
  return response.json();
}

export async function loadCatalogue(): Promise<Catalogue> {
  if (cached && Date.now() - cached.at < TTL_MS) return cached.value;
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const value = (await fetchJson(
        `${ORIGIN}/r/components.json`,
      )) as Catalogue;
      if (!Array.isArray(value?.components)) {
        throw new Error("components.json did not contain a components array");
      }
      cached = { at: Date.now(), value };
      return value;
    } catch (error) {
      // A stale catalogue beats no catalogue: if the site is briefly
      // unreachable, keep answering from the last good copy rather than
      // failing every tool call for the rest of the session.
      if (cached) return cached.value;
      throw error;
    } finally {
      inFlight = undefined;
    }
  })();

  return inFlight;
}

/** The canonical markdown document for one component, straight from the site. */
export async function fetchComponentMarkdown(
  entry: CatalogueComponent,
): Promise<string> {
  // Rebuilt from ORIGIN rather than trusting the absolute URL baked into the
  // catalogue, so pointing at localhost actually stays on localhost.
  const url = `${ORIGIN}/docs/${entry.category}/${entry.name}.md`;
  const response = await fetch(url, { headers: { accept: "text/markdown" } });
  if (!response.ok) {
    throw new Error(
      `GET ${url} failed: ${response.status} ${response.statusText}`,
    );
  }
  return response.text();
}

/**
 * Words that carry no signal in a component query.
 *
 * Without this, "a card that flips over on hover" scores every component in
 * the catalogue, because "on" and "that" appear in every description, so the
 * query returns the whole library ranked by prose length.
 */
const STOPWORDS = new Set([
  "a",
  "add",
  "an",
  "and",
  "any",
  "anything",
  "are",
  "as",
  "at",
  "be",
  "build",
  "but",
  "by",
  "can",
  "component",
  "components",
  "create",
  "do",
  "does",
  "for",
  "from",
  "get",
  "has",
  "have",
  "help",
  "how",
  "i",
  "in",
  "into",
  "is",
  "it",
  "its",
  "like",
  "make",
  "me",
  "my",
  "need",
  "of",
  "on",
  "one",
  "or",
  "over",
  "please",
  "react",
  "should",
  "show",
  "so",
  "some",
  "something",
  "that",
  "the",
  "then",
  "there",
  "these",
  "they",
  "thing",
  "things",
  "this",
  "to",
  "up",
  "use",
  "used",
  "using",
  "want",
  "was",
  "we",
  "what",
  "when",
  "which",
  "will",
  "with",
  "would",
  "you",
  "your",
]);

function tokenize(value: string): string[] {
  const all = value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  const meaningful = all.filter((token) => !STOPWORDS.has(token));
  // A query made entirely of stopwords ("what do you have") still deserves an
  // answer, so fall back to the raw tokens rather than matching nothing.
  return meaningful.length ? meaningful : all;
}

/**
 * Crude singular/plural fold, so "cards" finds "card" and "flips" finds "flip".
 * Not a stemmer, just enough that an agent's phrasing does not cost a match.
 */
function fold(token: string): string {
  if (token.length > 4 && token.endsWith("ies"))
    return `${token.slice(0, -3)}y`;
  if (token.length > 3 && token.endsWith("es")) return token.slice(0, -2);
  if (token.length > 3 && token.endsWith("s")) return token.slice(0, -1);
  if (token.length > 5 && token.endsWith("ing")) return token.slice(0, -3);
  return token;
}

/** Every distinct word in a component's prose, folded, for membership tests. */
function proseTokens(entry: CatalogueComponent): Set<string> {
  const words = [
    entry.description,
    entry.whenToUse ?? "",
    entry.category,
    entry.props.map((prop) => `${prop.prop} ${prop.description}`).join(" "),
  ]
    .join(" ")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  return new Set(words.map(fold));
}

/**
 * Score a component against a query.
 *
 * Deliberately boring: an exact name match must always win, then title, then
 * the prose. Agents ask for things like "card that flips on hover" and "number
 * counting up animation", so every token is scored independently and a partial
 * match still counts; an all-or-nothing filter returns nothing for those.
 *
 * Prose is matched per word rather than by substring. `haystack.includes(token)`
 * scored "thing" against every description containing "something", which put
 * five unrelated components behind every miss.
 */
function score(entry: CatalogueComponent, tokens: string[]): number {
  const name = entry.name.toLowerCase();
  const title = entry.title.toLowerCase();
  const prose = proseTokens(entry);

  const joined = tokens.join(" ");
  let total = 0;

  if (name === joined || name.replace(/-/g, " ") === joined) total += 100;
  if (title === joined) total += 100;

  for (const token of tokens) {
    const folded = fold(token);
    // Name and title are short and deliberate, so a substring hit there is a
    // real signal ("flip" in "flip-card") rather than an accident.
    if (name.includes(folded)) total += 12;
    if (title.includes(folded)) total += 10;
    if (entry.category === folded) total += 6;
    if (prose.has(folded)) total += 2;
  }

  return total;
}

export function searchComponents(
  catalogue: Catalogue,
  query: string,
  options: { category?: string; limit?: number } = {},
): CatalogueComponent[] {
  const { category, limit = 10 } = options;
  const pool = category
    ? catalogue.components.filter((entry) => entry.category === category)
    : catalogue.components;

  const tokens = tokenize(query);
  // An empty query is a browse, not a search, so return the pool rather than
  // scoring everything to zero and handing back an arbitrary slice.
  if (!tokens.length) return pool.slice(0, limit);

  const ranked = pool
    .map((entry) => ({ entry, value: score(entry, tokens) }))
    .filter((row) => row.value > 0)
    .sort(
      (a, b) => b.value - a.value || a.entry.name.localeCompare(b.entry.name),
    );

  if (!ranked.length) return [];

  /*
   * Cut the long tail relative to the best hit.
   *
   * Returning ten results for a query that has one obvious answer trains the
   * agent to ignore the ranking and pick arbitrarily. A component scoring a
   * third of the leader is noise, not a runner-up.
   */
  const best = ranked[0]!.value;
  const threshold = best / 3;

  return ranked
    .filter((row) => row.value >= threshold)
    .slice(0, limit)
    .map((row) => row.entry);
}

export function findComponent(
  catalogue: Catalogue,
  name: string,
): CatalogueComponent | undefined {
  const needle = name.trim().toLowerCase();
  return catalogue.components.find(
    (entry) =>
      entry.name.toLowerCase() === needle ||
      entry.title.toLowerCase() === needle ||
      // Tolerate "FlipCard" and "flip card" for the same component, since an
      // agent quoting a JSX tag name should not get a miss.
      entry.name.replace(/-/g, "") === needle.replace(/[\s-]/g, ""),
  );
}

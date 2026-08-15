/**
 * Turning registry fetches into an install signal.
 *
 * `public/r/*.json` is the only endpoint that a real adoption touches: the
 * shadcn CLI fetches it the moment somebody actually runs `add`. Page views
 * told us what people browsed, which is a different and much less useful list —
 * the components that photograph well, not the ones that get shipped.
 *
 * Deliberately free of any registry import. The proxy bundle would otherwise
 * pull in `lib/registry.ts`, which reads every component's source off disk, on
 * a hot path that is supposed to stay in front of a static file.
 */

/** What kind of client fetched a registry item. */
export type RegistryClient =
  "cli" | "agent" | "browser" | "crawler" | "unknown";

/** Which registry document was requested. */
export type RegistryTarget =
  | { kind: "component"; name: string }
  | { kind: "index" }
  | { kind: "catalogue" };

export interface RegistryFetchEvent {
  target: RegistryTarget;
  client: RegistryClient;
  userAgent: string;
  referer?: string;
}

/**
 * The two registry documents that are not a single component.
 *
 * `registry.json` is the shadcn index a human browses; `components.json` is
 * what the MCP server pulls to build its catalogue. Counting either as an
 * install of a component named "registry" would put a phantom at the top of
 * every ranking.
 */
const INDEX_FILE = "registry.json";
const CATALOGUE_FILE = "components.json";

/**
 * Substrings that mark a request as automated crawling rather than adoption.
 *
 * Checked before the browser test, because every one of these also sends a
 * `Mozilla/5.0` prefix and would otherwise inflate the browser count.
 */
const CRAWLER_HINTS = [
  "bot",
  "crawler",
  "spider",
  "slurp",
  "bingpreview",
  "facebookexternalhit",
  "embedly",
  "quora link preview",
  "pinterest",
  "vercelbot",
  "lighthouse",
  "headlesschrome",
];

/**
 * Clients that fetch a registry item because a model asked for it.
 *
 * Kept separate from `cli` so the two adoption routes can be compared: the
 * whole agent-native bet is that this bucket grows faster than the other.
 */
const AGENT_HINTS = [
  "claude",
  "anthropic",
  "cursor",
  "windsurf",
  "copilot",
  "openai",
  "chatgpt",
  "gemini",
  "modelcontextprotocol",
  "uibeats-mcp",
  "cline",
  "zed",
];

/** Runtimes a CLI shells out through. `shadcn` itself is checked first. */
const CLI_HINTS = [
  "shadcn",
  "node",
  "undici",
  "bun",
  "deno",
  "curl",
  "wget",
  "got (",
];

/**
 * Which registry document a pathname refers to, or null if it is not one.
 *
 * Returns null rather than throwing for anything unexpected: this runs in
 * front of a static file and must never be the reason a request fails.
 */
export function parseRegistryPath(pathname: string): RegistryTarget | null {
  const match = /^\/r\/([A-Za-z0-9._-]+)\.json$/.exec(pathname);
  if (!match) return null;

  const file = `${match[1]}.json`;
  if (file === INDEX_FILE) return { kind: "index" };
  if (file === CATALOGUE_FILE) return { kind: "catalogue" };
  return { kind: "component", name: match[1]! };
}

/** Bucket a user agent into who is really on the other end. */
export function classifyClient(userAgent: string | null): RegistryClient {
  if (!userAgent) return "unknown";
  const ua = userAgent.toLowerCase();

  if (CRAWLER_HINTS.some((hint) => ua.includes(hint))) return "crawler";
  if (AGENT_HINTS.some((hint) => ua.includes(hint))) return "agent";
  if (CLI_HINTS.some((hint) => ua.includes(hint))) return "cli";
  if (ua.includes("mozilla/")) return "browser";
  return "unknown";
}

/**
 * The GA4 event name for a fetch.
 *
 * Separate names rather than one event with a parameter, so the counts are
 * readable in GA's default reports without building a custom exploration.
 */
export function eventName(target: RegistryTarget): string {
  if (target.kind === "component") return "registry_install";
  if (target.kind === "index") return "registry_index_read";
  return "registry_catalogue_read";
}

/**
 * A stable, non-identifying client id for the Measurement Protocol.
 *
 * GA4 rejects an event with no `client_id`, and a random one per request would
 * report every install as a new user. Bucketing on the user agent alone gives
 * a coarse but honest id — no IP, nothing that survives back to a person.
 */
export function clientId(userAgent: string | null): string {
  const seed = userAgent ?? "unknown";
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `${(hash >>> 0).toString(36)}.0`;
}

/** The single structured line written to stdout for every registry fetch. */
export function logLine(event: RegistryFetchEvent): string {
  return JSON.stringify({
    msg: "registry_fetch",
    event: eventName(event.target),
    component: event.target.kind === "component" ? event.target.name : null,
    client: event.client,
    ua: event.userAgent.slice(0, 200),
    referer: event.referer ?? null,
  });
}

/**
 * The Measurement Protocol request for a fetch, or null when unconfigured.
 *
 * Null is the normal state, not an error: the structured log above is the
 * zero-setup path and is enough to answer "what gets installed". Setting
 * `GA_API_SECRET` upgrades it to something with a dashboard.
 */
export function measurementRequest(
  event: RegistryFetchEvent,
  config: { measurementId?: string; apiSecret?: string },
): { url: string; body: string } | null {
  const { measurementId, apiSecret } = config;
  if (!measurementId || !apiSecret) return null;
  // Crawlers are not adoption, and paying to store them makes every chart lie.
  if (event.client === "crawler") return null;

  return {
    url: `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
      measurementId,
    )}&api_secret=${encodeURIComponent(apiSecret)}`,
    body: JSON.stringify({
      client_id: clientId(event.userAgent),
      // Without this GA attributes the hit to a session that never existed and
      // drops it from realtime.
      non_personalized_ads: true,
      events: [
        {
          name: eventName(event.target),
          params: {
            component:
              event.target.kind === "component" ? event.target.name : "-",
            client: event.client,
            engagement_time_msec: 1,
          },
        },
      ],
    }),
  };
}

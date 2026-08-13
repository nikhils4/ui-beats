import { llmsIndex } from "@/lib/agent-docs";

/**
 * `/llms.txt`, the entry point for coding agents.
 *
 * Prerendered, because it is derived entirely from registry data that is fixed
 * at build time. Without `force-static` a route handler is dynamic by default
 * and this would re-render the whole catalogue on every crawl.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsIndex(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

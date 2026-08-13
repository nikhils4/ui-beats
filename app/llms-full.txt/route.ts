import { llmsFull } from "@/lib/agent-docs";

/**
 * `/llms-full.txt`: every component's docs and source in one file, for agents
 * that would rather take one fetch than thirty-four.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFull(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

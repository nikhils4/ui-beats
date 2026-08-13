import { componentMarkdown } from "@/lib/agent-docs";
import { getComponent, getRegistry } from "@/lib/registry";

/**
 * The markdown twin of a component docs page.
 *
 * Reached as `/docs/<category>/<component>.md`. `next.config.mjs` rewrites
 * that onto this handler, because a route segment cannot carry the `.md`
 * suffix while `[component]/page.tsx` already owns the same level.
 *
 * Prerendered for every component, so this costs a static file per component
 * rather than a render per request.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getRegistry().map((entry) => ({
    category: entry.category,
    component: entry.name,
  }));
}

interface RouteContext {
  params: Promise<{ category: string; component: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { category, component } = await params;
  const entry = getComponent(category, component);

  if (!entry) {
    return new Response("Not found\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(componentMarkdown(entry), {
    headers: {
      // `text/markdown` rather than `text/plain` so a client that distinguishes
      // them renders this instead of downloading it.
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

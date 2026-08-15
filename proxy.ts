import { NextResponse } from "next/server";
import type { NextProxy } from "next/server";
import {
  classifyClient,
  logLine,
  measurementRequest,
  parseRegistryPath,
} from "@/lib/install-analytics";

/**
 * Counts a registry fetch on its way to the static file.
 *
 * `/r/*.json` is the shadcn CLI's install endpoint, so this is the only place
 * the site can see adoption rather than curiosity. It is observation only: the
 * response is always `next()`, and every failure path is swallowed, because
 * nothing here is worth breaking an install over.
 *
 * `middleware.ts` would be the Next 15 name for this file; 16 deprecated that
 * convention in favour of `proxy.ts`.
 */
export const proxy: NextProxy = (request, event) => {
  const target = parseRegistryPath(request.nextUrl.pathname);
  if (!target) return NextResponse.next();

  const userAgent = request.headers.get("user-agent");
  const fetchEvent = {
    target,
    client: classifyClient(userAgent),
    userAgent: userAgent ?? "",
    referer: request.headers.get("referer") ?? undefined,
  };

  /*
   * Always emitted: a structured line the host's log drain can aggregate with
   * no account, key or dashboard to set up first.
   *
   * `console.log` against the project's `no-console` rule, deliberately. The
   * rule exists to keep debugging noise out of the client bundle; this is the
   * output of the file, it runs only on the server, and routing it through
   * `console.warn` would file every successful install under warnings.
   */
  // eslint-disable-next-line no-console
  console.log(logLine(fetchEvent));

  const measurement = measurementRequest(fetchEvent, {
    measurementId: process.env.NEXT_PUBLIC_GA_ID,
    apiSecret: process.env.GA_API_SECRET,
  });

  if (measurement) {
    /*
     * `waitUntil` so the round trip to Google never sits between the CLI and
     * its JSON. A rejected send is discarded rather than logged: GA rejecting
     * one event is not worth a line in the log stream that the install counts
     * are being read from.
     */
    event.waitUntil(
      fetch(measurement.url, { method: "POST", body: measurement.body }).then(
        () => undefined,
        () => undefined,
      ),
    );
  }

  return NextResponse.next();
};

/**
 * Only the registry.
 *
 * Without a matcher this would run on every request including `_next/static`,
 * turning a static asset fetch into a function invocation. The value has to be
 * a literal — Next statically analyses it at build time and silently ignores
 * anything computed.
 */
export const config = {
  matcher: ["/r/:path*.json"],
};

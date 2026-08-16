import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

// The server has no viewport; assume desktop and let the client correct it.
const getServerSnapshot = () => false;

/**
 * Tracks whether the viewport is below the mobile breakpoint.
 *
 * `useSyncExternalStore` is the right primitive for reading an external store
 * during render. The previous implementation started at `undefined`, coerced
 * it to `false`, and then called `setState` inside an effect, which rendered
 * the desktop layout for one frame on every mobile page load.
 */
export function useIsMobile(): boolean {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

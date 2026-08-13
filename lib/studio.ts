import "server-only";

import { cache } from "react";
import { getRegistry } from "@/lib/registry";
import { deriveControls, resolvePlaygroundConfig } from "@/lib/playground";
import type { StudioComponent } from "@/components/website/studio";

/**
 * Everything the studio needs about every component, computed once on the
 * server and handed to the client.
 *
 * Deliberately not the registry entries themselves: those carry each
 * component's full source and its usage example, which would put roughly a
 * hundred kilobytes of code the studio never renders into the RSC payload.
 * Only the derived controls travel.
 */
export const getStudioComponents = cache((): StudioComponent[] =>
  getRegistry()
    .filter((entry) => entry.hasPlayground)
    .map((entry) => {
      const config = resolvePlaygroundConfig(entry.name, entry.playground);
      return {
        name: entry.name,
        category: entry.category,
        title: entry.title,
        href: entry.href,
        fullBleed: entry.fullBleedPreview ?? false,
        config,
        controls: deriveControls(entry.props, config),
      };
    })
    // A component with nothing to tune would be a dead entry in the picker.
    .filter((entry) => entry.controls.length > 0)
    .sort((a, b) => a.title.localeCompare(b.title)),
);

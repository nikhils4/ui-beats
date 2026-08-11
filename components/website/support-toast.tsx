"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { siteConfig } from "@/lib/site";

const STORAGE_KEY = "uibeats:support-toast-shown";

/**
 * One-time "star the repo" nudge.
 *
 * The original version only wrote the localStorage flag from `onDismiss` and
 * `onAutoClose`, so a reader who navigated away while the toast was open never
 * got it recorded and saw the prompt again on the next visit. The flag is now
 * written as soon as the toast is shown.
 */
export function SupportToast() {
  useEffect(() => {
    let shown = false;
    try {
      shown = window.localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      // Private-mode / storage disabled: skip the nudge rather than throw.
      return;
    }
    if (shown) return;

    const timer = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        /* best effort */
      }

      toast("Show your support for UI Beats", {
        description: "Keep building for good! ❤️",
        duration: 30_000,
        action: {
          label: "Star on GitHub",
          onClick: () =>
            window.open(siteConfig.links.github, "_blank", "noopener"),
        },
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Star count for a GitHub repo.
 *
 * Called from a server component and cached for an hour. The old version ran
 * in the browser on every page load against the unauthenticated API, which is
 * rate-limited to 60 requests/hour *per visitor IP*, so it returned 0 for
 * anyone behind a shared NAT. `GITHUB_TOKEN` raises the limit further but is
 * optional.
 */
export async function getGithubStarsCount(repo: string): Promise<number> {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return 0;

    const data = (await response.json()) as { stargazers_count?: number };
    return data.stargazers_count ?? 0;
  } catch {
    return 0;
  }
}

/** `1234` -> `1.2k`, for compact star counts. */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

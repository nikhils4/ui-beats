import { Header } from "@/components/website/header";
import { getGithubStarsCount } from "@/lib/utils";

/**
 * Server wrapper that resolves the star count before the header renders.
 *
 * The count used to be fetched from the browser against the unauthenticated
 * GitHub API on every page load; here it happens once per hour at the edge and
 * costs the visitor nothing.
 */
export async function SiteHeader() {
  const stars = await getGithubStarsCount("nikhils4/ui-beats");
  return <Header stars={stars} />;
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons";
import { BorderBeam } from "@/components/demo/component/border-beam";
import { siteConfig } from "@/lib/site";

/**
 * Closing call to action.
 *
 * A server component that renders one client component: `BorderBeam` takes the
 * card's content as children, so the copy and the links stay in the server
 * payload and only the beam itself ships JavaScript.
 */
export function FinalCta({ componentCount }: { componentCount: number }) {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-20 md:px-8">
        <BorderBeam
          className="mx-auto max-w-3xl rounded-2xl"
          duration={9}
          arc={120}
          borderWidth={1}
        >
          <div className="relative overflow-hidden rounded-[inherit] px-6 py-16 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] opacity-50"
            />

            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tighter text-balance sm:text-4xl">
                Start with one component
              </h2>
              <p className="mx-auto mt-4 max-w-md leading-relaxed text-balance text-muted-foreground">
                Install it, read it, change it. If it does not fit, delete it.
                It is only a file, and there are {componentCount} to pick from.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="w-full gap-2 shadow-brand sm:w-auto"
                >
                  <Link href="/docs/getting-started/installation">
                    Get started
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full gap-2 sm:w-auto"
                >
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon className="size-4" />
                    Star on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </BorderBeam>
      </div>
    </section>
  );
}

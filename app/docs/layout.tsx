import type { ReactNode } from "react";
import Link from "next/link";
import { BookOpen, Bug, Lightbulb } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SideNav } from "@/components/website/side-nav";
import { DocsToc } from "@/components/website/docs-toc";
import { ShowcaseCard } from "@/components/website/showcase-card";
import { SupportToast } from "@/components/website/support-toast";
import { siteConfig } from "@/lib/site";

const asideLinks = [
  {
    href: siteConfig.links.newIssue,
    label: "Report an issue",
    icon: Bug,
    external: true,
  },
  {
    href: siteConfig.links.newFeature,
    label: "Request a feature",
    icon: Lightbulb,
    external: true,
  },
  { href: "/blogs", label: "Read the blog", icon: BookOpen, external: false },
];

/**
 * Docs shell.
 *
 * Layout note: this is where the content was overflowing. The right rail used
 * to be `position: fixed`, which takes it out of normal flow, so the main
 * column had the full width to centre itself in and its content ran underneath
 * the rail on wide screens. The rail is a real flex item now and the main
 * column simply gets less width; `sticky` keeps it parked while the page
 * scrolls.
 *
 * `min-w-0` on the scrolling column matters just as much: a flex item defaults
 * to `min-width: auto`, so a wide child (a code block or the props table)
 * pushes the whole column wider than its share instead of scrolling inside it.
 */
export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <SupportToast />
      <div className="flex min-h-svh w-full">
        <SideNav />

        <div className="flex min-w-0 flex-1 justify-center">
          <div className="flex w-full max-w-(--breakpoint-2xl) min-w-0 gap-8 px-4 md:px-8">
            <main className="min-w-0 flex-1 py-8 lg:py-10">
              <div className="mx-auto w-full max-w-3xl min-w-0">{children}</div>
            </main>

            <aside className="hidden w-64 shrink-0 py-10 xl:block">
              {/*
                Capped and scrollable: the rail holds a table of contents now,
                and a long one on top of the resource links and the showcase
                card would otherwise run off the bottom of a laptop screen with
                no way to reach the end of it.
              */}
              <div className="sticky top-10 max-h-[calc(100svh-5rem)] space-y-8 overflow-y-auto pb-8">
                <DocsToc />

                <nav aria-label="Docs resources">
                  <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                    Resources
                  </p>
                  <ul className="space-y-1">
                    {asideLinks.map(({ href, label, icon: Icon, external }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          /*
                            Alignment, twice over.

                            The `-mx-2` this used to carry pulled the whole row
                            eight pixels left of the "Resources" heading above
                            it, so the hover fill bled out of the rail's column
                            on one side only. And with no left padding, the
                            labels sat a further twelve pixels left of the
                            table-of-contents links directly above, which are
                            inset past their rail border. `px-3` and no
                            negative margin puts the fill flush with the
                            headings and the labels on the same line as the
                            contents links.
                          */
                          className="group flex items-center rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-muted/60 hover:text-foreground"
                        >
                          <Icon className="mr-2.5 size-4 text-muted-foreground/70 transition-colors duration-200 group-hover:text-brand" />
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <ShowcaseCard />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

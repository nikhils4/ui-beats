import type { ReactNode } from "react";
import Link from "next/link";
import { BookOpen, Bug, Lightbulb } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SideNav } from "@/components/website/side-nav";
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
 * Layout note — this is where the content was overflowing. The right rail used
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
              <div className="sticky top-10 space-y-6">
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
                          className="group -mx-2 flex items-center rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                          <Icon className="mr-2 size-4 transition-colors group-hover:text-brand" />
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

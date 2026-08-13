"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

const columns = [
  {
    title: "Docs",
    links: [
      { label: "Introduction", href: "/docs/getting-started/introduction" },
      { label: "Installation", href: "/docs/getting-started/installation" },
      { label: "CLI", href: "/docs/getting-started/cli" },
      { label: "Contribute", href: "/docs/getting-started/contribute" },
    ],
  },
  {
    title: "Components",
    links: [
      { label: "Animation", href: "/docs/animation" },
      { label: "Background", href: "/docs/background" },
      { label: "Card", href: "/docs/card" },
      { label: "Text", href: "/docs/text" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "GitHub", href: siteConfig.links.github, external: true },
      {
        label: "Report an issue",
        href: siteConfig.links.newIssue,
        external: true,
      },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();

  // Docs pages have their own chrome and a right-hand resource rail.
  if (pathname.startsWith("/docs")) return null;

  // No top margin here on purpose. The footer is global chrome, so a margin
  // would sit between it and whatever the page happens to end with. On pages
  // whose last section is full-bleed and tinted (the home page's index, also
  // `bg-muted/20`), that margin rendered as a dark band of page background
  // sandwiched between two tinted blocks. Pages own their bottom spacing.
  return (
    <footer className="border-t bg-muted/20">
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4 py-14 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-base font-bold tracking-tight">
              {siteConfig.name}
            </p>
            <p className="mt-2 max-w-56 text-sm leading-relaxed text-muted-foreground">
              Animated React components you can copy, paste, or install with the
              shadcn CLI.
            </p>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitHubIcon className="size-4" />
              GitHub
            </a>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            Crafted by{" "}
            <a
              className="font-medium text-foreground underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href={siteConfig.author.url}
            >
              {siteConfig.author.name}
            </a>
            , for the web.
          </p>
          <p>MIT Licensed</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { BrandLockup } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/components/website/command-menu";
import { ModeToggle } from "@/components/website/ui-theme-toggle";
import { ScrollProgress } from "@/components/website/scroll-progress";
import { GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";
import { cn, formatCompactNumber } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
} as const;

const navLinks = [
  { href: "/docs/getting-started/introduction", label: "Docs", match: "/docs" },
  { href: "/blogs", label: "Blog", match: "/blogs" },
];

export function Header({ stars = 0 }: { stars?: number }) {
  const pathname = usePathname();

  // Docs pages have their own sidebar chrome; a block preview has none by
  // design, so the section is judged at the real width with nothing above it.
  if (pathname.startsWith("/docs") || pathname.startsWith("/preview")) {
    return null;
  }

  // Derived during render instead of in a `useEffect`, so the progress bar is
  // correct on first paint rather than one frame late.
  const showScrollProgress = pathname.startsWith("/blogs/");

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl"
    >
      {showScrollProgress ? <ScrollProgress /> : null}
      <div className="mx-auto flex h-16 max-w-(--breakpoint-2xl) items-center gap-6 px-4 md:px-8">
        <Link className="flex shrink-0 items-center" href="/">
          <BrandLockup />
          <span className="sr-only">{siteConfig.name} home</span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-1 text-sm sm:flex"
        >
          {navLinks.map(({ href, label, match }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-lg px-3 py-1.5 font-medium transition-colors",
                pathname.startsWith(match)
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:block">
            <CommandMenu />
          </div>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="gap-1.5 font-medium"
          >
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={siteConfig.links.github}
            >
              <GitHubIcon className="size-3.5" />
              <span className="hidden sm:inline">Star</span>
              {stars > 0 ? (
                <>
                  <span
                    aria-hidden="true"
                    className="mx-0.5 h-3 w-px bg-border"
                  />
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                  <span className="tabular-nums">
                    {formatCompactNumber(stars)}
                  </span>
                </>
              ) : null}
              <span className="sr-only">
                Star UI Beats on GitHub
                {stars > 0 ? ` (${stars} stars)` : ""}
              </span>
            </a>
          </Button>

          <ModeToggle />
        </div>
      </div>
    </motion.header>
  );
}

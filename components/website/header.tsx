"use client";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/components/website/command-menu";
import { ModeToggle } from "@/components/website/ui-theme-toggle";
import { SideNavSheet } from "@/components/website/side-nav-sheet";
import Link from "next/link";
import { siGithub, siX } from "simple-icons";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Star } from "lucide-react";

export const Header = () => {
  const githubSvg = siGithub.svg.replace(
    "<svg",
    '<svg class="text-white dark:text-black" fill="currentColor"',
  );

  const xSvg = siX.svg.replace(
    "<svg",
    '<svg class="text-black dark:text-white" fill="currentColor"',
  );

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex px-2 md:px-7 h-14 align-middle  items-center">
        <SideNavSheet />
        <span className="sr-only">Menu</span>
        <div className="mr-4 hidden md:flex items-center">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Image
              src="/uibeats-logo.png"
              width={20}
              height={20}
              alt="ui/beats logo"
              className="rounded-sm bg-white"
            />
            <div className="sm:flex justify-center items-center hidden font-bold">
              <div className="mr-2">ui/beats</div>
              <Badge className="text-[10px]" variant="outline">
                Beta
              </Badge>
            </div>
          </Link>
          <nav className="flex items-center space-x-6 text-sm">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/docs/getting-started"
            >
              Docs
            </Link>
            <a
              rel="noopener noreferrer"
              className="hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
              href="https://github.com/nikhils4/ui-beats"
              target="_blank"
            >
              GitHub
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <div className="flex w-full md:w-fit items-center space-x-2 md:order-last">
            <CommandMenu />
          </div>
          <a
            rel="noopener noreferrer"
            href="https://github.com/nikhils4/ui-beats"
            target="_blank"
          >
            <Button>
              <Star className="text-yellow-400 h-4 w-4 mr-2" />
              Star on
              <div
                className="h-4 w-4 ml-2"
                dangerouslySetInnerHTML={{ __html: githubSvg }}
              />
              <span className="sr-only">GitHub</span>
            </Button>
          </a>
          <a
            rel="noopener noreferrer"
            href="https://x.com/nikhilScripts"
            target="_blank"
          >
            <Button variant="ghost" size="icon">
              <div
                className="h-4 w-4"
                dangerouslySetInnerHTML={{ __html: xSvg }}
              />
              <span className="sr-only">Twitter</span>
            </Button>
          </a>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

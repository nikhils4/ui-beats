"use client";
import { Button } from "@/components/ui/button";
import { Github, Twitter } from "lucide-react";
import { CommandMenu } from "@/components/website/command-menu";
import { ModeToggle } from "@/components/website/ui-theme-toggle";
import { SideNavSheet } from "@/components/website/side-nav-sheet";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex px-2 md:px-7 h-14 align-middle  items-center">
        <SideNavSheet />
        <span className="sr-only">Menu</span>
        <div className="mr-4 hidden md:flex items-center">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            {/*TODO: LOGO*/}
            <span className="hidden font-bold sm:inline-block">ui/beats</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/docs/getting-started"
            >
              Docs
            </Link>
            <Link
              className="hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
              href="https://github.com/nikhils4/ui-beats"
            >
              GitHub
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <div className="flex w-full md:w-fit items-center space-x-2 md:order-last">
            <CommandMenu />
          </div>
          <Button variant="ghost" size="icon">
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

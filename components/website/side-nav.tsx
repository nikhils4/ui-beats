"use client";
import { useMemo, useState } from "react";
import { sideNav } from "@/config/side-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "../ui/button";
import { ChevronDown, Search, X } from "lucide-react";
import { BeatsMark, BrandLockup } from "@/components/brand";
import { GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";
import { ModeToggle } from "./ui-theme-toggle";
import { CommandMenu } from "./command-menu";
import { cn } from "@/lib/utils";

export const SideNav = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname();
  const { state, setOpen } = useSidebar();
  const [query, setQuery] = useState("");

  /*
   * Every section starts open.
   *
   * This used to open only the section you were already in, so finding a
   * component you could not already name meant expanding six collapsed
   * sections one at a time and scanning each. Showing the whole catalogue at
   * once is what shadcn/ui, Radix and Tailwind's docs all do, and the sections
   * stay collapsible for anyone who wants to quieten one down.
   *
   * There is no separate collapsed-sidebar case any more. `SidebarMenuSub` is
   * `group-data-[collapsible=icon]:hidden`, so in icon mode the sub-lists are
   * hidden by CSS whatever this state says, and the old branch that tracked a
   * single open index there was steering something nobody could see.
   */
  const [openMenuIndices, setOpenMenuIndices] = useState<number[]>(() =>
    sideNav.map((_, index) => index),
  );

  const trimmed = query.trim().toLowerCase();

  /**
   * Sections with their items filtered, dropping any section left empty.
   *
   * The original index rides along because the open/closed state is keyed by
   * position in `sideNav`, and filtering renumbers the visible list.
   */
  const sections = useMemo(() => {
    const all = sideNav.map((section, index) => ({ section, index }));
    if (!trimmed) return all;

    return all
      .map(({ section, index }) => ({
        index,
        section: {
          ...section,
          subItems: section.subItems.filter((item) =>
            item.title.toLowerCase().includes(trimmed),
          ),
        },
      }))
      .filter(({ section }) => section.subItems.length > 0);
  }, [trimmed]);

  // While filtering, every surviving section is open: a match hidden inside a
  // collapsed section is a match the reader cannot see.
  const isOpen = (index: number) => trimmed !== "" || openMenuIndices.includes(index);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div
          className={`flex items-center ${state === "expanded" ? "pr-3 pl-4" : "px-2"} py-2`}
        >
          {state === "collapsed" && (
            // `group`, so the bars still react here. The mark is used bare
            // rather than through BrandLockup, which is what normally carries
            // it.
            <Link href="/" aria-label="UI Beats home" className="group">
              <BeatsMark className="size-6" />
            </Link>
          )}
          {state === "expanded" && (
            <div className="flex w-full items-center justify-between">
              <Link href="/" className="flex items-center">
                <BrandLockup />
                <span className="sr-only">UI Beats home</span>
              </Link>
              <CommandMenu small />
            </div>
          )}
        </div>

        {/* Filters this list in place. ⌘K in the header still opens the command
            menu for jumping straight to a page; this is for narrowing the list
            you are already looking at. */}
        {state === "expanded" ? (
          <div className="relative px-2 pb-2">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <SidebarInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") setQuery("");
              }}
              placeholder="Filter components"
              aria-label="Filter components"
              className="h-8 pr-8 pl-8 text-xs"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear filter"
                className="absolute top-1/2 right-4 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            ) : null}
          </div>
        ) : null}
      </SidebarHeader>

      <SidebarContent
        className="space-y-2"
        style={{
          marginLeft: state === "expanded" ? "12px" : "4px",
          marginRight: state === "expanded" ? "12px" : "4px",
        }}
      >
        {sections.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-muted-foreground">
            Nothing matches &ldquo;{query.trim()}&rdquo;.
          </p>
        ) : null}

        <SidebarMenu className="space-y-2">
          {sections.map(({ section, index }) => {
            const { subItems, title, icon: Icon } = section;
            return (
              <Collapsible
                open={isOpen(index)}
                onOpenChange={(open) => {
                  // While filtering the sections are forced open, so a toggle
                  // would fight the filter. Ignore it until the box is clear.
                  if (trimmed) return;
                  setOpenMenuIndices((prev) =>
                    open
                      ? prev.includes(index)
                        ? prev
                        : [...prev, index]
                      : prev.filter((i) => i !== index),
                  );
                }}
                className="group/collapsible"
                key={title}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <div className="flex w-full justify-center">
                      <SidebarMenuButton
                        tooltip={title}
                        className="text-sm"
                        onClick={() => {
                          // Clicking an icon in the collapsed rail expands the
                          // sidebar. It no longer collapses every other
                          // section on the way, which would have contradicted
                          // the open-by-default rule the moment you used it.
                          if (state === "collapsed") {
                            setOpen(true);
                            setOpenMenuIndices((prev) =>
                              prev.includes(index) ? prev : [...prev, index],
                            );
                          }
                        }}
                      >
                        {Icon && <Icon />}
                        {title}
                        <span className="ml-auto flex items-center gap-1.5">
                          <span className="text-[11px] tabular-nums text-muted-foreground">
                            {subItems.length}
                          </span>
                          <ChevronDown className="size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </span>
                      </SidebarMenuButton>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="mt-1">
                      {subItems.map(({ path, title: itemTitle, isNew }) => (
                        <SidebarMenuSubItem key={itemTitle}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === path}
                            className="text-xs"
                          >
                            <Link
                              href={path}
                              className="flex items-center justify-between gap-2"
                            >
                              {itemTitle}
                              {isNew && (
                                <Badge
                                  variant="outline"
                                  className="px-1.5 py-0 text-[10px]"
                                >
                                  New
                                </Badge>
                              )}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-2 py-4">
        <div className="flex w-full items-center gap-2">
          {state === "expanded" ? <ModeToggle variant="outline" /> : null}
          {/*
            The label used to render as "Star on" followed by a bare icon, with
            the word "GitHub" hidden in an sr-only span, so it read as an
            unfinished sentence. The visible text now says what it does.
          */}
          <Button
            asChild
            variant="outline"
            className={cn(
              "gap-1.5",
              state === "expanded" ? "flex-1" : "w-full px-0",
            )}
          >
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="size-4 shrink-0" />
              {state === "expanded" ? (
                <span className="truncate">Star on GitHub</span>
              ) : (
                <span className="sr-only">Star UI Beats on GitHub</span>
              )}
            </a>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

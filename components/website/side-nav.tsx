"use client";
import { useState } from "react";
import { sideNav } from "@/config/side-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";
import { ModeToggle } from "./ui-theme-toggle";
import { CommandMenu } from "./command-menu";
import { cn } from "@/lib/utils";

export const SideNav = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname();
  const { state, setOpen } = useSidebar();

  /*
   * The section containing the current page starts open.
   *
   * This used to be hardcoded to `[0]` — "Getting Started" — so landing on any
   * component page showed a sidebar with that component's own section
   * collapsed, giving no indication of where you were and no way to reach a
   * sibling without expanding the section first.
   */
  const activeSectionIndex = Math.max(
    0,
    sideNav.findIndex((section) =>
      section.subItems.some((item) => item.path === pathname),
    ),
  );

  const [openMenuIndices, setOpenMenuIndices] = useState<number[]>([
    activeSectionIndex,
  ]);

  // Keep the active section open across client-side navigations.
  const [trackedPath, setTrackedPath] = useState(pathname);
  if (pathname !== trackedPath) {
    setTrackedPath(pathname);
    setOpenMenuIndices((prev) =>
      prev.includes(activeSectionIndex) ? prev : [...prev, activeSectionIndex],
    );
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div
          className={`flex items-center ${state === "expanded" ? "pr-3 pl-4" : "px-2"} py-2`}
        >
          {state === "collapsed" && (
            <Link href="/">
              <Image
                src="/uibeats-logo.png"
                width={24}
                height={24}
                alt="UI Beats logo"
                className="rounded-sm bg-white"
              />
            </Link>
          )}
          {state === "expanded" && (
            <div className="flex w-full items-center justify-between">
              <Link href="/" className="flex items-center">
                <span className="mr-2 font-bold">UI Beats</span>
                <Badge className="text-[10px]" variant="outline">
                  Beta
                </Badge>
              </Link>
              <CommandMenu small />
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent
        className="space-y-2"
        style={{
          marginLeft: state === "expanded" ? "12px" : "4px",
          marginRight: state === "expanded" ? "12px" : "4px",
        }}
      >
        <SidebarMenu className="space-y-2">
          {sideNav.map(({ subItems, title, icon: Icon }, index) => (
            <Collapsible
              open={
                state === "expanded"
                  ? openMenuIndices.includes(index)
                  : openMenuIndices[0] === index
              }
              onOpenChange={(isOpen) => {
                if (state === "expanded") {
                  setOpenMenuIndices((prev) =>
                    isOpen ? [...prev, index] : prev.filter((i) => i !== index),
                  );
                } else {
                  setOpenMenuIndices(isOpen ? [index] : []);
                }
              }}
              className="group/collapsible"
              key={title}
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild defaultChecked>
                  <div className="flex w-full justify-center">
                    <SidebarMenuButton
                      tooltip={title}
                      className="text-sm"
                      onClick={() => {
                        if (state === "collapsed") {
                          setOpen(true);
                          setOpenMenuIndices([index]);
                        }
                      }}
                    >
                      {Icon && <Icon />}
                      {title}{" "}
                      <ChevronDown className="ml-auto h-5 w-5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="mt-1">
                    {subItems.map(({ path, title, isNew }) => (
                      <SidebarMenuSubItem key={title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === path}
                          className="text-xs"
                        >
                          <Link
                            href={path}
                            className="flex items-center justify-between gap-2"
                          >
                            {title}
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
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-2 py-4">
        <div className="flex w-full items-center gap-2">
          {state === "expanded" ? <ModeToggle variant="outline" /> : null}
          {/*
            The label used to render as "Star on" followed by a bare icon, with
            the word "GitHub" hidden in an sr-only span — so it read as an
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

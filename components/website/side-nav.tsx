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
import { ChevronDown, Search, Star } from "lucide-react";
import { siGithub } from "simple-icons";
import { ModeToggle } from "./ui-theme-toggle";
import { CommandMenu } from "./command-menu";
import { cn } from "@/lib/utils";

export const SideNav = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname();
  const { state, setOpen } = useSidebar();
  const [openMenuIndices, setOpenMenuIndices] = useState<number[]>([0]);
  const githubSvg = siGithub.svg.replace(
    "<svg",
    '<svg class="text-white dark:text-black" fill="currentColor"'
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className={`flex items-center ${state === "expanded" ? "pl-4 pr-3" : "px-2"} py-2`}>
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
            <div className="flex w-full justify-between items-center">
              <Link href="/" className="flex items-center">
                <span className="font-bold mr-2">UI Beats</span>
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
                    isOpen ? [...prev, index] : prev.filter((i) => i !== index)
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
                  <div className="w-full flex justify-center">
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
                      <ChevronDown className="ml-auto w-5 h-5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
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
                            className="flex items-center gap-2 justify-between"
                          >
                            {title}
                            {isNew && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5 py-0"
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
      <SidebarFooter className="py-4 flex px-2 items-center justify-center">
        <div className="flex-1 flex items-center justify-center w-full">
          {state === "expanded" && <ModeToggle variant="outline" />}
          <Button 
            className={cn(
              "items-center justify-center",
              state === "expanded" ? "grow mr-2 ml-2" : "w-full"
            )}
          >
            {state === "expanded" ? (
              <>
                <Star className="text-yellow-400 h-4 w-4 mr-1" />
                Star on
                <a
                  href="https://github.com/nikhils4/ui-beats"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: githubSvg }}
                    className="h-4 w-4 ml-1"
                  />
                  <span className="sr-only">GitHub</span>
                </a>
              </>
            ) : (
              <a
                href="https://github.com/nikhils4/ui-beats"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  dangerouslySetInnerHTML={{ __html: githubSvg }}
                  className="h-4 w-4"
                />
                <span className="sr-only">GitHub</span>
              </a>
            )}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

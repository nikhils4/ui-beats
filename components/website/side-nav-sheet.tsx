"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { sideNav } from "@/config/side-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export const SideNavSheet = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger
        className="md:hidden hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
        type="button"
      >
        <Menu className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] overflow-y-auto">
        <div className="p-4 flex flex-col">
          <SheetClose asChild>
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <Image
                src="/uibeats-logo.png"
                width={20}
                height={20}
                alt="UI Beats logo"
                className="rounded-sm bg-white"
              />

              <div className="flex justify-center items-center font-bold">
                <div className="mr-2">UI Beats</div>
                <Badge className="text-[10px]" variant="outline">
                  Beta
                </Badge>
              </div>
            </Link>
          </SheetClose>
          <nav className="flex-1 ">
            <div className="min-w-[100%] table !mt-0">
              {sideNav.map(({ subItems, title }) => (
                <div className="flex flex-col space-y-3 pt-6" key={title}>
                  <h4 className="font-medium">{title}</h4>
                  {subItems?.map(({ path, title, isNew }) => (
                    <SheetClose asChild key={path}>
                      <Link
                        href={path}
                        className={`hover:text-foreground flex items-center ${
                          path === pathname
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        <span className="text-sm">{title}</span>
                        {isNew && (
                          <Badge
                            variant="outline"
                            className="ml-2 px-1 py-0 text-[9px] font-medium bg-emerald-100 text-emerald-700 border-emerald-300 rounded-sm leading-tight self-start mt-1"
                          >
                            New
                          </Badge>
                        )}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              ))}
            </div>
          </nav>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

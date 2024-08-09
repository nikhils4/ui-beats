"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRightFromLine } from "lucide-react";
import { sideNav } from "@/config/side-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideNavSheet = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger
        className="md:hidden hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
        type="button"
      >
        <ArrowRightFromLine className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px]">
        <div className="p-4 flex flex-col">
          <div className="mb-2">{/*TODO: LOGO*/}</div>
          <nav className="flex-1 ">
            <div className="min-w-[100%] table !mt-0">
              {sideNav.map(({ subItems, title }) => (
                <div className="flex flex-col space-y-3 pt-6" key={title}>
                  <h4 className="font-medium">{title}</h4>
                  {subItems?.map(({ path, title }) => (
                    <SheetClose asChild key={path}>
                      <Link
                        href={path}
                        className={`hover:text-foreground ${
                          path === pathname
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {title}
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

"use client";
import { sideNav } from "@/config/side-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export const SideNav = () => {
  const pathname = usePathname();

  return (
    <div className="min-w-[100%] table">
      <div className="w-full">
        {sideNav.map(({ subItems, title }) => (
          <div className="pb-4" key={title}>
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              {title}
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {subItems.map(({ path, title, isNew }) => (
                <Link
                  className={`group flex w-full items-center rounded-md border border-transparent px-2 py-1 ${
                    path === pathname
                      ? "text-foreground"
                      : "text-muted-foreground"
                  } hover:text-foreground`}
                  target=""
                  rel=""
                  href={path}
                  key={path}
                >
                  {title}
                  {isNew && (
                    <span className="ml-2 flex items-center">
                      <Badge
                        variant="outline"
                        className="px-1 py-0 text-[9px] font-medium bg-emerald-100 text-emerald-700 border-emerald-300 rounded-sm leading-tight"
                      >
                        New
                      </Badge>
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

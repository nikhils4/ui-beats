"use client";
import { sideNav } from "@/config/side-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
              {subItems.map(({ path, title }) => (
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
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

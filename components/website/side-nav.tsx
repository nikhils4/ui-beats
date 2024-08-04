import { sideNav } from "@/config/side-nav";
import Link from "next/link";

export const SideNav = () => {
  return (
    <div className="min-w-[100%] table">
      <div className="w-full">
        {sideNav.map(({ subItems, title }) => (
          <div className="pb-4" key={title}>
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              {title}
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {/*TODO: Selected path highlighting*/}
              {subItems.map(({ path, title }) => (
                <Link
                  className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:text-foreground"
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

import { Fragment } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

export interface DocsCrumb {
  label: string;
  /** Omitted on the last crumb, which is the current page. */
  href?: string;
}

/**
 * The breadcrumb row every docs page opens with.
 *
 * Two things it fixes over the copies it replaces. The sidebar trigger used to
 * be a direct child of `BreadcrumbList`, which renders an `<ol>`. A `<button>`
 * is not a valid child of a list, and screen readers announced the trail as
 * having an extra, nameless item. It sits beside the list now. And the crumb
 * links were plain `<a>` elements, so clicking "Docs" from a component page
 * threw away the client-side router and reloaded the whole shell.
 */
export function DocsBreadcrumb({ items }: { items: DocsCrumb[] }) {
  return (
    <div className="flex items-center gap-1">
      <SidebarTrigger className="-ml-1.5 size-7 shrink-0 text-muted-foreground" />
      <Breadcrumb>
        <BreadcrumbList className="text-xs sm:gap-1.5">
          {items.map((item, index) => (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 ? <BreadcrumbSeparator /> : null}
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="font-medium">
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

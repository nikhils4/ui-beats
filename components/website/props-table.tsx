import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ComponentProp } from "@/types/component-config.type";

/**
 * Placeholders the content files use for "this prop has no default". `''` is
 * deliberately absent: an empty string *is* a default and is worth showing.
 */
const NO_DEFAULT = new Set(["", "-", "--", "–", "—", "none", "n/a"]);

/** Content files mark a required prop by ending its description "(required)". */
const REQUIRED_SUFFIX = /\s*\(required\)\.?\s*$/i;

interface DescribedProp extends ComponentProp {
  required: boolean;
  hasDefault: boolean;
}

function describe(prop: ComponentProp): DescribedProp {
  return {
    ...prop,
    // Pulled out of the prose and shown as a mark on the name, so it is
    // scannable down the first column instead of buried at the end of a
    // sentence in the last one.
    description: prop.description.replace(REQUIRED_SUFFIX, ""),
    required: REQUIRED_SUFFIX.test(prop.description),
    hasDefault: !NO_DEFAULT.has(prop.defaultValue.trim().toLowerCase()),
  };
}

export function PropsTable({ props }: { props: ComponentProp[] }) {
  if (props.length === 0) {
    return (
      <p className="rounded-xl border border-dashed px-5 py-6 text-sm text-muted-foreground">
        This component takes no props. Drop it in and it works.
      </p>
    );
  }

  const rows = props.map(describe);
  const hasRequired = rows.some((row) => row.required);

  return (
    <div className="min-w-0">
      {/* The table scrolls inside this box rather than widening the page. */}
      <div className="relative w-full max-w-full overflow-hidden rounded-xl border bg-card shadow-subtle">
        {/*
          On a phone the table is always wider than the screen, and a hard clip
          at the border gives no hint that the last two columns exist. The fade
          reads as "there is more this way".
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-card to-transparent md:hidden"
        />
        <Table className="min-w-[44rem]">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[22%] px-4 text-xs tracking-wide uppercase">
                Prop
              </TableHead>
              <TableHead className="w-[26%] px-4 text-xs tracking-wide uppercase">
                Type
              </TableHead>
              <TableHead className="w-[14%] px-4 text-xs tracking-wide uppercase">
                Default
              </TableHead>
              <TableHead className="px-4 text-xs tracking-wide uppercase">
                Description
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.prop} className="align-top">
                <TableCell className="px-4 py-3.5 align-top font-mono text-xs font-medium text-brand">
                  {row.prop}
                  {row.required ? (
                    <>
                      <span aria-hidden="true" className="text-destructive">
                        *
                      </span>
                      <span className="sr-only"> (required)</span>
                    </>
                  ) : null}
                </TableCell>
                <TableCell className="px-4 py-3.5 align-top font-mono text-xs break-words text-muted-foreground">
                  {row.type}
                </TableCell>
                <TableCell className="px-4 py-3.5 align-top font-mono text-xs">
                  {row.hasDefault ? (
                    <span className="rounded-md border bg-muted/60 px-1.5 py-0.5 break-words text-foreground/80">
                      {row.defaultValue}
                    </span>
                  ) : (
                    <span className="text-muted-foreground/60">
                      <span aria-hidden="true">—</span>
                      <span className="sr-only">No default</span>
                    </span>
                  )}
                </TableCell>
                <TableCell className="px-4 py-3.5 align-top text-sm leading-relaxed">
                  {row.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {hasRequired ? (
        <p className="mt-2.5 text-xs text-muted-foreground">
          <span aria-hidden="true" className="text-destructive">
            *
          </span>{" "}
          Required.
        </p>
      ) : null}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CATEGORY_META } from "@/config/categories";
import { cn } from "@/lib/utils";
import type { ComponentCategory } from "@/types/component-config.type";

/**
 * The studio's component switcher.
 *
 * A native `<select>` was doing this job, which meant the one control the tool
 * is built around rendered as an operating-system menu: unstyleable, wrong in
 * dark mode, and with no way to search thirty-four entries. This is a combobox:
 * type to filter, arrow keys to move, grouped by category with the icon each
 * category already uses in the sidebar.
 */

export interface PickerItem {
  name: string;
  category: string;
  title: string;
}

interface ComponentPickerProps {
  items: PickerItem[];
  /** `category/name`. */
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const keyOf = (item: PickerItem) => `${item.category}/${item.name}`;

export function ComponentPicker({
  items,
  value,
  onChange,
  className,
}: ComponentPickerProps) {
  const [open, setOpen] = useState(false);

  const selected = items.find((item) => keyOf(item) === value);

  const grouped = useMemo(() => {
    const map = new Map<string, PickerItem[]>();
    for (const item of items) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return [...map.entries()];
  }, [items]);

  const SelectedIcon = selected
    ? CATEGORY_META[selected.category as ComponentCategory]?.icon
    : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          // No explicit `role="combobox"`: Radix's trigger already sets
          // `aria-haspopup="dialog"`, `aria-expanded` and `aria-controls`,
          // which is the honest description of a button that opens a panel
          // containing a listbox. Claiming `combobox` here would promise
          // attributes this element does not own.
          aria-label="Choose a component"
          className={cn(
            "flex w-full items-center gap-2 rounded-lg border bg-background px-3 py-2 text-left text-sm shadow-subtle transition-colors outline-none",
            "hover:border-brand/40 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30",
            className,
          )}
        >
          {SelectedIcon ? (
            <SelectedIcon className="size-4 shrink-0 text-brand" />
          ) : null}
          <span className="min-w-0 flex-1 truncate font-medium">
            {selected?.title ?? "Choose a component"}
          </span>
          <ChevronsUpDown className="size-3.5 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="p-0"
        // Match the trigger's width so the list lines up under it rather than
        // floating at some arbitrary size.
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command
          // Search names and titles together, so "flip" and "Flip Card" both
          // find it, and so does the category.
          filter={(itemValue, search) =>
            itemValue.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }
        >
          <CommandInput placeholder="Search components..." />
          <CommandList className="max-h-72">
            <CommandEmpty>No component found.</CommandEmpty>
            {grouped.map(([category, list]) => {
              const Icon = CATEGORY_META[category as ComponentCategory]?.icon;
              const label =
                CATEGORY_META[category as ComponentCategory]?.label ?? category;

              return (
                <CommandGroup key={category} heading={label}>
                  {list.map((item) => {
                    const itemKey = keyOf(item);
                    return (
                      <CommandItem
                        key={itemKey}
                        // cmdk matches on this string, so it carries the
                        // category as well as the name.
                        value={`${item.title} ${item.name} ${label}`}
                        onSelect={() => {
                          onChange(itemKey);
                          setOpen(false);
                        }}
                        className="gap-2"
                      >
                        {Icon ? (
                          <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                        ) : null}
                        <span className="min-w-0 flex-1 truncate">
                          {item.title}
                        </span>
                        {itemKey === value ? (
                          <Check className="size-3.5 shrink-0 text-brand" />
                        ) : null}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

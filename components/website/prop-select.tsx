"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * The dropdown for a string-literal union prop.
 *
 * A native `<select>` renders as an operating-system menu: it ignores the
 * theme, looks wrong in dark mode, and sat directly under the styled component
 * picker looking like a different product. These lists are two to four items,
 * so this needs no search, just a button and a panel that match everything
 * around them.
 */
interface PropSelectProps {
  id: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

export function PropSelect({
  id,
  value,
  options,
  onChange,
  className,
}: PropSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          className={cn(
            "flex w-full items-center gap-2 rounded-lg border bg-background px-2.5 py-1.5 text-left font-mono text-xs shadow-subtle transition-colors outline-none",
            "hover:border-brand/40 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30",
            className,
          )}
        >
          <span className="min-w-0 flex-1 truncate">{value}</span>
          <ChevronDown
            className={cn(
              "size-3.5 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="p-1"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <ul role="listbox" aria-activedescendant={`${id}-${value}`}>
          {options.map((option) => (
            <li key={option}>
              <button
                id={`${id}-${option}`}
                type="button"
                role="option"
                aria-selected={option === value}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left font-mono text-xs transition-colors",
                  option === value
                    ? "bg-brand-subtle text-brand"
                    : "hover:bg-accent",
                )}
              >
                <span className="min-w-0 flex-1 truncate">{option}</span>
                {option === value ? (
                  <Check className="size-3.5 shrink-0" />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

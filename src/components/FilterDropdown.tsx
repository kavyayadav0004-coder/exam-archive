"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterDropdownProps<T extends string | number> {
  label: string;
  options: T[];
  selected: T[];
  onChange: (values: T[]) => void;
}

export function FilterDropdown<T extends string | number>({
  label,
  options,
  selected,
  onChange,
}: FilterDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function toggle(value: T) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  const isActive = selected.length > 0;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-8 items-center gap-1.5 border px-2.5 text-[13px] transition-colors",
          isActive
            ? "border-foreground bg-foreground text-background"
            : "border-border bg-background text-foreground hover:border-border-strong",
        )}
      >
        {label}
        {isActive && (
          <span className="mono-badge flex h-4 min-w-4 items-center justify-center bg-background px-1 text-[10px] text-foreground">
            {selected.length}
          </span>
        )}
        <ChevronDown size={13} strokeWidth={2} />
      </button>

      {open && (
        <div className="animate-dropdown-in absolute left-0 z-40 mt-1 max-h-64 w-48 overflow-y-auto border border-border bg-background py-1 shadow-[0_4px_16px_rgba(0,0,0,0.08)] scrollbar-thin">
          {selected.length > 0 && (
            <button
              onClick={() => onChange([])}
              className="w-full border-b border-border px-3 py-1.5 text-left text-[12px] text-muted hover:bg-surface"
            >
              Clear selection
            </button>
          )}
          {options.map((option) => {
            const checked = selected.includes(option);
            return (
              <button
                key={option}
                onClick={() => toggle(option)}
                className="flex w-full items-center justify-between px-3 py-1.5 text-left text-[13px] hover:bg-surface"
              >
                <span>{option}</span>
                {checked && <Check size={13} strokeWidth={2.5} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

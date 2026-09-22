"use client";

import { Plus } from "lucide-react";

interface NavbarProps {
  onUploadClick: () => void;
  paperCount: number;
}

const NAV_LINKS = [
  { label: "Browse", href: "#browse" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Contribute", href: "#contribute" },
];

export function Navbar({ onUploadClick, paperCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-none">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <a href="#top" className="flex items-center gap-0.5">
            <span className="text-[15px] font-semibold tracking-tight lowercase">prior</span>
            <span className="stamp-dot text-[20px] leading-none">.</span>
            <span className="mono-badge ml-2 hidden text-subtle sm:inline">
              {paperCount.toLocaleString("en-IN")} on record
            </span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onUploadClick}
            className="flex h-8 items-center gap-1.5 border border-signal bg-signal px-3 text-[13px] font-medium text-white transition-colors hover:bg-signal/90"
          >
            <Plus size={14} strokeWidth={2.5} />
            Add to the record
          </button>
        </div>
      </div>
    </header>
  );
}
"use client";

import { FileStack, Plus } from "lucide-react";

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
          <a href="#top" className="flex items-center gap-2">
            <FileStack size={18} strokeWidth={2} />
            <span className="text-[14px] font-semibold tracking-tight">
              Exam Archive
            </span>
            <span className="mono-badge hidden text-subtle sm:inline">
              {paperCount.toLocaleString("en-IN")} papers
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
            className="flex h-8 items-center gap-1.5 border border-foreground bg-foreground px-3 text-[13px] font-medium text-background transition-colors hover:bg-foreground/85"
          >
            <Plus size={14} strokeWidth={2.5} />
            Upload Paper
          </button>
        </div>
      </div>
    </header>
  );
}

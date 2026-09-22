"use client";

import { LegalDoc } from "./LegalModal";

interface FooterProps {
  onOpenLegal: (doc: LegalDoc) => void;
}

const LINKS: { label: string; doc: LegalDoc }[] = [
  { label: "Privacy Policy", doc: "privacy" },
  { label: "Terms of Service", doc: "terms" },
  { label: "DMCA Takedown Policy", doc: "dmca" },
  { label: "Contact", doc: "contact" },
];

export function Footer({ onOpenLegal }: FooterProps) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 px-4 py-6 sm:flex-row sm:items-center sm:px-6">
        <p className="mono-badge text-subtle">
          prior<span className="stamp-dot">.</span> &middot; student-contributed, reviewed before it's live
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {LINKS.map((link) => (
            <button
              key={link.doc}
              onClick={() => onOpenLegal(link.doc)}
              className="text-[13px] text-muted hover:text-foreground"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </footer>
  );
}
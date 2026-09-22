"use client";

import { Search, Eye, Flag, UploadCloud } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Find the pattern",
    body: "Filter by class, board, subject, and exam type. Every school has a type of question it keeps asking.",
  },
  {
    icon: Eye,
    title: "Read it before you sit it",
    body: "Preview inline, or download straight to your device.",
  },
  {
    icon: Flag,
    title: "Flag what's wrong",
    body: "Every card has a report button — personal data, answer keys, or bad tags get pulled fast.",
  },
];

interface InfoSectionsProps {
  onUploadClick: () => void;
}

export function InfoSections({ onUploadClick }: InfoSectionsProps) {
  return (
    <>
      <section id="how-it-works" className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
          <h2 className="text-[16px] font-semibold">Your teacher has a type. This is how you find it.</h2>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.title} className="border border-border p-4">
                <step.icon size={18} strokeWidth={1.75} className="text-subtle" />
                <h3 className="mt-3 text-[13.5px] font-medium">{step.title}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contribute" className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 px-4 py-10 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="text-[16px] font-semibold">Put one on the record</h2>
            <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-muted">
              Upload a paper in under a minute — tag the class, board, subject, and exam type,
              and confirm it&apos;s free of personal information. Every three papers you unlock
              earns you a Contributor mark.
            </p>
          </div>
          <button
            onClick={onUploadClick}
            className="flex h-9 shrink-0 items-center gap-1.5 border border-signal bg-signal px-4 text-[13px] font-medium text-white transition-colors hover:bg-signal/90"
          >
            <UploadCloud size={14} strokeWidth={2} />
            Add a paper
          </button>
        </div>
      </section>
    </>
  );
}
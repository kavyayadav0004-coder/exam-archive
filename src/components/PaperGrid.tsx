"use client";

import { SearchX, FileStack, UploadCloud } from "lucide-react";
import { ExamPaper } from "@/types";
import { PaperCard } from "./PaperCard";

interface PaperGridProps {
  papers: ExamPaper[];
  hasAnyPapers: boolean;
  onView: (paper: ExamPaper) => void;
  onReport: (paper: ExamPaper) => void;
  onClearFilters: () => void;
  onUploadClick: () => void;
}

export function PaperGrid({
  papers,
  hasAnyPapers,
  onView,
  onReport,
  onClearFilters,
  onUploadClick,
}: PaperGridProps) {
  if (papers.length === 0 && !hasAnyPapers) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-border py-20 text-center">
        <FileStack size={22} strokeWidth={1.5} className="text-subtle" />
        <p className="mt-3 text-[13.5px] font-medium">Nothing on the record yet</p>
        <p className="mt-1 max-w-xs text-[13px] text-muted">
          Be the first entry. It goes live the moment you upload.
        </p>
        <button
          onClick={onUploadClick}
          className="mt-4 flex items-center gap-1.5 border border-signal bg-signal px-3 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-signal/90"
        >
          <UploadCloud size={13} strokeWidth={2} />
          Add a paper
        </button>
      </div>
    );
  }

  if (papers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-border py-20 text-center">
        <SearchX size={22} strokeWidth={1.5} className="text-subtle" />
        <p className="mt-3 text-[13.5px] font-medium">Nothing matches, yet</p>
        <p className="mt-1 text-[13px] text-muted">Try a different subject, class, or search term.</p>
        <button
          onClick={onClearFilters}
          className="mt-4 border border-border px-3 py-1.5 text-[13px] hover:border-border-strong hover:bg-surface"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {papers.map((paper) => (
        <PaperCard key={paper.id} paper={paper} onView={onView} onReport={onReport} />
      ))}
    </div>
  );
}
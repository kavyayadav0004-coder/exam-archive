"use client";

import { Download, Eye, Flag, FileText, ImageIcon } from "lucide-react";
import { ExamPaper } from "@/types";
import { formatDate, formatFileSize } from "@/lib/utils";
import { serialFor } from "@/lib/serial";

interface PaperCardProps {
  paper: ExamPaper;
  onView: (paper: ExamPaper) => void;
  onReport: (paper: ExamPaper) => void;
}

export function PaperCard({ paper, onView, onReport }: PaperCardProps) {
  const FileIcon = paper.fileKind === "pdf" ? FileText : ImageIcon;

  return (
    <div className="group flex flex-col border border-border bg-background transition-[border-color,box-shadow] duration-150 hover:border-border-strong hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between gap-2 border-b border-border p-3">
        <div className="flex min-w-0 items-start gap-2">
          <FileIcon size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-subtle" />
          <div className="min-w-0">
            <h3 className="truncate text-[13.5px] font-medium leading-snug" title={paper.title}>
              {paper.title}
            </h3>
            <p className="mono-badge mt-0.5 truncate text-subtle">{paper.school}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 px-3 pt-2.5">
        <Tag>Class {paper.class}</Tag>
        <Tag>{paper.board}</Tag>
        <Tag>{paper.subject}</Tag>
        <Tag signal>{paper.examType}</Tag>
      </div>

      <div className="mono-badge flex items-center justify-between px-3 pt-2.5 text-subtle">
        <span>{serialFor(paper)}</span>
      </div>

      <div className="mono-badge flex items-center justify-between px-3 pb-3 pt-1.5 text-subtle">
        <span>{formatDate(paper.uploadDate)}</span>
        <span>{formatFileSize(paper.fileSizeKb)}</span>
      </div>

      <div className="mt-auto flex border-t border-border">
        <button
          onClick={() => onView(paper)}
          className="flex flex-1 items-center justify-center gap-1.5 border-r border-border py-2 text-[12.5px] font-medium transition-colors hover:bg-surface"
        >
          <Eye size={13} strokeWidth={2} />
          View
        </button>
        <a
          href={paper.fileUrl}
          download={paper.fileName}
          className="flex flex-1 items-center justify-center gap-1.5 border-r border-border py-2 text-[12.5px] font-medium transition-colors hover:bg-surface"
        >
          <Download size={13} strokeWidth={2} />
          Download
        </a>
        <button
          onClick={() => onReport(paper)}
          aria-label="Report or request removal"
          title="Report / request removal"
          className="flex w-9 items-center justify-center text-subtle transition-colors hover:bg-danger-bg hover:text-danger"
        >
          <Flag size={13} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

function Tag({ children, signal }: { children: React.ReactNode; signal?: boolean }) {
  return (
    <span
      className={
        signal
          ? "mono-badge border border-signal bg-signal px-1.5 py-0.5 text-white"
          : "mono-badge border border-border px-1.5 py-0.5 text-muted"
      }
    >
      {children}
    </span>
  );
}
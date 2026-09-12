"use client";

import { Download, FileText, ImageIcon } from "lucide-react";
import { ExamPaper } from "@/types";
import { Modal } from "./Modal";
import { formatDate, formatFileSize } from "@/lib/utils";

interface ViewPaperModalProps {
  paper: ExamPaper;
  onClose: () => void;
}

export function ViewPaperModal({ paper, onClose }: ViewPaperModalProps) {
  const FileIcon = paper.fileKind === "pdf" ? FileText : ImageIcon;

  return (
    <Modal
      title={paper.title}
      subtitle={paper.school}
      onClose={onClose}
      widthClass="max-w-2xl"
      footer={
        <div className="flex items-center justify-between">
          <span className="mono-badge text-subtle">
            {paper.fileName} &middot; {formatFileSize(paper.fileSizeKb)}
          </span>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            download={paper.fileName}
            className="flex h-8 items-center gap-1.5 border border-foreground bg-foreground px-3 text-[13px] font-medium text-background hover:bg-foreground/85"
          >
            <Download size={13} strokeWidth={2} />
            Download
          </a>
        </div>
      }
    >
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5">
          <span className="mono-badge border border-border px-1.5 py-0.5 text-muted">
            Class {paper.class}
          </span>
          <span className="mono-badge border border-border px-1.5 py-0.5 text-muted">
            {paper.board}
          </span>
          <span className="mono-badge border border-border px-1.5 py-0.5 text-muted">
            {paper.subject}
          </span>
          <span className="mono-badge border border-foreground bg-foreground px-1.5 py-0.5 text-background">
            {paper.examType}
          </span>
        </div>

        <div className="mt-4 flex flex-col items-center justify-center gap-3 border border-dashed border-border bg-surface py-16 text-center">
          <FileIcon size={30} strokeWidth={1.25} className="text-subtle" />
          <div>
            <p className="text-[13px] font-medium">
              Preview unavailable in this demo
            </p>
            <p className="mt-1 max-w-xs text-[12.5px] text-muted">
              In production this pane renders the {paper.fileKind === "pdf" ? "PDF" : "image"}{" "}
              inline, page by page ({paper.pages} page{paper.pages === 1 ? "" : "s"} total).
            </p>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-y-2 border-t border-border pt-3 text-[12.5px] sm:grid-cols-3">
          <Detail label="Uploaded" value={formatDate(paper.uploadDate)} />
          <Detail label="Downloads" value={paper.downloads.toLocaleString("en-IN")} />
          <Detail label="Pages" value={String(paper.pages)} />
        </dl>
      </div>
    </Modal>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-subtle">{label}</dt>
      <dd className="mono-badge mt-0.5">{value}</dd>
    </div>
  );
}

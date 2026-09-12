"use client";

import { useState } from "react";
import { Download, AlertTriangle } from "lucide-react";
import { ExamPaper } from "@/types";
import { Modal } from "./Modal";
import { formatDate, formatFileSize } from "@/lib/utils";

interface ViewPaperModalProps {
  paper: ExamPaper;
  onClose: () => void;
}

export function ViewPaperModal({ paper, onClose }: ViewPaperModalProps) {
  const [loadFailed, setLoadFailed] = useState(false);

  return (
    <Modal
      title={paper.title}
      subtitle={paper.school}
      onClose={onClose}
      widthClass="max-w-3xl"
      footer={
        <div className="flex items-center justify-between">
          <span className="mono-badge text-subtle">
            {paper.fileName} &middot; {formatFileSize(paper.fileSizeKb)}
          </span>
          <a
            href={paper.fileUrl}
            download={paper.fileName}
            className="flex h-8 items-center gap-1.5 border border-foreground bg-foreground px-3 text-[13px] font-medium text-background transition-colors hover:bg-foreground/85"
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

        <div className="mt-4 overflow-hidden border border-border bg-surface">
          {loadFailed ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <AlertTriangle size={22} strokeWidth={1.5} className="text-subtle" />
              <p className="text-[13px] font-medium">Couldn&apos;t load the preview</p>
              <p className="max-w-xs text-[12.5px] text-muted">
                Try the download button below instead.
              </p>
            </div>
          ) : paper.fileKind === "pdf" ? (
            <iframe
              src={`${paper.fileUrl}#toolbar=0`}
              title={paper.title}
              className="h-[65vh] w-full"
              onError={() => setLoadFailed(true)}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={paper.fileUrl}
              alt={paper.title}
              className="mx-auto max-h-[65vh] w-auto object-contain"
              onError={() => setLoadFailed(true)}
            />
          )}
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

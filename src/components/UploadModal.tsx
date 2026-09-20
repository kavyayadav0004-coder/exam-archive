"use client";

import { useRef, useState } from "react";
import { UploadCloud, FileText, ImageIcon, X } from "lucide-react";
import {
  BOARDS,
  CLASSES,
  EXAM_TYPES,
  SUBJECTS,
  type BoardType,
  type ExamType,
  type SubjectType,
} from "@/types";
import type { NewPaperInput } from "@/lib/papers";
import { Modal } from "./Modal";

interface UploadModalProps {
  onClose: () => void;
  onUpload: (input: NewPaperInput) => Promise<void>;
}

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

export function UploadModal({ onClose, onUpload }: UploadModalProps) {
  const [title, setTitle] = useState("");
  const [school, setSchool] = useState("");
  const [cls, setCls] = useState<number | "">("");
  const [board, setBoard] = useState<BoardType | "">("");
  const [subject, setSubject] = useState<SubjectType | "">("");
  const [examType, setExamType] = useState<ExamType | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const canSubmit =
    title.trim().length > 3 &&
    cls !== "" &&
    board !== "" &&
    subject !== "" &&
    examType !== "" &&
    file !== null &&
    confirmed;

  function validateAndSetFile(candidate: File | undefined | null) {
    if (!candidate) return;
    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      setFileError("Only PDF, JPG, PNG, or WEBP files are accepted.");
      return;
    }
    if (candidate.size > 20 * 1024 * 1024) {
      setFileError("File must be under 20 MB.");
      return;
    }
    setFileError("");
    setFile(candidate);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    validateAndSetFile(e.dataTransfer.files?.[0]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !file || submitting) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      await onUpload({
        title: title.trim(),
        school: school.trim(),
        class: Number(cls),
        board: board as BoardType,
        subject: subject as SubjectType,
        examType: examType as ExamType,
        file,
      });
        } catch (err) {
          console.error(err);
          const msg = (err as { message?: string })?.message ?? "unknown error";
          setSubmitError(`Upload failed: ${msg}`);
          setSubmitting(false);
        }
  }

  const FileIcon = file?.type === "application/pdf" ? FileText : ImageIcon;

  return (
    <Modal
      title="Upload a paper"
      subtitle="Anyone can view papers you upload. Make sure you have the right to share it."
      onClose={onClose}
      widthClass="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-medium">Title</span>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="DPS Sushant Lok - Half Yearly 2025"
            className="h-9 border border-border px-2.5 text-[13px] transition-colors focus:border-foreground"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-medium">
            School <span className="text-subtle">(optional)</span>
          </span>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="Delhi Public School, Sushant Lok"
            className="h-9 border border-border px-2.5 text-[13px] transition-colors focus:border-foreground"
          />
        </label>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <label className="flex flex-col gap-1">
            <span className="text-[13px] font-medium">Class</span>
            <select
              required
              value={cls}
              onChange={(e) => setCls(e.target.value ? Number(e.target.value) : "")}
              className="h-9 border border-border bg-background px-2 text-[13px] transition-colors focus:border-foreground"
            >
              <option value="">Select</option>
              {CLASSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[13px] font-medium">Board</span>
            <select
              required
              value={board}
              onChange={(e) => setBoard(e.target.value as BoardType)}
              className="h-9 border border-border bg-background px-2 text-[13px] transition-colors focus:border-foreground"
            >
              <option value="">Select</option>
              {BOARDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[13px] font-medium">Subject</span>
            <select
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value as SubjectType)}
              className="h-9 border border-border bg-background px-2 text-[13px] transition-colors focus:border-foreground"
            >
              <option value="">Select</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[13px] font-medium">Exam Type</span>
            <select
              required
              value={examType}
              onChange={(e) => setExamType(e.target.value as ExamType)}
              className="h-9 border border-border bg-background px-2 text-[13px] transition-colors focus:border-foreground"
            >
              <option value="">Select</option>
              {EXAM_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium">File</span>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed px-4 py-8 text-center transition-colors ${
              dragActive ? "border-foreground bg-surface" : "border-border hover:bg-surface"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              className="hidden"
              onChange={(e) => validateAndSetFile(e.target.files?.[0])}
            />
            {file ? (
              <div className="flex items-center gap-2">
                <FileIcon size={16} strokeWidth={1.75} />
                <span className="text-[13px]">{file.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="text-subtle hover:text-foreground"
                  aria-label="Remove file"
                >
                  <X size={14} strokeWidth={2} />
                </button>
              </div>
            ) : (
              <>
                <UploadCloud size={22} strokeWidth={1.5} className="text-subtle" />
                <p className="text-[13px]">
                  Drag and drop a PDF or image, or{" "}
                  <span className="font-medium underline">browse files</span>
                </p>
                <p className="mono-badge text-subtle">PDF, JPG, PNG, WEBP up to 20 MB</p>
              </>
            )}
          </div>
          {fileError && <p className="text-[12.5px] text-danger">{fileError}</p>}
        </div>

        <label className="flex cursor-pointer items-start gap-2 border border-border px-2.5 py-2.5 has-[:checked]:border-foreground has-[:checked]:bg-surface">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-0.5 accent-black"
          />
          <span className="text-[12.5px] leading-snug">
            I confirm this paper contains no personal student names, roll numbers, or
            confidential answer keys.
          </span>
        </label>

        {submitError && <p className="text-[12.5px] text-danger">{submitError}</p>}

        <div className="flex items-center justify-end gap-2 border-t border-border pt-3">
          <button
            type="button"
            onClick={onClose}
            className="h-8 border border-border px-3 text-[13px] hover:bg-surface"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="h-8 border border-foreground bg-foreground px-3 text-[13px] font-medium text-background disabled:cursor-not-allowed disabled:border-border disabled:bg-border disabled:text-subtle"
          >
            {submitting ? "Uploading..." : "Upload paper"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
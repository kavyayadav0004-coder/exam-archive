"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { ExamPaper, REPORT_REASONS } from "@/types";
import { Modal } from "./Modal";
import { supabase } from "@/lib/supabase";

interface ReportModalProps {
  paper: ExamPaper;
  onClose: () => void;
}

export function ReportModal({ paper, onClose }: ReportModalProps) {
  const [reasonId, setReasonId] = useState<string>("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const canSubmit = reasonId !== "" && email.trim().length > 3;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setSubmitError("");
    const { error } = await supabase.from("reports").insert({
      paper_id: paper.id,
      reason_id: reasonId,
      reporter_email: email.trim(),
      details: details.trim() || null,
    });
    if (error) {
      setSubmitError("Couldn't submit the report. Try again.");
      setSubmitting(false);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Modal title="Report submitted" onClose={onClose}>
        <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
          <CheckCircle2 size={28} strokeWidth={1.5} className="text-success" />
          <p className="text-[13.5px] font-medium">We&apos;ve logged your report</p>
          <p className="max-w-xs text-[12.5px] text-muted">
            Our review team looks at takedown requests within 48 hours. We&apos;ll email
            {" "}
            {email} if we need more information.
          </p>
          <button
            onClick={onClose}
            className="mt-2 h-8 border border-foreground bg-foreground px-4 text-[13px] font-medium text-background hover:bg-foreground/85"
          >
            Done
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title="Report / request removal"
      subtitle={paper.title}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <fieldset>
          <legend className="mb-2 text-[13px] font-medium">Reason for report</legend>
          <div className="flex flex-col gap-1.5">
            {REPORT_REASONS.map((reason) => (
              <label
                key={reason.id}
                className="flex cursor-pointer items-center gap-2 border border-border px-2.5 py-1.5 text-[13px] has-[:checked]:border-foreground has-[:checked]:bg-surface"
              >
                <input
                  type="radio"
                  name="reason"
                  value={reason.id}
                  checked={reasonId === reason.id}
                  onChange={() => setReasonId(reason.id)}
                  className="accent-black"
                />
                {reason.label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-medium">Your email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@school.edu"
            className="h-9 border border-border px-2.5 text-[13px] transition-colors focus:border-foreground"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-medium">
            Details <span className="text-subtle">(optional)</span>
          </span>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={3}
            placeholder="Anything that helps us verify and act on this report"
            className="resize-none border border-border px-2.5 py-2 text-[13px] transition-colors focus:border-foreground"
          />
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
            {submitting ? "Submitting..." : "Submit report"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
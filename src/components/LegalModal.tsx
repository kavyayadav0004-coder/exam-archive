"use client";

import { Modal } from "./Modal";

export type LegalDoc = "privacy" | "terms" | "dmca" | "contact";

interface LegalModalProps {
  doc: LegalDoc;
  onClose: () => void;
}

const CONTENT: Record<LegalDoc, { title: string; body: React.ReactNode }> = {
  privacy: {
    title: "Privacy Policy",
    body: (
      <>
        <Para>
          Exam Archive stores the files, tags, and metadata you upload. We do not require an
          account to browse or download papers, and we do not sell user data to third parties.
        </Para>
        <Para>
          Uploaded files are scanned for identifying information before publication. If a paper
          slips through with personal details still visible, use the report button on that
          paper&apos;s card and we&apos;ll remove it.
        </Para>
        <Para>
          We keep basic access logs (IP address, timestamp, page requested) for 90 days to
          detect abuse, then delete them.
        </Para>
      </>
    ),
  },
  terms: {
    title: "Terms of Service",
    body: (
      <>
        <Para>
          By uploading a paper, you confirm you have the right to share it and that it does not
          contain any student&apos;s personal information or a live, unpublished answer key.
        </Para>
        <Para>
          You may not use Exam Archive to distribute copyrighted textbook content, question
          banks owned by coaching institutes, or material you do not have permission to share.
        </Para>
        <Para>
          We can remove any paper at our discretion, including in response to a valid takedown
          request, without prior notice.
        </Para>
      </>
    ),
  },
  dmca: {
    title: "DMCA Takedown Policy",
    body: (
      <>
        <Para>
          If you believe a paper on Exam Archive infringes your copyright or contains
          confidential material you own, use the &quot;Report / Request Removal&quot; button on
          the paper card, or email the address below.
        </Para>
        <Para>Include in your request:</Para>
        <ul className="list-disc space-y-1 pl-5 text-[13px] text-muted">
          <li>The specific paper (title or link)</li>
          <li>A description of the material and why it should be removed</li>
          <li>Your contact information and, if applicable, proof of ownership</li>
        </ul>
        <Para>We review takedown requests within 48 hours.</Para>
      </>
    ),
  },
  contact: {
    title: "Contact",
    body: (
      <>
        <Para>Questions, takedown requests, or partnership inquiries:</Para>
        <p className="mono-badge">support@examarchive.app</p>
        <Para>For urgent removal requests involving student data, mark your email urgent.</Para>
      </>
    ),
  },
};

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-[13px] leading-relaxed text-muted">{children}</p>;
}

export function LegalModal({ doc, onClose }: LegalModalProps) {
  const { title, body } = CONTENT[doc];
  return (
    <Modal title={title} onClose={onClose}>
      <div className="flex flex-col gap-3 p-4">{body}</div>
    </Modal>
  );
}

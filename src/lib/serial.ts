import { ExamPaper } from "@/types";

const SUBJECT_CODES: Record<string, string> = {
  Math: "MATH",
  Physics: "PHY",
  Chemistry: "CHEM",
  Biology: "BIO",
  "Computer Science": "CS",
  English: "ENG",
  "Social Science": "SST",
};

/** Deterministic display serial, e.g. PR-10-MATH-0381 */
export function serialFor(paper: ExamPaper): string {
  const subjectCode = SUBJECT_CODES[paper.subject] ?? "GEN";
  const hash = Array.from(paper.id).reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);
  const num = String(hash % 10000).padStart(4, "0");
  return `PR-${paper.class}-${subjectCode}-${num}`;
}
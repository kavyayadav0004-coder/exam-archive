export type BoardType = "CBSE" | "ICSE" | "IB" | "State Board" | "Other";

export type SubjectType =
  | "Math"
  | "Physics"
  | "Chemistry"
  | "Biology"
  | "Computer Science"
  | "English"
  | "Social Science";

export type ExamType = "Unit Test" | "Half-Yearly" | "Pre-Board" | "Final";

export type FileKind = "pdf" | "image";

export const CLASSES = Array.from({ length: 12 }, (_, i) => i + 1);

export const BOARDS: BoardType[] = [
  "CBSE",
  "ICSE",
  "IB",
  "State Board",
  "Other",
];

export const SUBJECTS: SubjectType[] = [
  "Math",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "Social Science",
];

export const EXAM_TYPES: ExamType[] = [
  "Unit Test",
  "Half-Yearly",
  "Pre-Board",
  "Final",
];

export interface ExamPaper {
  id: string;
  title: string;
  school: string;
  class: number;
  board: BoardType;
  subject: SubjectType;
  examType: ExamType;
  uploadDate: string; // ISO date
  fileKind: FileKind;
  fileName: string;
  fileSizeKb: number;
  pages: number;
  downloads: number;
}

export interface ReportReason {
  id: string;
  label: string;
}

export const REPORT_REASONS: ReportReason[] = [
  { id: "personal-info", label: "Contains student names or roll numbers" },
  { id: "answer-key", label: "Contains a confidential answer key" },
  { id: "copyright", label: "Copyright or ownership dispute" },
  { id: "wrong-metadata", label: "Incorrect class, board, or subject tag" },
  { id: "other", label: "Other" },
];

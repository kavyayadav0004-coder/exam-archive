import { supabase } from "./supabase";
import type { BoardType, ExamPaper, ExamType, SubjectType } from "@/types";

const TABLE = "papers";

export interface NewPaperInput {
  title: string;
  school: string;
  class: number;
  board: BoardType;
  subject: SubjectType;
  examType: ExamType;
  file: File;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromRow(r: any): ExamPaper {
  return {
    id: r.id,
    title: r.title,
    school: r.school,
    class: r.class,
    board: r.board,
    subject: r.subject,
    examType: r.exam_type,
    uploadDate: r.upload_date,
    fileKind: r.file_kind,
    fileName: r.file_name,
    fileSizeKb: r.file_size_kb,
    pages: r.pages,
    downloads: r.downloads,
    fileUrl: r.file_url,
  };
}

export async function fetchPapers(): Promise<ExamPaper[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("status", "approved")
    .order("upload_date", { ascending: false })
    .limit(500);
  if (error) throw error;
  return (data ?? []).map(fromRow);
}

export async function uploadPaper(input: NewPaperInput): Promise<void> {
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("school", input.school);
  formData.append("class", String(input.class));
  formData.append("board", input.board);
  formData.append("subject", input.subject);
  formData.append("examType", input.examType);
  formData.append("file", input.file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Upload failed (${res.status})`);
  }
}
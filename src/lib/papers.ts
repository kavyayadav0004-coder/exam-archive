import { supabase } from "./supabase";
import type { BoardType, ExamPaper, ExamType, SubjectType } from "@/types";

const BUCKET = "papers";
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
    .order("upload_date", { ascending: false })
    .limit(500);
  if (error) throw error;
  return (data ?? []).map(fromRow);
}

export async function uploadPaper(input: NewPaperInput): Promise<ExamPaper> {
  const { file } = input;
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${crypto.randomUUID()}-${safeName}`;

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (upErr) throw upErr;

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);

  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      title: input.title,
      school: input.school || "Unnamed school",
      class: input.class,
      board: input.board,
      subject: input.subject,
      exam_type: input.examType,
      upload_date: new Date().toISOString().slice(0, 10),
      file_kind: file.type === "application/pdf" ? "pdf" : "image",
      file_name: file.name,
      file_size_kb: Math.max(1, Math.round(file.size / 1024)),
      pages: 1,
      downloads: 0,
      file_url: pub.publicUrl,
      storage_path: path,
    })
    .select()
    .single();

  if (error) {
    await supabase.storage.from(BUCKET).remove([path]);
    throw error;
  }
  return fromRow(data);
}
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { detectFileMime } from "@/lib/fileValidation";
import { BOARDS, EXAM_TYPES, SUBJECTS } from "@/types";
import type { BoardType, ExamType, SubjectType } from "@/types";

const BUCKET = "papers";
const TABLE = "papers";
const MAX_SIZE = 20 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = String(formData.get("title") ?? "").trim();
    const school = String(formData.get("school") ?? "").trim() || "Unnamed school";
    const cls = Number(formData.get("class"));
    const board = String(formData.get("board") ?? "") as BoardType;
    const subject = String(formData.get("subject") ?? "") as SubjectType;
    const examType = String(formData.get("examType") ?? "") as ExamType;
    const file = formData.get("file") as File | null;

    if (title.length < 4 || title.length > 200) {
      return NextResponse.json({ error: "Invalid title" }, { status: 400 });
    }
    if (!Number.isInteger(cls) || cls < 1 || cls > 12) {
      return NextResponse.json({ error: "Invalid class" }, { status: 400 });
    }
    if (!BOARDS.includes(board)) {
      return NextResponse.json({ error: "Invalid board" }, { status: 400 });
    }
    if (!SUBJECTS.includes(subject)) {
      return NextResponse.json({ error: "Invalid subject" }, { status: 400 });
    }
    if (!EXAM_TYPES.includes(examType)) {
      return NextResponse.json({ error: "Invalid exam type" }, { status: 400 });
    }
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    const headerBytes = new Uint8Array(await file.slice(0, 4).arrayBuffer());
    const detectedMime = detectFileMime(headerBytes);
    if (!detectedMime) {
      return NextResponse.json({ error: "Unsupported or corrupted file" }, { status: 400 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${crypto.randomUUID()}-${safeName}`;

    const { error: upErr } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, file, { contentType: detectedMime, upsert: false });
    if (upErr) {
      return NextResponse.json({ error: upErr.message }, { status: 500 });
    }

    const { data: pub } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);

    const { error: insertErr } = await supabaseAdmin.from(TABLE).insert({
      title,
      school,
      class: cls,
      board,
      subject,
      exam_type: examType,
      upload_date: new Date().toISOString().slice(0, 10),
      file_kind: detectedMime === "application/pdf" ? "pdf" : "image",
      file_name: file.name,
      file_size_kb: Math.max(1, Math.round(file.size / 1024)),
      pages: 1,
      downloads: 0,
      file_url: pub.publicUrl,
      storage_path: path,
      status: "pending",
    });

    if (insertErr) {
      await supabaseAdmin.storage.from(BUCKET).remove([path]);
      return NextResponse.json({ error: insertErr.message }, { status: 500 });
    }

    return NextResponse.json({ pending: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
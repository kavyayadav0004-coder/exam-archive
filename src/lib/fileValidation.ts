const SIGNATURES: { hex: string; mime: string }[] = [
  { hex: "25504446", mime: "application/pdf" },
  { hex: "ffd8ffe0", mime: "image/jpeg" },
  { hex: "ffd8ffe1", mime: "image/jpeg" },
  { hex: "ffd8ffe2", mime: "image/jpeg" },
  { hex: "ffd8ffe3", mime: "image/jpeg" },
  { hex: "ffd8ffdb", mime: "image/jpeg" },
  { hex: "89504e47", mime: "image/png" },
  { hex: "52494646", mime: "image/webp" },
];

export function detectFileMime(bytes: Uint8Array): string | null {
  const hex = Array.from(bytes.slice(0, 4))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const match = SIGNATURES.find((s) => hex.startsWith(s.hex));
  return match?.mime ?? null;
}
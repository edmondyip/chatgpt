export type Status = "PASS" | "FAIL" | "NOT TESTED";
export interface Evidence {
  file: string;
  width?: number;
  height?: number;
}
export interface Criterion {
  id: string;
  label: string;
  status: Status;
  note: string;
  evidence: Evidence[];
}
export interface Report {
  version: 1;
  title: string;
  criteria: Criterion[];
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function label(value: unknown, max: number): value is string {
  return (
    typeof value === "string" && value.trim().length > 0 && value.length <= max
  );
}
function dimension(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}
function evidence(value: unknown): Evidence {
  if (
    !record(value) ||
    !label(value.file, 255) ||
    /[/\\\u0000-\u001f]/.test(value.file) ||
    !/\.(png|jpe?g|webp|txt|log)$/i.test(value.file)
  ) {
    throw Error("Evidence needs a local PNG, JPEG, WebP, TXT or LOG filename.");
  }
  const { file, width, height } = value;
  if (width === undefined && height === undefined) return { file };
  if (
    !dimension(width) ||
    !dimension(height) ||
    !/\.(png|jpe?g|webp)$/i.test(file)
  ) {
    throw Error("Screenshot checks require positive integer width and height.");
  }
  return { file, width, height };
}
export function parseReport(input: unknown): Report {
  if (
    !record(input) ||
    input.version !== 1 ||
    !label(input.title, 200) ||
    !Array.isArray(input.criteria) ||
    !input.criteria.length ||
    input.criteria.length > 100
  ) {
    throw Error("Use a version 1 report with a title and 1–100 criteria.");
  }
  const ids = new Set<string>();
  const criteria = input.criteria.map((item, index): Criterion => {
    if (
      !record(item) ||
      !label(item.id, 80) ||
      ids.has(item.id) ||
      !label(item.label, 400) ||
      (item.status !== "PASS" &&
        item.status !== "FAIL" &&
        item.status !== "NOT TESTED") ||
      typeof item.note !== "string" ||
      item.note.length > 4000 ||
      !Array.isArray(item.evidence) ||
      item.evidence.length > 12
    ) {
      throw Error(
        `Check criterion ${index + 1}: unique id, label, status, note and evidence list required.`,
      );
    }
    ids.add(item.id);
    const refs = item.evidence.map(evidence);
    if (new Set(refs.map((r) => r.file)).size !== refs.length)
      throw Error("Duplicate evidence filename in a criterion.");
    return {
      id: item.id,
      label: item.label,
      status: item.status,
      note: item.note,
      evidence: refs,
    };
  });
  return { version: 1, title: input.title, criteria };
}
export interface Attachment {
  name: string;
  url?: string;
  width?: number;
  height?: number;
  excerpt?: string;
}
export function checkEvidence(ref: Evidence, files: Map<string, Attachment>) {
  const found = files.get(ref.file);
  if (!found) return "Missing file";
  if (ref.width === undefined) return "Attached for review";
  return found.width === ref.width && found.height === ref.height
    ? "Dimensions verified"
    : "Dimension mismatch";
}
export function hasGap(row: Criterion, files: Map<string, Attachment>) {
  return (
    !row.evidence.length ||
    row.evidence.some((ref) => {
      const state = checkEvidence(ref, files);
      return state === "Missing file" || state === "Dimension mismatch";
    })
  );
}

import fictional from "../../../data/releaseproof/fictional.json";
import foundation from "../../../data/releaseproof/surv-001.json";
import {
  checkEvidence,
  hasGap,
  parseReport,
  type Attachment,
  type Criterion,
  type Report,
} from "./report";

const get = (id: string) => document.getElementById(id)!;
const reportInput = get("report-file") as HTMLInputElement;
const attachmentInput = get("attachments") as HTMLInputElement;
const files = new Map<string, Attachment>();
const reviewed = new Set<string>();
const gapFilter = get("gap-filter") as HTMLInputElement;
let report = parseReport(fictional);

function element<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  words?: string,
) {
  const node = document.createElement(tag);
  if (words !== undefined) node.textContent = words;
  return node;
}
function say(message: string) {
  get("notice").textContent = message;
}

function summary() {
  const counts = { PASS: 0, FAIL: 0, "NOT TESTED": 0 };
  let gaps = 0;
  let dimensions = 0;
  for (const row of report.criteria) {
    counts[row.status]++;
    if (hasGap(row, files)) gaps++;
    dimensions += row.evidence.filter(
      (ref) => checkEvidence(ref, files) === "Dimensions verified",
    ).length;
  }
  get("summary").textContent =
    `Reported: ${counts.PASS} PASS · ${counts.FAIL} FAIL · ${counts["NOT TESTED"]} NOT TESTED | Evidence gaps: ${gaps} criteria | Image sizes verified: ${dimensions} | Reviewed: ${reviewed.size}/${report.criteria.length}`;
}
function renderRow(row: Criterion) {
  const article = element("article");
  article.className = "review-row";
  const claim = element("div");
  claim.append(
    element("small", `${row.id} · Reported ${row.status}`),
    element("h3", row.label),
    element("p", row.note),
  );
  const box = element("input");
  box.type = "checkbox";
  box.checked = reviewed.has(row.id);
  box.addEventListener("change", () => {
    if (box.checked) reviewed.add(row.id);
    else reviewed.delete(row.id);
    summary();
  });
  const label = element("label");
  label.append(box, document.createTextNode("Reviewed this criterion"));
  claim.append(label);
  const evidence = element("div");
  evidence.append(element("small", "Evidence review"));
  if (!row.evidence.length)
    evidence.append(element("p", "No supporting file specified."));
  for (const ref of row.evidence) {
    const result = checkEvidence(ref, files);
    const info = element("p", `${ref.file} · ${result}`);
    if (result === "Missing file" || result === "Dimension mismatch")
      info.className = "gap";
    evidence.append(info);
    if (ref.width !== undefined)
      evidence.append(
        element("p", `Expected ${ref.width} × ${ref.height} pixels.`),
      );
    const found = files.get(ref.file);
    if (found?.url) {
      const img = element("img");
      img.src = found.url;
      img.alt = `Attached evidence: ${ref.file}`;
      evidence.append(
        img,
        element("p", `Measured ${found.width} × ${found.height} pixels.`),
      );
    }
    if (found?.excerpt !== undefined)
      evidence.append(element("pre", found.excerpt || "(empty text file)"));
  }
  article.append(claim, evidence);
  return article;
}
function draw() {
  get("report-title").textContent = report.title;
  const visible = gapFilter.checked
    ? report.criteria.filter(
        (row) => row.status === "PASS" && hasGap(row, files),
      )
    : report.criteria;
  get("criteria").replaceChildren(...visible.map(renderRow));
  if (!visible.length)
    get("criteria").append(
      element("p", "No reported passes with missing or mismatched files."),
    );
  summary();
}
function replaceReport(next: Report) {
  for (const file of files.values())
    if (file.url) URL.revokeObjectURL(file.url);
  files.clear();
  reviewed.clear();
  gapFilter.checked = false;
  report = next;
  draw();
  say("Loaded report. Select its evidence files to review the claims.");
}
async function readAttachment(file: File): Promise<Attachment> {
  if (file.size > 8 * 1024 * 1024) throw Error(`${file.name} exceeds 8 MiB.`);
  if (/\.(txt|log)$/i.test(file.name)) {
    return { name: file.name, excerpt: await file.slice(0, 2048).text() };
  }
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;
  bitmap.close();
  return { name: file.name, url: URL.createObjectURL(file), width, height };
}
async function attach(selected: File[]) {
  if (selected.length > 24) throw Error("Select up to 24 files per batch.");
  const names = new Set(
    report.criteria.flatMap((row) => row.evidence.map((ref) => ref.file)),
  );
  const staged: Attachment[] = [];
  const skipped: string[] = [];
  try {
    for (const file of selected) {
      if (!names.has(file.name)) {
        skipped.push(file.name);
        continue;
      }
      staged.push(await readAttachment(file));
    }
  } catch (error) {
    for (const item of staged) if (item.url) URL.revokeObjectURL(item.url);
    throw error;
  }
  for (const item of staged) {
    const previous = files.get(item.name);
    if (previous?.url) URL.revokeObjectURL(previous.url);
    files.set(item.name, item);
    for (const row of report.criteria) {
      if (row.evidence.some((ref) => ref.file === item.name))
        reviewed.delete(row.id);
    }
  }
  draw();
  say(
    `Attached ${staged.length} file(s).` +
      (skipped.length
        ? ` Unreferenced files skipped: ${skipped.join(", ")}.`
        : ""),
  );
}
async function importing(action: () => Promise<void>) {
  const controls = document.querySelectorAll<
    HTMLInputElement | HTMLButtonElement
  >(".review-tools input, .review-tools button");
  controls.forEach((c) => (c.disabled = true));
  try {
    await action();
  } catch (error) {
    say(error instanceof Error ? error.message : "Unable to read this file.");
  } finally {
    controls.forEach((c) => (c.disabled = false));
    reportInput.value = "";
    attachmentInput.value = "";
  }
}
reportInput.addEventListener(
  "change",
  () =>
    void importing(async () => {
      const file = reportInput.files?.[0];
      if (!file) return;
      if (file.size > 1024 * 1024) throw Error("Report exceeds 1 MiB.");
      replaceReport(parseReport(JSON.parse(await file.text())));
    }),
);
attachmentInput.addEventListener(
  "change",
  () => void importing(() => attach(Array.from(attachmentInput.files ?? []))),
);
gapFilter.addEventListener("change", draw);
async function openDemo() {
  replaceReport(parseReport(fictional));
  const cover = get("demo-cover") as HTMLImageElement;
  await cover.decode();
  files.set("demo-cover.png", {
    name: "demo-cover.png",
    url: cover.src,
    width: cover.naturalWidth,
    height: cover.naturalHeight,
  });
  draw();
  say("Fictional demo loaded with its sample cover.");
}
get("demo").addEventListener("click", () => void importing(openDemo));
get("foundation").addEventListener("click", () =>
  replaceReport(parseReport(foundation)),
);
void importing(openDemo);

import assert from "node:assert/strict";
import test from "node:test";
import {readFileSync} from "node:fs";
import {gross, proceeds, coverage, current, periods} from "../src/lib/ledger.ts";
import {checkEvidence, hasGap, parseReport} from "../src/lib/releaseproof/report.ts";
import sample from "../data/releaseproof/fictional.json" with { type:"json" };
import archived from "../data/releaseproof/surv-001.json" with { type:"json" };

const mixed = {...current, productSalesCents:1000,communitySupportCents:500,otherIncomeCents:250,
  platformFeesCents:100,paymentFeesCents:50,refundsCents:100,expensesCents:50,withdrawableCents:600,receivedCents:900};
test("each period remains unknown until reconciled",()=>{
  for(const p of periods) {
    assert.equal(gross(p),null); assert.equal(proceeds(p),null); assert.equal(coverage(p),null);
  }
  assert.equal(gross({...mixed,communitySupportCents:null}),null);
  assert.equal(coverage({...mixed,receivedCents:null}),null);
});
test("income streams combine once before existing deductions and settlement",()=>{
  assert.equal(gross(mixed),1750); assert.equal(proceeds(mixed),1450); assert.equal(coverage(mixed),.725);
  assert.equal(coverage({...mixed,withdrawableCents:0,receivedCents:1500}),.725);
  assert.equal(coverage({...mixed,withdrawableCents:0,receivedCents:0}),0);
  assert.equal(coverage({...mixed,refundsCents:1800}),0);
});
test("support alone counts, free claims contribute zero",()=>{
  const p={...mixed,productSalesCents:0,communitySupportCents:500,otherIncomeCents:0,
    platformFeesCents:0,paymentFeesCents:0,refundsCents:0,expensesCents:0,withdrawableCents:500,receivedCents:0};
  assert.equal(coverage(p),.25); assert.equal(proceeds({...p,communitySupportCents:0}),0);
});
test("archived sample matches each source criterion, status and observation",()=>{
  const source=readFileSync(new URL("../operations/verification/SURV-001.md",import.meta.url),"utf8");
  const rows=source.split("\n").filter(l=>/^\| [^|]+ \| (PASS|FAIL|NOT TESTED) \|/.test(l));
  assert.deepEqual(parseReport(archived).criteria.map(r=>[r.label,r.status,r.note]),rows.map(l=>l.split("|").slice(1,4).map(c=>c.trim())));
});
test("imports do not grant independent verification",()=>{
  const fake=structuredClone(sample);fake.criteria[0].verified=true;
  assert.equal("verified" in parseReport(fake).criteria[0],false);
});
test("rejects ambiguous or unsupported imports",()=>{
  for(const change of [r=>r.version=2,r=>r.criteria[0].id=r.criteria[1].id,r=>r.criteria[0].status=["PASS"],
    r=>r.criteria[0].evidence=[{file:"https://example.org/a.png"}],r=>r.criteria[0].evidence=[{file:"x.svg"}],
    r=>r.criteria[0].evidence=[{file:"a.png",width:1}],r=>r.criteria[0].evidence=[{file:"a.txt"},{file:"a.txt"}]]) {
    const copy=structuredClone(sample);change(copy);assert.throws(()=>parseReport(copy));
  }
});
test("only the file dimension check can verify a measurement",()=>{
  const [cover, undocumented, failed] = parseReport(sample).criteria;
  const files=new Map();const ref=cover.evidence[0];
  assert.equal(checkEvidence(ref,files),"Missing file");assert.equal(hasGap(undocumented,files),true);
  files.set(ref.file,{width:640,height:300});assert.equal(checkEvidence(ref,files),"Dimension mismatch");assert.equal(hasGap(cover,files),true);
  files.set(ref.file,{width:640,height:360});assert.equal(checkEvidence(ref,files),"Dimensions verified");assert.equal(hasGap(cover,files),false);
  files.set("save-test.log",{excerpt:"saved"});assert.equal(checkEvidence(failed.evidence[0],files),"Attached for review");assert.equal(failed.status,"FAIL");
});

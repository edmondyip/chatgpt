# SURV-001 · Finding the first paying customer

Decision brief for the owner, 24 November 2026. Test a **US$13 ComfyUI batch product-photo pack** first. Its advantage is a public route to people already using the underlying tool. Its biggest weakness is an excellent free single-image workflow. Authorize a timed comparison before investing in a finished download.

## What the owner's channels actually show

| Public surface | Observed evidence | Commercial implication |
| --- | --- | --- |
| [256pages blog](https://blog.256pages.com/) | Traditional Chinese coverage of ComfyUI workflows, SDXL, Unity MCP and game engines. | A short, practical before/after article fits the archive. Present-day reach is unknown. |
| [Medium](https://medium.com/@edmond.yip) | English articles about FLUX, ComfyUI, ControlNet and Unity MCP. | An English version can reach readers with the same problem. Public article presence gives no click-through estimate. |
| [Gumroad](https://edmondyip.gumroad.com/) | Public store showed several $5+ workflow or style downloads. The SDXL styles listing displayed 19 ratings when retrieved. | Strongest owner-specific signal of prior category engagement. Ratings reveal neither transaction prices nor willingness to buy this offer. All old listings belong to the owner. |
| [goodomo](https://goodomo.com/) | Site describes creator commerce and a private beta. Store examples are labelled fictional. | Potential future fulfilment route, subject to separate authorization and eligibility. Demo listings provide no buyer evidence. |
| [Mark Six](https://edmondyip.github.io/mark-six/) and [Game Pass calculator](https://edmondyip.github.io/xbox-game-pass-calculator/) | Public utility pages serve lottery simulation and subscription-price comparison. | Little reason for these visitors to want production workflows. Exclude them from the initial funnel. |
| Threads, X and Instagram | Owner identifies these as available channels. Audience fit, traffic and reach are unmeasured. | Start with one manually approved Threads post. Paid ads and unsolicited outreach offer poor economics here. |

## Comparative ranking

Ratings run from 1 (weak) to 5 (strong). Weighted score is the sum of each rating divided by five times its column weight. Speed and effort estimates assume existing hardware and one narrow supported workflow. Scores express judgment, not probabilities.

| Candidate | Demand 25 | Access 25 | Pay 20 | Speed 15 | Low upkeep 10 | Low owner time 5 | /100 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| ComfyUI batch product photos | 4 | 5 | 3 | 4 | 4 | 4 | **81** |
| Blender → Unity prop import check | 4 | 3 | 3 | 4 | 3 | 4 | **69** |
| Coding-agent handoff check | 4 | 3 | 2 | 4 | 4 | 4 | **67** |
| Subtitle delivery discrepancy report | 4 | 1 | 3 | 3 | 3 | 3 | **55** |
| Steam capsule sizing templates | 2 | 2 | 1 | 5 | 4 | 5 | **52** |

### 1. ComfyUI batch product photos · primary

**Buyer and job.** A freelance catalogue designer or small seller who already runs ComfyUI, has transparent cutouts of opaque packages and needs consistent square and portrait images for several SKUs. Generating backgrounds one image at a time can alter label text. Repeated compositing, cropping and naming can also consume time.

**What we observed.** Productfix's authors describe text and logo deformation and provide free corrective nodes. A worked free tutorial already supplies a separate-background compositing method and explains its edge defects. Photoroom explicitly gates batch export to paid plans. A Gumroad competitor offers a two-workflow product-photo kit with a guide; the retrieved listing displayed 13.50 with mixed currency markers, so we do not use it as a USD conversion. These sources support pain, alternatives and paid offers. None supplies conversion data for our proposed batch. [Productfix](https://github.com/MiddleKD/ComfyUI-productfix) · [Free worked example](https://howdoesaidothat.tech/guides/ai-product-photo-backgrounds/) · [Photoroom batch](https://help.photoroom.com/en/articles/11784338-what-is-the-batch-feature) · [Paid plans](https://www.photoroom.com/pricing) · [Competing kit](https://hanselcraft0.gumroad.com/l/tsuzyzh)

**Offer hypothesis.** US$13 once for a tested local workflow, reusable backdrops, two crop presets, SKU-based filenames, a contact sheet for inspection and a bilingual quick start. Use original assets and core nodes where feasible. Pin one tested version. Preserve labelled areas through compositing and test against a reference after the same geometric transform. Generic background generation alone has little commercial value.

**Build, support and risk.** Estimate half a day for a sample and 2–3 engineering days for a narrowly tested pack after approval. Buyers supply cutouts and an existing working installation. Expect questions about alpha edges, cropping and file paths. Exclude glass, reflective surfaces, custom installations and model redistribution from the first offer. Weak fit if readers mostly want new image-generation models, setup consumes the time saved, or free batch compositing matches our result.

**Evidence quality.** Strong adjacent channel fit, moderate problem evidence, weak evidence for this exact price and bundle. Test the time saving and paid intent separately using the protocol below.

### 2. Blender → Unity prop import check · fallback

**Buyer and job.** An indie environment artist receives a batch of static props and needs to catch incorrect scale, root orientation or changed child transforms before dressing a scene. A Unity discussion documents a hierarchy that defeated a common fix and examples of scale 100 and a rotated root. An open-source exporter already corrects coordinate conversion. Better FBX markets a much broader commercial importer/exporter. Buying a converter is only adjacent intent for a diagnostic pack. [Practitioner discussion](https://discussions.unity.com/t/export-from-blender-without-extra-rotation-scale/850581/7) · [Free exporter](https://github.com/EdyJ/blender-to-unity-fbx-exporter) · [Marketplace alternative](https://superhivemarket.com/products/better-fbx-importer--exporter)

**Proposed US$15 offer.** One read-only Unity Editor check, original scale and hierarchy fixtures, and a shareable per-prop report comparing import results to the artist's expected values. No exporter development. Estimate 2–4 days on one declared Blender/Unity version pair. Support risks include legitimate rotated pivots being flagged and requests for rig support. Exclude rigs and custom import pipelines initially.

**Acquisition and validation.** After approval, place an annotated failed/pass prop comparison beside the owner's Unity writing. Ask whether the reader already catches it for free and would pay $15 for a batch report. Proceed only after two independent artists describe recent rework and request the priced sample. Stop if the free exporter fixes every submitted static-prop case. Evidence is moderate for repeated pain, weak for payment or current readership.

### 3. Coding-agent handoff check

**Buyer and job.** A solo developer handing a repository between agents needs the next session to find unfinished tests, open decisions and the correct revision. A user specifically requested working-state continuity after compaction and described a hook workaround. Repomix packages code for free and RepoPrompt's open-source Community Edition already supports reviewable handoffs. A generic memory file or prompt pack has little advantage. [User request](https://github.com/anthropics/claude-code/issues/70555) · [Repomix](https://repomix.com/) · [RepoPrompt](https://repoprompt.com/)

**Narrow hypothesis.** US$9 for an offline documentation check that flags stale commit references, missing verification paths and contradictory release status in a handoff. Estimate 1–2 days for a local CLI and neutral sample repo. Expect support around Git history and monorepo layouts. The owner's coding-agent articles provide a plausible channel. Publish a sample broken handoff only after approval and ask whether two developers would pay to catch an error their current tool missed. Stop if they can reproduce the same check with a short script. Evidence is direct for pain, weak for price and narrower buyer reach than ComfyUI.

### 4. Subtitle delivery discrepancy report

**Buyer and job.** A freelance subtitler needs to show a client which translated cues overlap or exceed an agreed reading-speed limit. A working subtitler asked for a cheaper alternative after trying EZTitles and finding Subtitle Edit cumbersome for one job. Replies also describe using free settings successfully. EZTitles lists €30 for seven days. A professional suite's price provides limited evidence for paying for a report. [Practitioner discussion](https://www.proz.com/forum/subtitling/365210-which_software_for_subtitles_with_netflix_rules.html) · [EZTitles](https://eztitles.com/pricing) · [SubtitleNEXT feature comparison](https://subtitlenext.com/faq/)

**Possible US$12 utility.** Local browser comparison of two SRT files with client-configured thresholds and an exportable list of changed cues. Estimate 2–3 days plus language-specific testing. Professional standards, frame rates and differences in cue boundaries raise support costs. SRT alone cannot verify shot changes. No established owner channel reaches subtitlers. A sample report from fictional cues in a promotion-permitted professional forum could test demand after approval. Defer unless two working subtitlers identify the same paid reporting gap. Moderate problem evidence, weak access.

### 5. Steam capsule templates · reject

Indie game publishers need current artwork in many dimensions. A free Photoshop kit already provides smart objects, updated sizes and PNG export. Blank sizes and the official specifications are readily available. A hypothetical $5 template could take less than a day and fit an owner game-development post, but would depend on future format changes. Skip development and distribution unless a publisher identifies a reproducible submission problem these tools miss. Low evidence of incremental value. [Free production kit](https://www.kulturprodukt.net/steam-capsule-template) · [Valve specifications](https://partner.steamgames.com/doc/store/assets)

## First revenue experiment

1. **Before publication.** Prepare three original opaque package cutouts, two crops and a contact sheet. On the same machine, time the closest free method and the proposed workflow from the same prepared inputs through named exports. Record setup separately, active minutes, failed images, hardware and app version. Inspect all six exports at readable size. Stop if labels change, a crop clips a product, or active time falls by less than 30%. This is a proposed threshold, not a performance claim.
2. **Discover demand.** With owner approval, publish one bilingual comparison via the existing blog, link from a relevant article with permission, and share a Traditional Chinese Threads post. Use an English Medium excerpt for a second placement only if needed. Show the free method, limitations and US$13 proposed price. Invite a voluntary reply such as “I prepare this kind of catalogue and would buy it at $13.” No checkout or email collection is needed at this stage.
3. **Measure reach separately.** Use owner-provided aggregate article views or listing visits already available, tally source-labelled links/placements separately when available and count distinct explicit price-positive replies. No tracking script, customer list export or private identities in Git. After seven days, continue to a limited release if at least two plausible buyers ask for the priced pack. If reach is below 30 relevant visits or unavailable, try one alternate placement, record the denominator as unknown if necessary, and end the test after 14 days. If 30 relevant visits yield no intent, pivot. For one interested buyer, ask which missing outcome matters only with owner permission.
4. **Test the sale.** After owner approval, finish and verify the promised package before enabling a dedicated SKU and direct link. One independent, attributable, non-refunded US$13 order is the first customer milestone. Two direct orders are a net-proceeds checkpoint. Track aggregate visits, units, refunds, support minutes and payout eligibility separately. Reassess at 14 days or 30 qualified listing visits. Stop or change the offer if no one buys after 30 visits, support repeatedly exceeds ten owner minutes per order, or the owner cannot fulfil within the shared daily allowance.
5. **Time budget.** Budget one 10-minute owner review and one 10-minute manual post, then up to five minutes a day reading aggregate feedback. Give the owner one decision at each gate. Codex handles sample preparation, timing, instructions and revisions.

## Unit economics and attribution

Illustration only, USD. At $13, the published direct platform fee of 10% + $0.50 and card processing of 2.9% + $0.30 imply roughly **$10.52 per sale**, **$21.04 for two**. A Discover sale at the stated inclusive 30% yields $9.10 before other adjustments; three would total $27.30. Actual order rounding, taxes on fees, payment rail, FX, refunds, direct costs and payout fees can change both outcomes. [Pricing](https://gumroad.com/pricing) · [Fee details](https://gumroad.com/help/article/66-gumroads-fees)

Gumroad documents a standard **$100 payout minimum**, potentially higher local minimums and a seven-day hold on common schedules. Starting from an empty eligible balance, about ten direct $13 card sales at the estimate above would reach $100. Gumroad documents different settlement for sales via a connected PayPal account. Do not assume either eligibility or immediate withdrawal. Before listing, ask the owner only to confirm the applicable rail, threshold, holds and whether net funds can actually be withdrawn. If unavailable at $20, report held proceeds and revise the settlement plan or target volume. Never attribute unrelated store balances to make the goal appear met. [Payout rules](https://gumroad.com/help/article/13-getting-paid)

The owner privately reconciles the dedicated SKU, earning month, fees, refunds, withdrawal eligibility and actual payout. Publish only attributable aggregate cents. A November sale stays in November even if paid in December. Historical ratings, free downloads, replies, self-purchases and unrelated sales do not count as first-customer evidence.

## Evidence limits

Public pages and search extracts were examined on 24 November 2026. Vendor pages establish features and advertised terms. Community reports establish individual experiences. Store ratings and topic overlap suggest a route to buyers. Current traffic, sales volumes, purchase intent for our offer, benchmark performance, payout configuration and the owner's approval are unknown. No customer contact, authenticated account inspection or live checkout was part of this research.

# SURV-001 verification · 24 November 2026

Checked the final production output locally using Node 24.15.0, npm 12 and Chrome 158. All observed routes were served by a plain Python HTTP file server on loopback.

| Check | Result | Observation |
| --- | --- | --- |
| Dependency installation | PASS | Exact versions installed, lockfile retained. A clean `npm ci --offline` from the populated cache installed 273 packages. npm skipped the optional fsevents install script. |
| Strict type check | PASS | `npm run check` reported zero errors, warnings or hints. |
| Production build | PASS | `npm run build` generated five HTML pages and a sitemap in `dist/`. |
| Navigation | PASS | Followed all four header links and returned home by the wordmark at both widths. Checked every page link, its HTTP response and each fragment target. |
| Console and resources | PASS | No browser console errors, uncaught exceptions, failed requests or HTTP errors during the two route sweeps. |
| Desktop layout | PASS | Inspected the 1440 × 1000 homepage. All five pages fit the viewport without horizontal scrolling. |
| Mobile layout | PASS | Inspected the 390 × 844 homepage in mobile Chrome emulation. Header links stayed usable and each page fit the viewport. |
| Accessibility spot checks | PASS | First Tab exposed the skip link and Enter focused main. One h1 per route. Sample contrast ratios were 13.6:1 for body text, 6.1:1 for muted text on paper and 11.9:1 for lime on charcoal. |
| Financial integrity | PASS | Both period records contain null monetary fields. Ledger has 17 awaiting-verification metric cells across the two periods; November coverage is outside target. In-memory fixtures checked null vs zero, held funds, partial payout, expense, refund and loss. |
| Product availability | PASS | Empty catalogue, no purchase or preview links. Candidate carries Proposed status. The original note illustration identifies US$20 as the target. Journal and proposal carry the US$13 test price. |
| Public content and privacy | PASS | Reviewed public data, documents and media. Filename and text-pattern checks on project files and generated output found no credential, private-key, bank-identifier or local-home-path matches. No customer records or private financial exports supplied. |
| Static delivery and metadata | PASS | HTML works on plain file hosting. No client scripts, external resource requests or cookies observed. All pages include description, canonical, Open Graph and favicon references. Sitemap has the five canonical routes. Original 1200 × 630 social image inspected locally. |
| Live hosting, live social previews, checkout and payouts | NOT TESTED | Owner publication and account authorization pending. |
| Physical devices, other browsers and full assistive-technology audit | NOT TESTED | Scope of browser checks was desktop Chrome and a 390px emulated viewport. |
| Buyer demand and time saved | NOT TESTED | Candidate is a proposal. SURV-002 defines the sample comparison. |

[Desktop screenshot](desktop.png) · [Mobile screenshot](mobile.png)

# SURV-003 launch verification · 25 November 2026

| Check | Result | Observation |
| --- | --- | --- |
| Public Support | PASS | The [Gumroad listing](https://edmondyip.gumroad.com/l/chatgpt) returned HTTP 200, published metadata, US$0 minimum and US$5 suggested. A fresh signed-out Chrome session displayed enabled “I want this!” links targeting Gumroad checkout. |
| Build, strict types and tests | PASS | Six static pages built. Strict Astro check reported zero errors, warnings and hints. All seven existing automated tests passed. |
| Routes and CTA destinations | PASS | Desktop and mobile flows checked the homepage primary action, hero and support panel links, Products tool entry and optional tool support link. All checkout CTAs resolved to the verified public listing. |
| Immediate demo | PASS | Fresh page load displayed four fictional criteria, measured the 640 × 360 cover and required no file selection. Filtering returned the single unsupported PASS. Checklist, sample switching, manual JSON and screenshot import all worked. |
| Desktop and mobile | PASS | Chrome at 1440 × 1000 and emulated 390 × 844. Inspected both screenshots. Browser checks found no horizontal overflow, console errors or failed requests. |
| Financial and fulfilment integrity | PASS | Both periods retain unknown financial values. All 17 built files were checked against private fulfilment filenames and content hashes, including ZIP members. Git tracks no owner-delivery files. |
| Production domain | NOT TESTED | Candidate is awaiting owner approval for merge and deployment. Perform the production smoke check after that deployment. |
| Payment, download fulfilment and payout | NOT TESTED | Public product availability was checked without an order. |

[Desktop homepage](surv-003/home-desktop.png) · [Mobile demo](surv-003/demo-mobile.png)

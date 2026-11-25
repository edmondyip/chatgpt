# SURV-003 launch verification · 25 November 2026

| Check | Result | Observation |
| --- | --- | --- |
| Public Support | PASS | The [Gumroad listing](https://edmondyip.gumroad.com/l/chatgpt) returned HTTP 200, published metadata, US$0 minimum and US$5 suggested. A fresh signed-out Chrome session displayed enabled “I want this!” links targeting Gumroad checkout. |
| Build, strict types and tests | PASS | Six static pages built. Strict Astro check reported zero errors, warnings and hints. All seven existing automated tests passed. |
| Routes and CTA destinations | PASS | Desktop and mobile flows checked the homepage primary action, hero and support panel links, Products tool entry and optional tool support link. All checkout CTAs resolved to the verified public listing. |
| Immediate demo | PASS | Fresh page load displayed four fictional criteria, measured the 640 × 360 cover and required no file selection. Filtering returned the single unsupported PASS. Checklist, sample switching, manual JSON and screenshot import all worked. |
| Desktop and mobile | PASS | Chrome at 1440 × 1000 and emulated 390 × 844. Inspected both screenshots. Browser checks found no horizontal overflow, console errors or failed requests. |
| Financial and fulfilment integrity | PASS | Both periods retain unknown financial values. All 17 built files were checked against private fulfilment filenames and content hashes, including ZIP members. Git tracks no owner-delivery files. |
| Production deployment | PASS | Fast-forwarded main from b3ace47 to 01c1dbf. Cloudflare reported success for “Workers Builds: chatgpt-survival”. The first probe saw the previous homepage while the build was in progress. The post-build check saw the released site. |
| Live desktop and mobile | PASS | Chrome on [the production domain](https://chatgpt.256pages.com/) at 1440 × 1000 and emulated 390 × 844 opened ReleaseProof from the hero and through Products. No horizontal overflow, failed requests or console errors were observed in either run. |
| Live ReleaseProof and Support | PASS | Four demo criteria loaded, the browser measured the 640 × 360 cover, the gap filter returned one unsupported PASS, and checklist, sample switching and manual imports worked. The hero, support panel and tool support links pointed to the public Gumroad listing. Signed-out Gumroad displayed an enabled checkout control. |
| Payment, download fulfilment and payout | NOT TESTED | Public product availability was checked without an order. |

[Desktop homepage](surv-003/home-desktop.png) · [Mobile demo](surv-003/demo-mobile.png)

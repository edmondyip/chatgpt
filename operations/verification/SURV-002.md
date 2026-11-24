# SURV-002 · 24 November 2026

| Check | Result | Evidence |
| --- | --- | --- |
| Supporter ZIP | PASS | Archive CRCs passed for five files. PNGs measure 2560 × 1440 (desktop), 1080 × 1920 (mobile), 1440 × 864 (card). Welcome and personal-use text included. Archive SHA-256 `8b16303dc832351c845bb4b0cae2400b471d0d40e263819db7d6d2052df94f7c`. |
| Support availability | PASS | Public listing returned HTTP 200 with matching title, suggested price 500 cents and `is_published: false`. Actual built page displayed Checkout pending. A temporary available-state build rendered the configured external link. Restored and rebuilt pending state. |
| Build and strict types | PASS | Astro produced six static pages plus both JSON sample routes and sitemap. Strict check returned zero errors, warnings and hints. |
| Automated tests | PASS | Seven Node tests cover gross by category, support-only income, confirmed zero, unknowns, fees, refunds, expenses, held funds and payouts, archived fixture fidelity, validation and dimension checks. |
| Desktop and mobile | PASS | Chrome 159, 1440 × 1000 and emulated 390 × 844. Support navigation, journal link, three ledger categories and prototype link worked. Checked for horizontal overflow and console errors. |
| Prototype review | PASS | Imported archived JSON, retaining 12 reported PASS and 3 NOT TESTED. Matching the original screenshots verified exactly two image sizes. Fictional PASS with unspecified evidence appeared in gap filtering. Wrong-sized replacement flagged a mismatch and cleared its review mark. Read a log excerpt. Invalid JSON preserved the current review. |
| Local handling | PASS | After loading the static app, Chrome ran both review flows offline. No HTTP requests fired during imports or review. Browser storage and cookies stayed empty; reload removed imported state. CSP blocks connections from the viewer. |
| Public scope | PASS | Verified private ZIP and all fulfilment files ignored by Git and absent from dist. No credentials, customer data or financial exports required. |
| Checkout, payment, delivery by Gumroad and payout | NOT TESTED | Listing unpublished. No orders or private account access. |
| Live deployment, physical devices, other browsers, buyer demand and comparative review speed | NOT TESTED | Browser results are local. Owner publication and market experiment remain pending. |

[Support section](surv-002/support-desktop.png) · [Desktop review](surv-002/review-desktop.png) · [Mobile review](surv-002/review-mobile.png)

# AI Survival — ChatGPT Edition

An independent, human-operated commercial experiment. Can AI earn enough to cover a US$20 monthly subscription? [Start here](PROJECT_START_HERE.md) for status and the next decision. The public site consists of Home, Products, Journal, Finances, About and ReleaseProof. The homepage also includes community support.

## Build and preview

From the repository root with Node 24.15+ on the 24.x line and npm installed:

```sh
npm ci
npm run check
npm test
npm run build
npm run preview -- --host 127.0.0.1
```

Open the local URL printed by Astro. For live editing, run `npm run dev`. To check production files using a traditional file server, run `python3 -m http.server 4321 --bind 127.0.0.1 --directory dist` and open [localhost:4321](http://127.0.0.1:4321/). Node is a build-time dependency.

## Update the public record

| File | Update |
| --- | --- |
| [Financial summary](data/financial-summary.json) | Add one period and select `currentPeriod`. Enter integer USD cents, with positive fee, refund and expense deductions. Use null until owner reconciliation, including confirmed-zero checks. The verification label describes record status. |
| [Products](data/products.json) | Add approved releases with title, category and description. Use toolUrl for the free tool entry. Supply previewUrl or purchaseUrl only for verified destinations. |
| [Experiments](data/experiments.json) | Record a proposal, status, question and next step. The first record is featured. |
| [Journal](data/journal.json) | Add a unique id, ISO date, category, title, summary and paragraphs. Entries sort by date. |

Use [support.json](data/support.json) for the supporter price, checked date, external URL and availability. Only mark it `available` after a public availability check. The private upload ZIP is ignored by Git and excluded from the static site.

Product sales, community support and other approved income are separate gross inputs. Confirm all three categories before computing total gross. Record a free supporter download as no monetary contribution. Support never establishes paid software demand. Assign money to the original sale period. Net proceeds equal gross less both kinds of fee, refunds and direct expenses. Record the remaining eligible balance separately from cash already received. Once a payout arrives, move that amount from the eligible balance to cash received. Enter both amounts before separately recorded project expenses. Net target coverage is the lesser of net proceeds and accessible funds after direct expenses, floored at zero and divided by the monthly target. A refund can revise its earning period. The initial November period has no target. Store evidence privately and publish only reconciled totals.

## Cloudflare Pages Free

After owner approval, create or select a **Pages** project on the Free plan. Use **Git integration** for GitHub repository `edmondyip/chatgpt`. Select **main** as production branch, **Astro** as framework, leave the root directory at the repository root, use **npm run build** as the build command and **dist** as output. Set the build environment variable **NODE_VERSION=24.15.0**. Review terms and preview-branch controls before enabling integration. Pushes to main may publish production; review branches may trigger previews. Custom-domain and DNS changes require a separate owner decision. Existing Direct Upload projects require a new Git-integrated Pages project for this workflow. [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/) · [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) · [Free limits](https://developers.cloudflare.com/pages/platform/limits/) · [Terms](https://www.cloudflare.com/terms/)

## Existing 256pages web server

Build locally using the commands above. After release approval, back up the current site or keep its release directory, upload the **contents** of `dist/` into a new static release directory and point the domain's document root at that directory. Preserve `_astro/`, route subdirectories and filenames. Enable directory indexes using `index.html`; each page has its own file. Verify `/`, `/releaseproof/`, `/products/`, `/journal/`, `/finances/`, `/about/`, `/robots.txt`, `/social.png` and `/sitemap.xml`. Restore the previous release directory if a check fails. Only static files belong on the server.

The intended site root and canonical host are `https://chatgpt.256pages.com/`. A path-prefixed deployment would require adjusting asset and navigation URLs. Vercel Hobby's non-commercial restriction also applies when an outside service handles checkout. [Vercel fair-use guidelines](https://vercel.com/docs/limits/fair-use-guidelines)


## Try ReleaseProof

Run the preview commands above and open `/releaseproof/`. The fictional report and its 640 × 360 cover open automatically. Filter reported passes with evidence gaps to find the unsupported empty-state claim. Expand the input controls to import version 1 JSON or switch samples. For the SURV-001 sample, select both PNGs from `operations/verification/`. The app checks declared image dimensions, shows text-log excerpts and flags missing references. Checklist marks, imported files and report contents exist only in the active tab. See the [schema](public/releaseproof/schema.txt) and [fictional report](data/releaseproof/fictional.json). To try the tool offline after loading, disconnect before importing files.

## Cloudflare Web Analytics compatibility

Production serves Astro’s static HTML on the Cloudflare-proxied hostname `chatgpt.256pages.com`. GitHub reports the integration as **Workers Builds: chatgpt-survival**. The inspected production response permits HTML transformation, and its markup contained no Cloudflare analytics beacon. ReleaseProof sets `connect-src 'none'` to keep its local file review isolated. That policy also blocks analytics submissions from the tool page.

If the owner authorizes analytics for the public journal, open **Web Analytics → Add a site** in Cloudflare, select the exact production hostname and choose **Done**. Under **Manage site → Advanced options → Add rule**, configure a rule excluding `/releaseproof/*` to preserve the tool’s local-only behaviour. If path exclusions are unavailable, select manual snippet installation and include the supplied snippet only on the approved journal pages in a separately authorized release. A browser visit to an included page should produce a beacon request and a dashboard visit after processing. Check that the tool page still runs without analytics. This requires no Astro package or backend. [Cloudflare setup](https://developers.cloudflare.com/web-analytics/get-started/) · [Path rules](https://developers.cloudflare.com/web-analytics/configuration-options/rules/)

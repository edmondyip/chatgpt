# AI Survival — ChatGPT Edition

An independent, human-operated commercial experiment. Can AI earn enough to cover a US$20 monthly subscription? [Start here](PROJECT_START_HERE.md) for status and the next decision. The public site consists of Home, Products, Journal, Finances and About.

## Build and preview

From the repository root with Node 24.15+ on the 24.x line and npm installed:

```sh
npm ci
npm run check
npm run build
npm run preview -- --host 127.0.0.1
```

Open the local URL printed by Astro. For live editing, run `npm run dev`. To check production files using a traditional file server, run `python3 -m http.server 4321 --bind 127.0.0.1 --directory dist` and open [localhost:4321](http://127.0.0.1:4321/). Node is a build-time dependency.

## Update the public record

| File | Update |
| --- | --- |
| [Financial summary](data/financial-summary.json) | Add one period and select `currentPeriod`. Enter integer USD cents, with positive fee, refund and expense deductions. Use null until owner reconciliation, including confirmed-zero checks. The verification label describes record status. |
| [Products](data/products.json) | Add approved releases with title, category and description. Supply previewUrl or purchaseUrl only for verified destinations. |
| [Experiments](data/experiments.json) | Record a proposal, status, question and next step. The first record is featured. |
| [Journal](data/journal.json) | Add a unique id, ISO date, category, title, summary and paragraphs. Entries sort by date. |

Assign money to the original sale period. Net proceeds equal gross less both kinds of fee, refunds and direct expenses. Record the remaining eligible balance separately from cash already received. Once a payout arrives, move that amount from the eligible balance to cash received. Enter both amounts before separately recorded project expenses. Net target coverage is the lesser of net proceeds and accessible funds after direct expenses, floored at zero and divided by the monthly target. A refund can revise its earning period. The initial November period has no target. Store evidence privately and publish only reconciled totals.

## Cloudflare Pages Free

After the owner approves publication, review the applicable agreement, service-specific terms and account's free-plan limits. Direct Upload lets the owner publish the exact locally verified build. In **Workers & Pages**, create a **Pages** application, choose **Drag and drop your files**, select the built `dist/` folder with `index.html` at its root, then deploy. Verify all five routes and the social image on the assigned Pages URL. Add the production custom domain only under separate DNS authorization. Direct Upload projects require a new project to switch to Git integration. [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) · [Free limits](https://developers.cloudflare.com/pages/platform/limits/) · [Agreement](https://www.cloudflare.com/terms/) · [Service terms](https://www.cloudflare.com/service-specific-terms-application-services/)

If the owner later prefers Git integration, select the authorized repository and production branch, use the repository root, set Node to 24.15.0, build with `npm run build` and publish `dist`. Connecting Git can publish and trigger future deployments on push. [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)

## Existing 256pages web server

Build locally using the commands above. After release approval, back up the current site or keep its release directory, upload the **contents** of `dist/` into a new static release directory and point the domain's document root at that directory. Preserve `_astro/`, route subdirectories and filenames. Enable directory indexes using `index.html`; each page has its own file. Verify `/`, `/products/`, `/journal/`, `/finances/`, `/about/`, `/robots.txt`, `/social.png` and `/sitemap.xml`. Restore the previous release directory if a check fails. Only static files belong on the server.

The intended site root and canonical host are `https://chatgpt.256pages.com/`. A path-prefixed deployment would require adjusting asset and navigation URLs. Vercel Hobby's non-commercial restriction also applies when an outside service handles checkout. [Vercel fair-use guidelines](https://vercel.com/docs/limits/fair-use-guidelines)

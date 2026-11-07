# YourDesignGPT — GitHub Pages migration readiness

**Status:** preparation branch only, NOT active production.

## What is preserved
- Complete original website, design, pricing, configurator, portfolio, 77 blog articles, Google site verification, sitemap, robots.txt, Google AdSense and branded favicon.
- Main production branch and current `yourdesigngpt.es` DNS remain unchanged.
- DEA Habbo ES Vercel project remains unchanged.

## GitHub Pages static files
- `CNAME` contains the official custom domain `yourdesigngpt.es`.
- `.nojekyll` prevents Jekyll processing.

## Cannot yet switch production
- The existing JavaScript uses `/api/presupuesto` and `/api/visitas`, both running on Vercel. GitHub Pages only serves static assets, so those endpoints will return 404 after migration.
- To keep Vercel only for the API, an isolated API hostname (for example `api.yourdesigngpt.es`) must be configured with its own DNS, HTTPS and CORS. The client JavaScript must then use that hostname and the Vercel backend must handle OPTIONS/POST, secure origins and rate limiting.
- The existing Vercel Blob visits history must remain accessible or be migrated to a new durable store.
- All legacy redirects in `vercel.json` must be represented by redirects at an appropriate layer, since GitHub Pages does not run Vercel routes.
- The `/admin/captacion` redirects go to another Vercel app, which remains separate; they need an alternative when the site no longer runs under Vercel.
- GitHub Pages published from this repository requires the repo Pages source branch to be set appropriately in GitHub settings.
- Custom-domain DNS must be changed at the current registrar; DNS is currently served through external nameservers and points to Vercel.
- Page rules/terms: GitHub Pages is not intended for websites primarily used for commercial transactions or selling services. The current YourDesignGPT site promotes paid web design, so GitHub Pages is not an appropriate permanent production host in its present form. Revenue not yet invoiced does not alone change that.

## Cutover checklist
1. Choose a host permitting commercial services and backend functions, OR convert the main site into an eligible informational/personal project; do not claim full compatibility while pages terms or runtime dependency remain unresolved.
2. Configure and verify backend and DNS in test environment.
3. Test end-to-end form delivery to the real mailbox, visits counter and historical totals, blog, SEO resources and AdSense.
4. Confirm redirects and HTTPS for `www` and apex.
5. Only after confirming production health and explicit authorization, retire YourDesignGPT from Vercel. Never delete DEA Habbo ES.

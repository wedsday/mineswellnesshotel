# SEO notes — mineswellnesshotel.com.my (PBN)

## Positioning

Informational Malaysia / regional travel blog: **destination guides + practical tips**.  
Not a hotel booking engine. No packages sold on this site.

Archive continuity (2017 Wayback) supports relaunch signals; ongoing value comes from unique guides and clean technical SEO.

## Indexable surface

| Area | URLs |
|------|------|
| Home | `/` |
| Core pages | `/about-us/`, `/contact-us/`, `/ads/` |
| Trust / legal | `/privacy-policy/`, `/terms/`, `/faq/` |
| Categories | `/category/place/`, `/category/travel-tips/` |
| Posts | `/{slug}/` (6 archived + future guides) |
| Author | `/author/admin/` |
| HTML sitemap | `/sitemap/` |
| XML sitemap | `/sitemap.xml` |
| RSS | `/index.xml` (+ `/feed/` shim) |

## Schema (`@graph`)

- `Organization` + `WebSite` (home) — **no** fake `SearchAction`
- Posts: `BlogPosting` + `BreadcrumbList` + `Person` author
- Static pages: `WebPage` + breadcrumbs
- FAQ: `FAQPage`
- Publisher `@id` stable: `{baseURL}#organization`

## PBN controls

`data/pbn.json` — money site URL (empty until ready), `nofollowExternal`, `maxOutboundLinksPerPage`, contact email.  
Markdown outbound links get `rel` via `render-link.html`. Keep commercial outbound sparse and contextual. No related-sites footer farm.

## Host / canonical

- Primary: `https://mineswellnesshotel.com.my/` (`hugo.toml` + `CNAME`)
- Align DNS so `www` redirects to apex
- `robots.txt` Sitemap URL must match the primary host

## SpamBrain / quality

- Prefer unique guide copy over more Wayback HTML
- No dead `action="#"` forms; contact uses `mailto:`
- No fake comment backend UI
- No inventing empty taxonomies (e.g. Review)
- Publish slowly (1–2 guides/month) after go-live
- Vary template details vs other PBN1 sites over time
- Submit sitemap in Search Console after deploy

## Launch checklist

1. Deploy via GitHub Pages (see [DEPLOY-GITHUB-PAGES.md](./DEPLOY-GITHUB-PAGES.md))
2. Attach custom domain `mineswellnesshotel.com.my` (+ `www` → apex redirect)
3. Verify property in Google Search Console
4. Submit `https://mineswellnesshotel.com.my/sitemap.xml`
5. Rich Results test on home + one blog post + FAQ
6. Mobile check on `/`, one post, `/faq/`

## Last updated

2026-07-25

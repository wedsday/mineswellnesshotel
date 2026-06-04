# SEO parity with the 2017 original site

This Hugo rebuild targets **continuity signals** Google uses when a domain comes back or is recreated: same URLs, same text, same titles/descriptions, and similar HTML structure.

## What we matched

| Signal | Original (Wayback) | This build |
|--------|-------------------|------------|
| Domain | `www.mineswellnesshotel.com.my` | `baseURL` in `hugo.toml` |
| Theme / layout | Genesis Lifestyle Pro Blue | Archived `lifestyle-pro.css` + overrides |
| Post URLs | `/{slug}/` | `[permalinks] posts = '/:slug/'` |
| Categories | `/category/place/` etc. | `[permalinks.term] categories` |
| Static pages | `/about-us/`, `/contact-us/`, … | Same slugs in `content/` |
| `<title>` / OG tags | Yoast SEO | `seoTitle`, `description`, `ogImage` in front matter + `partials/head.html` |
| Schema | WebSite + articles | JSON-LD in `partials/schema-jsonld.html` |
| Microdata | `itemscope` on nav, articles, sidebar | Same patterns in templates |
| RSS | `/feed/` | `/index.xml` (link rel in `<head>`; `/feed/` redirect via `static/feed/index.html`) |
| `robots.txt` + sitemap | Present | `static/robots.txt` + Hugo `sitemap.xml` |

## What Google will **not** treat as guaranteed “same site”

- **Hosting/IP/CDN** — new infrastructure is expected.
- **WordPress fingerprints** — generator meta, `wp-content` URLs, and plugin assets are gone (good for security; neutral for identity).
- **Comments & engagement** — original had comment forms; static rebuild has no comment database.
- **Backlinks** — unchanged; still point to old URLs if paths match.
- **Historical Search Console** — reclaim the property and submit the sitemap after DNS points here.
- **Parked domain gap** — if the live domain showed Exabytes parking for years, recovery is a **migration/relaunch**, not an automatic handoff.

## Recommended launch checklist

1. Deploy via GitHub Pages (see [DEPLOY-GITHUB-PAGES.md](./DEPLOY-GITHUB-PAGES.md)).
2. Point DNS for `mineswellnesshotel.com.my` to GitHub Pages (A records + optional `www` CNAME).
3. Verify [Google Search Console](https://search.google.com/search-console) property.
4. Submit `https://mineswellnesshotel.com.my/sitemap.xml` (or `www.` if that is primary).
5. Optional: [Internet Archive ownership](https://archive.org) / `rel=me` if you control both.
6. Keep content in `content/posts/` aligned with Wayback; run `node scripts/extract-seo.mjs` after edits.

## Honest expectation

Matching URLs + content + metadata gives the best chance Google treats this as the **same property revived**. It is not a guarantee—Google also uses signals outside the HTML. Visual similarity (original CSS) supports user trust and lower bounce rates, which indirectly helps SEO.

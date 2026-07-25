# Mine's Wellness — Hugo recreation

Static recreation of [minewellnesshotel.com.my (July 2017 Wayback)](https://web.archive.org/web/20170701231310/http://www.mineswellnesshotel.com.my/) — travel blog **"Blog for all travellers"** (not the current hotel marketing site).

## Commands

```bash
cd projects/mineswellnesshotel-hugo
hugo server -D
hugo build --minify
```

Default dev server: http://localhost:1313/

## Deploy to GitHub Pages

Hosting uses **GitHub Pages** with a GitHub Actions workflow (`.github/workflows/hugo.yml`). Pushes to `main` build Hugo and publish automatically.

**Full setup steps:** see [DEPLOY-GITHUB-PAGES.md](./DEPLOY-GITHUB-PAGES.md)

| Item | Value |
|------|--------|
| GitHub repo | https://github.com/wedsday/mineswellnesshotel |
| Default Pages URL | https://wedsday.github.io/mineswellnesshotel/ |
| Custom domain (target) | `mineswellnesshotel.com.my` |

## Content source

- Posts extracted from Wayback `index.html` via `node scripts/extract-posts.mjs`
- Pages: About Us, Contact Us, Ads, Privacy Policy (from Wayback HTML)
- Raw captures in `_archive-html/` (optional, not deployed)

## PBN / SEO

See `PROJECT.md`, `SEO-NOTES.md`, and `data/pbn.json` for positioning, schema, and outbound-link controls.

## Routes (match original WordPress)

| URL | Content |
|-----|---------|
| `/` | All posts (full text, like 2017 home) |
| `/about-us/` | About page |
| `/contact-us/` | Contact (mailto) |
| `/faq/` | FAQ + FAQPage schema |
| `/terms/` | Terms of use |
| `/ads/` | Advertising info |
| `/privacy-policy/` | Privacy policy |
| `/sitemap/` | HTML sitemap |
| `/category/place/` | Place category |
| `/category/travel-tips/` | Travel tips category |
| `/:slug/` | Individual blog posts |

## Note

The live domain [mineswellnesshotel.com.my](http://www.mineswellnesshotel.com.my/) is currently a parked Exabytes page. This project preserves the 2017 blog content from the Internet Archive.

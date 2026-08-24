# Project handoff — READ ME FIRST (Cursor / human)

> **For the assistant:** Read this file at the start of the session before editing. Then open `hugo.toml`, `data/pbn.json`, `SEO-NOTES.md`, and the theme layouts under `themes/mineswellness/`.

## Identity

| Field | Value |
|-------|--------|
| **Project name** | mineswellnesshotel-hugo (Mine's Wellness) |
| **Public site / domain** | `https://mineswellnesshotel.com.my` |
| **Repo folder on disk** | `PBN1/projects/mineswellnesshotel-hugo` |
| **GitHub** | https://github.com/wedsday/mineswellnesshotel |
| **PBN role** | Informational Malaysia travel blog — guides + tips (not a hotel booking site) |

## Purpose

- Static Hugo recreation of the 2017 Wayback travel blog **"Mine's Wellness — Blog for all travellers"**.
- Preserve original WordPress-style URLs and Lifestyle Pro look for continuity.
- Operate as a **useful PBN node**: unique travel content, clean SEO, sparse controlled outbound links.

## Stack

- **Framework:** Hugo (extended)
- **Theme:** custom `themes/mineswellness` (Genesis Lifestyle Pro Blue parity)
- **Host:** GitHub Pages (see `DEPLOY-GITHUB-PAGES.md`)
- **PBN config:** `data/pbn.json`

## Commands

```bash
cd projects/mineswellnesshotel-hugo
hugo server
hugo build --minify
```

## Deploy / hosting

- **Host:** GitHub Pages via `.github/workflows/hugo.yml`
- **Branch:** `main`
- **Publish:** `public/`
- **Canonical host:** apex `mineswellnesshotel.com.my` (redirect `www` → apex at DNS)

## Content source

- Wayback: https://web.archive.org/web/20170701231310/http://www.mineswellnesshotel.com.my/
- Raw captures: `_archive-html/` (not deployed)
- Posts: `content/posts/`
- Trust pages: About, Contact, FAQ, Terms, Privacy, Ads

## Conventions (do not break without asking)

- Keep original post slugs and `/category/:slug/` URLs.
- Honour `data/pbn.json` for outbound `nofollow` and money-site discipline.
- No fake search schema, dead forms, or comment backends.
- Prefer unique guide copy over more Wayback HTML.
- Publish slowly (1–2 guides/month) after go-live.
- Do not add a related-sites footer farm across PBN1 properties.

## Key files / directories

- `PROJECT.md` — session handoff
- `SEO-NOTES.md` — indexing + quality notes
- `data/pbn.json` — money URL / nofollow / contact email
- `hugo.toml` — baseURL, menus, permalinks
- `themes/mineswellness/layouts/partials/schema-jsonld.html` — JSON-LD `@graph`
- `themes/mineswellness/layouts/_default/_markup/render-link.html` — external link `rel`
- `content/posts/` — blog posts
- `static/robots.txt` — crawl rules + sitemap URL

## Done / shipped

- Wayback recreation (6 posts + core pages), Lifestyle Pro CSS, SEO titles/OG
- GitHub Pages deploy docs + CNAME
- PBN pass: `pbn.json`, FAQ/Terms, mailto contact, schema `@graph`, related posts, author bio

## Open items / backlog

- `moneySiteUrl` set to `https://55bmwasia.com/` (dofollow via render-link carve-out).
- Publish 1–2 new Malaysia travel guides/month with in-body internal links.
- Optional: restore licensed post images / fill remaining `ogImage` fields.
- Verify GSC property + submit sitemap after DNS is live.

## Last updated

- **Date:** 2026-07-25
- **By:** Cursor session
- **Note:** PBN quality pass (trust pages, schema, outbound controls)

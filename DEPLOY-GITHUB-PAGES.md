# Deploy Mine's Wellness to GitHub Pages

This guide walks through hosting the Hugo site on **GitHub Pages** (free) with optional custom domain **`mineswellnesshotel.com.my`**.

Repo: **https://github.com/wedsday/mineswellnesshotel**

---

## What is already in the repo

| File | Purpose |
|------|---------|
| `.github/workflows/hugo.yml` | Builds Hugo on every push to `main` and deploys to GitHub Pages |
| `static/CNAME` | Tells GitHub Pages to serve the site at `mineswellnesshotel.com.my` |
| `static/.nojekyll` | Skips Jekyll processing so Hugo output is served as-is |
| `static/feed/index.html` | Redirects `/feed/` → `/index.xml` (WordPress RSS URL parity) |
| `hugo.toml` | Production `baseURL` is `https://mineswellnesshotel.com.my/` |

You do **not** need Firebase, Node.js, or any external host for deployment.

---

## Part A — Enable GitHub Pages (one-time)

### Step 1 — Push the latest code

If you have local changes (Firebase removal + GitHub Pages files), commit and push to `main`:

```powershell
cd "C:\Users\E\OneDrive\Desktop\PBN1\projects\mineswellnesshotel-hugo"
git add -A
git commit -m "Switch hosting from Firebase to GitHub Pages."
git push origin main
```

### Step 2 — Turn on GitHub Pages

1. Open **https://github.com/wedsday/mineswellnesshotel/settings/pages**
2. Under **Build and deployment** → **Source**, choose **GitHub Actions** (not “Deploy from a branch”).
3. Save if prompted.

### Step 3 — Run the first deploy

1. Go to **https://github.com/wedsday/mineswellnesshotel/actions**
2. Open the **Deploy Hugo site to GitHub Pages** workflow.
3. Confirm the latest run on `main` succeeds (green check).

If it fails, open the failed job log — common fixes:

- **Pages not enabled** — repeat Step 2.
- **Permission error** — in repo **Settings → Actions → General**, set **Workflow permissions** to **Read and write permissions**.

### Step 4 — Test the default GitHub URL

Before custom DNS, the site is available at:

**https://wedsday.github.io/mineswellnesshotel/**

Check:

- Home page loads
- A post URL, e.g. `/great-italian-comfort-food-kuala-lumpur/`
- `/about-us/`, `/sitemap.xml`

> **Note:** With `baseURL` set to the custom domain, some absolute links in the HTML may point to `mineswellnesshotel.com.my` even when you browse via `.github.io`. That is expected until DNS is live.

---

## Part B — Connect custom domain `mineswellnesshotel.com.my`

Do this **after** Part A works.

### Step 1 — Add domain in GitHub

1. **Settings → Pages → Custom domain**
2. Enter: **`mineswellnesshotel.com.my`**
3. Click **Save**
4. Wait for GitHub to verify DNS (can take minutes to 24 hours).
5. Enable **Enforce HTTPS** once the certificate is issued.

The repo already contains `static/CNAME` with `mineswellnesshotel.com.my`; GitHub may also show this in the UI.

### Step 2 — DNS at your registrar (e.g. Exabytes)

Log in where you manage `mineswellnesshotel.com.my` and add:

**Apex domain (`mineswellnesshotel.com.my`)** — four **A** records:

| Type | Host / name | Value |
|------|-------------|--------|
| A | `@` (or blank) | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**Optional `www` subdomain** — if you want `www.mineswellnesshotel.com.my`:

| Type | Host | Value |
|------|------|--------|
| CNAME | `www` | `wedsday.github.io` |

Then in GitHub Pages settings, set the primary domain and redirect the other version (apex ↔ www) to match `hugo.toml` (`https://mineswellnesshotel.com.my/` is apex without www).

If you switch primary to **www**, update `hugo.toml`:

```toml
baseURL = 'https://www.mineswellnesshotel.com.my/'
```

Also update `static/CNAME` and `static/robots.txt` to match, then push to `main`.

### Step 3 — Test the live domain

- https://mineswellnesshotel.com.my/
- https://mineswellnesshotel.com.my/sitemap.xml
- https://mineswellnesshotel.com.my/feed/ (should redirect to `/index.xml`)

---

## Part C — Google Search Console (after DNS works)

See also [SEO-NOTES.md](./SEO-NOTES.md).

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add property for your live URL (apex or www — same as primary domain).
3. Verify ownership (DNS TXT is usually easiest).
4. Submit sitemap: `https://mineswellnesshotel.com.my/sitemap.xml`
5. Optionally request indexing for the homepage.

---

## Part D — Day-to-day updates

Every push to **`main`** triggers a rebuild and redeploy automatically.

Local preview before pushing:

```powershell
cd "C:\Users\E\OneDrive\Desktop\PBN1\projects\mineswellnesshotel-hugo"
hugo server
```

Open http://localhost:1313/

Production build check:

```powershell
hugo build --minify
```

---

## Part E — Optional improvements

| Task | Command / action |
|------|------------------|
| Download missing post images | `node scripts/download-images.mjs` then commit and push |
| Working contact / ads forms | Wire forms in `content/contact-us.md` and `content/ads.md` to Formspree or similar |
| Refresh SEO metadata from Wayback | `node scripts/extract-seo.mjs` |

---

## Quick reference

| Item | Value |
|------|--------|
| Hugo version (CI) | 0.161.1 extended |
| Workflow | `.github/workflows/hugo.yml` |
| Publish output | `public/` (built in CI, not committed) |
| Default URL | https://wedsday.github.io/mineswellnesshotel/ |
| Custom domain | mineswellnesshotel.com.my |
| RSS | `/index.xml`; legacy `/feed/` via static redirect |

---

## Minimum path to “live”

1. Push code to `main`
2. Enable **GitHub Actions** as Pages source in repo Settings
3. Confirm Actions workflow succeeds
4. Test `.github.io` URL
5. Add custom domain in GitHub → configure DNS at registrar → enable HTTPS
6. Test `https://mineswellnesshotel.com.my/`
7. (Optional) Search Console + sitemap

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| 404 on `.github.io` URL | Pages source must be **GitHub Actions**; workflow must have completed successfully |
| Custom domain “DNS not configured” | Check A records at registrar; wait for propagation (up to 24–48 h) |
| HTTPS not available | DNS must be correct first; then toggle **Enforce HTTPS** in Pages settings |
| `/feed/` 404 | Ensure `static/feed/index.html` is in the repo and redeploy |
| Wrong links on `.github.io` preview | Expected while `baseURL` points at custom domain; links resolve correctly once DNS is live |

For Hugo-specific SEO context, see [SEO-NOTES.md](./SEO-NOTES.md).

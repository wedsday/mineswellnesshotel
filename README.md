# Mine's Wellness — Hugo recreation

Static recreation of [minewellnesshotel.com.my (July 2017 Wayback)](https://web.archive.org/web/20170701231310/http://www.mineswellnesshotel.com.my/) — travel blog **"Blog for all travellers"** (not the current hotel marketing site).

## Commands

```bash
cd projects/mineswellnesshotel-hugo
hugo server -D
hugo build --minify
```

Default dev server: http://localhost:1313/

## Deploy to Firebase Hosting

```powershell
cd projects/mineswellnesshotel-hugo
hugo build --minify
firebase deploy --only hosting
```

- Firebase project: `mineswellnesshotel-828453972280`
- Live URL (after deploy): https://mineswellnesshotel-828453972280.web.app
- Custom domain: `mineswellnesshotel.com.my` (configure in Firebase Console → Hosting → Add custom domain, then update DNS at your registrar)

First-time setup: `npm install -g firebase-tools` then `firebase login`.

## Content source

- Posts extracted from Wayback `index.html` via `node scripts/extract-posts.mjs`
- Pages: About Us, Contact Us, Ads, Privacy Policy (from Wayback HTML)
- Raw captures in `_archive-html/` (optional, not deployed)

## Routes (match original WordPress)

| URL | Content |
|-----|---------|
| `/` | All posts (full text, like 2017 home) |
| `/about-us/` | About page |
| `/contact-us/` | Contact form (static UI) |
| `/ads/` | Advertising info |
| `/privacy-policy/` | Privacy policy |
| `/category/place/` | Place category |
| `/category/travel-tips/` | Travel tips category |
| `/:slug/` | Individual blog posts |

## Note

The live domain [mineswellnesshotel.com.my](http://www.mineswellnesshotel.com.my/) is currently a parked Exabytes page. This project preserves the 2017 blog content from the Internet Archive.

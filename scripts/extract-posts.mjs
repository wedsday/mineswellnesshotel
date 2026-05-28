/**
 * Extract posts from Wayback index.html into Hugo markdown files.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, '_archive-html', 'index.html'), 'utf8');

function decodeHtml(s) {
  return s
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/&#038;/g, '&')
    .replace(/&#x000A9;/g, '©')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8216;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function htmlToMarkdown(htmlFragment) {
  let h = htmlFragment.split('<motion class="addtoany')[0].split('<div class="addtoany')[0];
  h = h.replace(/<br\s*\/?>/gi, '\n\n');
  h = h.replace(/<\/p>\s*<p>/gi, '\n\n');
  h = h.replace(/<p>/gi, '\n\n');
  h = h.replace(/<\/p>/gi, '\n\n');
  h = h.replace(/<h2>/gi, '\n\n## ');
  h = h.replace(/<\/h2>/gi, '\n\n');
  h = h.replace(/<strong>/gi, '**');
  h = h.replace(/<\/strong>/gi, '**');
  h = h.replace(
    /<a href="https:\/\/web\.archive\.org\/web\/\d+\/(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi,
    '[$2]($1)',
  );
  h = h.replace(/<img[^>]*alt="([^"]*)"[^>]*\/?>/gi, '');
  h = h.replace(/<img[^>]*\/?>/gi, '');
  h = h.replace(/<[^>]+>/g, '');
  h = decodeHtml(h);
  return h.replace(/\n{3,}/g, '\n\n').trim();
}

const categoriesBySlug = {
  'great-italian-comfort-food-kuala-lumpur': ['place'],
  'choose-langkawi-airport-car-rental': [],
  'can-get-becoming-malaysian-expat': ['place', 'travel-tips'],
  'information-kuala-gandah-elephant-sanctuary': ['place'],
  'singapores-best-office-rental': ['place'],
  'getting-around-scenic-penang-car-rental-option': ['place'],
};

const re =
  /<article class="post-\d+ post[\s\S]*?<h2 class="entry-title"[^>]*><a href="[^"]+\/([^/]+)\/"[^>]*>([^<]+)<\/a><\/h2>[\s\S]*?datetime="([^"]+)"[\s\S]*?<div class="entry-content" itemprop="text">([\s\S]*?)<div class="addtoany_share_save_container/g;

const posts = [];
let m;
while ((m = re.exec(html)) !== null) {
  const [, slug, title, date, bodyHtml] = m;
  const cats = categoriesBySlug[slug] ?? ['place'];
  posts.push({
    slug,
    title: decodeHtml(title),
    date: date.slice(0, 10),
    categories: cats.length ? cats : ['uncategorized'],
    body: htmlToMarkdown(bodyHtml),
  });
}

const outDir = path.join(root, 'content', 'posts');
fs.mkdirSync(outDir, { recursive: true });

for (const post of posts) {
  const front = `---
title: "${post.title.replace(/"/g, '\\"')}"
date: ${post.date}T12:00:00+00:00
author: Admin
categories:
${post.categories.map((c) => `  - ${c}`).join('\n')}
draft: false
---

`;
  fs.writeFileSync(path.join(outDir, `${post.slug}.md`), front + post.body, 'utf8');
  console.log('Wrote', post.slug);
}

console.log('Total posts:', posts.length);

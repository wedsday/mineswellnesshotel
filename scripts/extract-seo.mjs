/**
 * Pull Yoast SEO fields from Wayback HTML into post/page front matter.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const archiveDir = path.join(root, '_archive-html');

function extractMeta(html, name) {
  const re = new RegExp(`<meta[^>]+(?:name|property)="${name}"[^>]+content="([^"]*)"`, 'i');
  const alt = new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:name|property)="${name}"`, 'i');
  return html.match(re)?.[1] ?? html.match(alt)?.[1] ?? '';
}

function extractTitle(html) {
  return html.match(/<title>([^<]*)<\/title>/i)?.[1]?.replace(/&#039;/g, "'").trim() ?? '';
}

function updateFrontMatter(filePath, fields) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.startsWith('---')) return;
  const end = content.indexOf('\n---\n', 4);
  if (end === -1) return;
  const body = content.slice(end + 5);
  const lines = ['---'];
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === '') continue;
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      value.forEach((v) => lines.push(`  - ${v}`));
    } else if (typeof value === 'string' && (value.includes(':') || value.includes('"'))) {
      lines.push(`${key}: "${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push('---', '');
  fs.writeFileSync(filePath, lines.join('\n') + body, 'utf8');
}

const postSlugs = fs.readdirSync(path.join(root, 'content', 'posts')).map((f) => f.replace(/\.md$/, ''));

for (const slug of postSlugs) {
  const htmlPath = path.join(archiveDir, `${slug}.html`);
  const mdPath = path.join(root, 'content', 'posts', `${slug}.md`);
  let html = '';
  if (fs.existsSync(htmlPath)) {
    html = fs.readFileSync(htmlPath, 'utf8');
  } else {
    const index = fs.readFileSync(path.join(archiveDir, 'index.html'), 'utf8');
    const chunk = index.split(`/${slug}/`)[1];
    if (!chunk) {
      console.warn('No HTML for', slug);
      continue;
    }
    html = chunk;
  }

  const title = extractTitle(html) || slug;
  const description = extractMeta(html, 'og:description') || extractMeta(html, 'description');
  const ogImage = extractMeta(html, 'og:image').replace(/https:\/\/web\.archive\.org\/web\/\d+im_\//, '');
  const published = extractMeta(html, 'article:published_time').slice(0, 19);
  const modified = extractMeta(html, 'article:modified_time').slice(0, 19);
  const section = extractMeta(html, 'article:section');

  const cats = section
    ? [section.toLowerCase()]
    : slug === 'choose-langkawi-airport-car-rental'
      ? ['uncategorized']
      : ['place'];

  const existing = fs.readFileSync(mdPath, 'utf8');
  const dateMatch = existing.match(/^date: (.+)$/m);
  const date = published || dateMatch?.[1] || '2016-01-01T12:00:00+00:00';

  updateFrontMatter(mdPath, {
    title: title.replace(/ -$/, '').replace(/ - Mine's Wellness$/, ''),
    seoTitle: title,
    description: description.replace(/ …$/, '').replace(/ \[…\]$/, ''),
    date,
    lastmod: modified || date,
    author: 'Admin',
    categories: cats,
    ogImage: ogImage || undefined,
    draft: false,
  });
  console.log('SEO updated:', slug);
}

// Pages
const pages = [
  { slug: 'about-us', file: 'about-us.html' },
  { slug: 'contact-us', file: 'contact-us.html' },
  { slug: 'ads', file: 'ads.html' },
  { slug: 'privacy-policy', file: 'privacy-policy.html' },
];

for (const { slug, file } of pages) {
  const htmlPath = path.join(archiveDir, file);
  if (!fs.existsSync(htmlPath)) continue;
  const html = fs.readFileSync(htmlPath, 'utf8');
  const seoTitle = extractTitle(html);
  const description = extractMeta(html, 'og:description') || extractMeta(html, 'description');
  updateFrontMatter(path.join(root, 'content', `${slug}.md`), {
    title: seoTitle.replace(/ - Mine's Wellness$/, '').replace(/ -$/, ''),
    seoTitle,
    description,
    type: 'page',
    date: '2016-01-01T12:00:00+00:00',
    draft: false,
  });
  console.log('SEO updated page:', slug);
}

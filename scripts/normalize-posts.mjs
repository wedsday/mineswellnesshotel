/**
 * Normalize post front matter as TOML (+++). Avoids YAML breaking on ? in titles/seoTitle.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, '..', 'content', 'posts');

const posts = [
  {
    slug: 'great-italian-comfort-food-kuala-lumpur',
    title: 'Great Italian comfort food Kuala Lumpur',
    date: '2017-04-23T12:11:28+00:00',
    lastmod: '2017-04-21T12:33:48+00:00',
    categories: ['place'],
    description:
      'We found a great new hot spot in Kuala Lumpur. The best part about this place is it serves Italian food all day long.',
    ogImage: '/images/posts/great-italian-comfort-food-kuala-lumpur.jpg',
  },
  {
    slug: 'choose-langkawi-airport-car-rental',
    title: 'Why Choose Langkawi Airport Car Rental?',
    date: '2016-11-23T14:07:40+00:00',
    lastmod: '2016-11-23T14:07:40+00:00',
    categories: ['uncategorized'],
    description:
      'The Langkawi airport is the best location for convenient, affordable car rental when you visit Langkawi Island.',
  },
  {
    slug: 'can-get-becoming-malaysian-expat',
    title: 'What can you get when becoming a Malaysian Expat',
    date: '2016-11-15T17:00:10+00:00',
    lastmod: '2016-11-15T17:00:10+00:00',
    categories: ['place', 'travel-tips'],
  },
  {
    slug: 'information-kuala-gandah-elephant-sanctuary',
    title: 'Information About Kuala Gandah Elephant Sanctuary',
    date: '2016-09-19T16:26:39+00:00',
    lastmod: '2016-09-19T16:26:39+00:00',
    categories: ['place'],
    ogImage: '/images/posts/information-kuala-gandah-elephants.jpg',
    description:
      'The most popular elephant sanctuary in Malaysia is the Kuala Gandah Elephant Sanctuary. Activities, who should visit, and free entry.',
  },
  {
    slug: 'singapores-best-office-rental',
    title: "Singapore's Best Office Rental",
    date: '2016-09-14T16:54:52+00:00',
    lastmod: '2017-04-04T02:12:10+00:00',
    categories: ['place'],
    description:
      'When looking for an office to rent in Singapore, your search should be all about finding a place that will work for you over the long term.',
    ogImage: '/images/posts/singapores-best-office-rental.jpg',
  },
  {
    slug: 'getting-around-scenic-penang-car-rental-option',
    title: 'Getting Around Scenic Penang – The Car Rental Option',
    date: '2016-09-08T15:38:43+00:00',
    lastmod: '2016-09-08T15:38:43+00:00',
    categories: ['place'],
  },
];

function toZ(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso.replace(/\+00:00$/, 'Z');
  return d.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function tomlString(s) {
  return `'''${s.replace(/'/g, "''")}'''`;
}

function stripFrontMatter(raw) {
  let body = raw.trimStart();
  if (body.startsWith('+++')) {
    const end = body.indexOf('\n+++', 4);
    if (end !== -1) body = body.slice(end + 5);
  } else if (body.startsWith('---')) {
    const end = body.indexOf('\n---\n', 4);
    if (end !== -1) body = body.slice(end + 5);
  }
  return body
    .replace(/^draft\s*=\s*false\s*\+\+\+\s*/i, '')
    .replace(/^<h2[^>]*>.*?<\/h2>\s*/i, '')
    .trimStart();
}

function buildFrontMatter(p) {
  const lines = [
    '+++',
    `title = ${tomlString(p.title)}`,
    `slug = '${p.slug}'`,
    `seoTitle = ${tomlString(`${p.title} -`)}`,
    `date = ${toZ(p.date)}`,
    `lastmod = ${toZ(p.lastmod)}`,
    `author = 'Admin'`,
    `categories = [${p.categories.map((c) => `'${c}'`).join(', ')}]`,
  ];
  if (p.description) lines.push(`description = ${tomlString(p.description)}`);
  if (p.ogImage) lines.push(`ogImage = '${p.ogImage}'`);
  lines.push('draft = false', '+++', '', '');
  return lines.join('\n');
}

for (const p of posts) {
  const file = path.join(postsDir, `${p.slug}.md`);
  const body = stripFrontMatter(fs.readFileSync(file, 'utf8'));
  fs.writeFileSync(file, `${buildFrontMatter(p)}${body}\n`);
  console.log('OK', p.slug);
}

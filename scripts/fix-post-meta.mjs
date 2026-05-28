/** Fix titles/SEO for posts parsed only from index.html */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const index = fs.readFileSync(path.join(root, '_archive-html', 'index.html'), 'utf8');

const fixes = [
  'choose-langkawi-airport-car-rental',
  'can-get-becoming-malaysian-expat',
  'information-kuala-gandah-elephant-sanctuary',
  'getting-around-scenic-penang-car-rental-option',
];

for (const slug of fixes) {
  const re = new RegExp(
    `<h2 class="entry-title"[^>]*><a href="[^"]+/${slug}/"[^>]*>([^<]+)</a></h2>[\\s\\S]*?datetime="([^"]+)"`,
    'i',
  );
  const m = index.match(re);
  if (!m) {
    console.warn('no match', slug);
    continue;
  }
  const [, title, date] = m;
  const file = path.join(root, 'content', 'posts', `${slug}.md`);
  let c = fs.readFileSync(file, 'utf8');
  c = c.replace(/^title:.*$/m, `title: ${title.replace(/'/g, "''")}`);
  c = c.replace(/^seoTitle:.*$/m, `seoTitle: "${title} -"`);
  c = c.replace(/^date:.*$/m, `date: ${date.slice(0, 19)}`);
  fs.writeFileSync(file, c);
  console.log('fixed', slug, title);
}

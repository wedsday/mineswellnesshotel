import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const postsDir = path.join(root, 'content', 'posts');
const imgDir = path.join(root, 'static', 'images', 'posts');
fs.mkdirSync(imgDir, { recursive: true });

const headers = { 'User-Agent': 'Mozilla/5.0' };

for (const file of fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))) {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
  const m = content.match(/^ogImage: "(.+)"$/m);
  if (!m) continue;
  let url = m[1];
  if (!url.startsWith('http')) continue;
  const wayback = url.includes('web.archive.org')
    ? url
    : `https://web.archive.org/web/20170701231310im_/${url}`;
  const slug = file.replace(/\.md$/, '');
  const ext = path.extname(url.split('?')[0]) || '.jpg';
  const out = path.join(imgDir, `${slug}${ext}`);
  try {
    const res = await fetch(wayback, { headers });
    if (!res.ok) throw new Error(res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(out, buf);
    const rel = `/images/posts/${slug}${ext}`;
    const updated = content.replace(/^ogImage: .+$/m, `ogImage: "${rel}"`);
    fs.writeFileSync(path.join(postsDir, file), updated);
    console.log('OK', slug);
  } catch (e) {
    console.warn('FAIL', slug, e.message);
  }
}

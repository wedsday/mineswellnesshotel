/**
 * Download Kuala Gandah post images from the Wayback Machine (July 2017 snapshot).
 * Run: node scripts/download-gandah-images.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'static', 'images', 'posts');
fs.mkdirSync(outDir, { recursive: true });

const SNAPSHOT = '20170701231310';
const BASE = `https://web.archive.org/web/${SNAPSHOT}im_/http://www.mineswellnesshotel.com.my/wp-content/uploads/2016/09`;

const files = [
  {
    name: 'information-kuala-gandah-elephants.jpg',
    url: `${BASE}/elephants-300x200.jpg`,
  },
  {
    name: 'information-kuala-gandah-elephant.jpg',
    url: `${BASE}/elephant-300x169.jpg`,
  },
];

const headers = { 'User-Agent': 'Mozilla/5.0 (compatible; MinesWellnessRestore/1.0)' };

for (const { name, url } of files) {
  const dest = path.join(outDir, name);
  try {
    const res = await fetch(url, { headers, redirect: 'follow' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 500) throw new Error('response too small');
    fs.writeFileSync(dest, buf);
    console.log('OK', name, `(${buf.length} bytes)`);
  } catch (e) {
    console.error('FAIL', name, e.message);
    console.error('  ', url);
  }
}

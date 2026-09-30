import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ALLOWED = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'image/gif': 'gif',
  'image/avif': 'avif',
};
const MAX_BYTES = 4 * 1024 * 1024;

/** Saves an uploaded image File and returns its public URL. */
export async function saveImage(file, prefix = 'image') {
  if (!file || typeof file === 'string' || file.size === 0) return null;
  const ext = ALLOWED[file.type];
  if (!ext) throw new Error('Please upload a PNG, JPG, WebP, SVG, GIF or AVIF image.');
  if (file.size > MAX_BYTES) throw new Error('Images must be 4 MB or smaller.');

  const name = `${prefix}-${Date.now()}-${crypto.randomBytes(3).toString('hex')}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import('@vercel/blob');
    const blob = await put(`site/${name}`, file, { access: 'public', contentType: file.type });
    return blob.url;
  }
  if (process.env.VERCEL) {
    throw new Error('Image uploads need Vercel Blob. Connect a Blob store to this project.');
  }
  const dir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}

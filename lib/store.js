import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

/**
 * Tiny key/value store. Uses the first one that is configured:
 * 1. Upstash Redis via REST (KV_REST_API_* or UPSTASH_REDIS_REST_*)
 * 2. Vercel Blob (BLOB_READ_WRITE_TOKEN) — JSON files at an unguessable path
 * 3. Local development: JSON files in ./.data
 */
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

let redis = null;
async function getRedis() {
  if (!url || !token) return null;
  if (!redis) {
    const { Redis } = await import('@upstash/redis');
    redis = new Redis({ url, token });
  }
  return redis;
}

export const hasRemoteStore = Boolean((url && token) || blobToken);

// Blob files are public, so keep them under a folder only the server can compute.
function blobPath(key) {
  const seed = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || blobToken;
  const folder = crypto.createHash('sha256').update(`twgc-data:${seed}`).digest('hex').slice(0, 40);
  return `data/${folder}/${key.replace(/[^a-z0-9_-]/gi, '_')}.json`;
}

async function blobGet(key) {
  const { get } = await import('@vercel/blob');
  const res = await get(blobPath(key), { access: 'public', useCache: false }).catch((err) => {
    if (err?.name === 'BlobNotFoundError') return null;
    throw err;
  });
  if (!res?.stream) return null;
  return JSON.parse(await new Response(res.stream).text());
}

async function blobSet(key, value) {
  const { put } = await import('@vercel/blob');
  await put(blobPath(key), JSON.stringify(value), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  });
}

const DATA_DIR = path.join(process.cwd(), '.data');
const fileFor = (key) => path.join(DATA_DIR, `${key.replace(/[^a-z0-9_-]/gi, '_')}.json`);

export async function kvGet(key) {
  const r = await getRedis();
  if (r) return (await r.get(key)) ?? null;
  if (blobToken) return blobGet(key);
  try {
    return JSON.parse(await fs.readFile(fileFor(key), 'utf8'));
  } catch {
    return null;
  }
}

export async function kvSet(key, value) {
  const r = await getRedis();
  if (r) {
    await r.set(key, value);
    return;
  }
  if (blobToken) return blobSet(key, value);
  if (process.env.VERCEL) {
    throw new Error('Storage is not configured. Connect a Blob store (or Upstash Redis) to this Vercel project.');
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(fileFor(key), JSON.stringify(value, null, 2));
}

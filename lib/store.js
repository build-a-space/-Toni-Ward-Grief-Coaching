import { promises as fs } from 'node:fs';
import path from 'node:path';

/**
 * Tiny key/value store.
 * - Production (Vercel): Upstash Redis via REST (KV_REST_API_* or UPSTASH_REDIS_REST_*).
 * - Local development: JSON files in ./.data
 */
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

let redis = null;
async function getRedis() {
  if (!url || !token) return null;
  if (!redis) {
    const { Redis } = await import('@upstash/redis');
    redis = new Redis({ url, token });
  }
  return redis;
}

export const hasRemoteStore = Boolean(url && token);

const DATA_DIR = path.join(process.cwd(), '.data');
const fileFor = (key) => path.join(DATA_DIR, `${key.replace(/[^a-z0-9_-]/gi, '_')}.json`);

export async function kvGet(key) {
  const r = await getRedis();
  if (r) return (await r.get(key)) ?? null;
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
  if (process.env.VERCEL) {
    throw new Error('Storage is not configured. Connect Upstash Redis to this Vercel project.');
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(fileFor(key), JSON.stringify(value, null, 2));
}

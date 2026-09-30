import 'server-only';
import { cache } from 'react';
import { kvGet, kvSet } from './store';
import { DEFAULT_SETTINGS, SETTINGS_KEY } from './defaults';

export const getSettings = cache(async () => {
  let saved = null;
  try {
    saved = await kvGet(SETTINGS_KEY);
  } catch (err) {
    console.error('Could not load settings, using defaults:', err.message);
  }
  return { ...DEFAULT_SETTINGS, ...(saved || {}) };
});

export async function saveSettings(patch) {
  const current = await getSettings();
  const next = { ...current, ...patch, updatedAt: new Date().toISOString() };
  await kvSet(SETTINGS_KEY, next);
  return next;
}

// --- helpers used across templates ---
export const telHref = (phone) => `tel:+1${String(phone || '').replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '')}`;
export const fullAddress = (s) => `${s.street}, ${s.city}, ${s.state} ${s.zip}`;

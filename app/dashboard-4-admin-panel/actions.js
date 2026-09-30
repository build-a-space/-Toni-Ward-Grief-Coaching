'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  SESSION_COOKIE,
  checkCredentials,
  createSessionToken,
  verifySessionToken,
  sessionCookieOptions,
} from '@/lib/auth';
import { saveSettings } from '@/lib/settings';
import { saveImage } from '@/lib/uploads';
import { updateMessages } from '@/lib/messages';
import { ADMIN_PATH } from '@/lib/site';

async function requireAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) throw new Error('Your session expired. Please log in again.');
}

const refreshSite = () => revalidatePath('/', 'layout');

// ---------- auth ----------
export async function login(_prev, formData) {
  const ok = checkCredentials(formData.get('username'), formData.get('password'));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 1200)); // slow down guessing
    return { error: 'Incorrect username or password.', username: String(formData.get('username') || '') };
  }
  (await cookies()).set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);
  redirect(ADMIN_PATH);
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect(ADMIN_PATH);
}

// ---------- settings ----------
const HEX = /^#[0-9a-f]{6}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELDS = {
  status: ['maintenanceTitle', 'maintenanceMessage'],
  branding: ['businessName', 'tagline', 'ownerName', 'logoAlt', 'colorPrimary', 'colorAccent', 'announcement'],
  contact: [
    'phone', 'phoneSecondary', 'email', 'emailSecondary', 'street', 'city', 'state', 'zip',
    'serviceArea', 'hours', 'bookingUrl', 'consultationText',
  ],
  social: ['facebook', 'instagram', 'youtube', 'tiktok', 'linkedin'],
};
const IMAGES = { logo: 'logoUrl', hero: 'heroImageUrl', headshot: 'headshotUrl' };
const REQUIRED = ['businessName', 'phone', 'email', 'street', 'city', 'state', 'zip'];

function validate(patch) {
  for (const k of REQUIRED) if (k in patch && !patch[k]) return `${k} can’t be empty.`;
  for (const k of ['email', 'emailSecondary']) if (patch[k] && !EMAIL.test(patch[k])) return `“${patch[k]}” isn’t a valid email.`;
  for (const k of ['colorPrimary', 'colorAccent']) if (k in patch && !HEX.test(patch[k])) return 'Colors must look like #3d2c5e.';
  for (const k of FIELDS.social) if (patch[k] && !/^https:\/\//.test(patch[k])) return 'Social links must start with https://';
  if ('bookingUrl' in patch && !/^(\/|https:\/\/)/.test(patch.bookingUrl)) return 'Booking link must start with / or https://';
  return null;
}

export async function saveSection(_prev, formData) {
  try {
    await requireAdmin();
    const section = formData.get('_section');
    const fields = FIELDS[section];
    if (!fields) return { error: 'Unknown section.' };

    const patch = {};
    for (const k of fields) patch[k] = String(formData.get(k) ?? '').trim().slice(0, 1000);

    if (section === 'branding') {
      for (const [input, key] of Object.entries(IMAGES)) {
        if (formData.get(`remove_${input}`) === 'on') {
          patch[key] = input === 'logo' ? '/logo.webp' : '';
          continue;
        }
        const url = await saveImage(formData.get(input), input);
        if (url) patch[key] = url;
      }
    }

    const error = validate(patch);
    if (error) return { error };

    await saveSettings(patch);
    refreshSite();
    return { ok: 'Saved! Changes are live on the site.' };
  } catch (err) {
    return { error: err.message || 'Could not save.' };
  }
}

export async function setSiteOnline(_prev, formData) {
  try {
    await requireAdmin();
    const online = formData.get('online') === 'true';
    await saveSettings({ maintenanceEnabled: !online });
    refreshSite();
    return {
      ok: online
        ? 'The website is ON and visible to everyone.'
        : 'The website is OFF. Visitors now see the “be back soon” page (you still see the site while logged in).',
    };
  } catch (err) {
    return { error: err.message };
  }
}

// ---------- messages ----------
export async function messageAction(formData) {
  await requireAdmin();
  const id = formData.get('id');
  const op = formData.get('op');
  await updateMessages((all) =>
    op === 'delete' ? all.filter((m) => m.id !== id) : all.map((m) => (m.id === id ? { ...m, read: !m.read } : m)),
  );
  revalidatePath(ADMIN_PATH);
}

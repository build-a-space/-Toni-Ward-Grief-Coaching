import { NextResponse } from 'next/server';
import { kvGet } from '@/lib/store';
import { DEFAULT_SETTINGS, SETTINGS_KEY } from '@/lib/defaults';
import { maintenanceHtml } from '@/lib/maintenance-page';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';
import { ADMIN_PATH } from '@/lib/site';

// Cache the on/off flag briefly so we don't hit storage on every request.
let cached = { at: 0, settings: null };
const TTL_MS = 10_000;

async function currentSettings() {
  if (Date.now() - cached.at < TTL_MS && cached.settings) return cached.settings;
  const settings = { ...DEFAULT_SETTINGS, ...((await kvGet(SETTINGS_KEY)) || {}) };
  cached = { at: Date.now(), settings };
  return settings;
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith(ADMIN_PATH)) return NextResponse.next();

  let settings;
  try {
    settings = await currentSettings();
  } catch {
    return NextResponse.next();
  }
  if (!settings.maintenanceEnabled) return NextResponse.next();

  // Logged-in admin can still preview the live site.
  let isAdmin = false;
  try {
    isAdmin = verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  } catch {}
  if (isAdmin) return NextResponse.next();

  // Let assets used by the maintenance page through.
  if (pathname === settings.logoUrl) return NextResponse.next();

  return new NextResponse(maintenanceHtml(settings), {
    status: 503,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Retry-After': '3600', 'Cache-Control': 'no-store' },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|uploads/).*)'],
};

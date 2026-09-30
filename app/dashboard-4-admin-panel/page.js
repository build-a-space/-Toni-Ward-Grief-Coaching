import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken, isAdminConfigured } from '@/lib/auth';
import { getSettings } from '@/lib/settings';
import { listMessages } from '@/lib/messages';
import { hasRemoteStore } from '@/lib/store';
import { LoginForm, SectionForm, SiteToggle, Field, ImageField } from './forms';
import { logout, messageAction } from './actions';

export const dynamic = 'force-dynamic';

const fmt = (iso) => new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/New_York' });

export default async function AdminPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  let authed = false;
  try { authed = verifySessionToken(token); } catch {}

  if (!authed) {
    return (
      <main className="admin-center">
        <LoginForm configured={isAdminConfigured()} />
      </main>
    );
  }

  const s = await getSettings();
  const messages = await listMessages().catch(() => []);
  const unread = messages.filter((m) => !m.read).length;
  const storageMissing = process.env.VERCEL && !hasRemoteStore;
  const blobMissing = process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN;

  return (
    <>
      <header className="admin-top">
        <div className="admin-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.logoUrl} alt="" width="44" height="40" />
          <span>{s.businessName} — Dashboard</span>
        </div>
        <nav className="admin-nav">
          <a href="#status">Site on/off</a>
          <a href="#branding">Logo & branding</a>
          <a href="#contact">Contact info</a>
          <a href="#social">Social</a>
          <a href="#messages">Messages{unread ? ` (${unread})` : ''}</a>
          <a href="/" target="_blank" rel="noopener">View site ↗</a>
          <form action={logout}><button className="linkish">Log out</button></form>
        </nav>
      </header>

      <main className="admin-main">
        {storageMissing ? (
          <p className="admin-status err">
            Storage isn’t connected, so changes can’t be saved. In Vercel, open this project → Storage → create a Blob store, then redeploy.
          </p>
        ) : null}
        {blobMissing ? (
          <p className="admin-status warn">Image uploads need a Vercel Blob store: Vercel project → Storage → Create → Blob, then redeploy.</p>
        ) : null}
        {s.updatedAt ? <p className="admin-help">Last saved {fmt(s.updatedAt)}</p> : null}

        <section className="admin-card" id="status">
          <h2>Website on / off</h2>
          <p className="admin-help">
            Turning the site off shows a simple “be back soon” page with your phone and email (and tells Google it’s temporary, so rankings are kept).
            You’ll still see the full site while logged in. Takes effect within about 10 seconds.
          </p>
          <SiteToggle online={!s.maintenanceEnabled} />
        </section>

        <SectionForm section="status" title="“Be back soon” page text" description="What visitors see while the site is turned off.">
          <Field label="Heading" name="maintenanceTitle" defaultValue={s.maintenanceTitle} />
          <Field label="Message" name="maintenanceMessage" type="textarea" defaultValue={s.maintenanceMessage} />
        </SectionForm>

        <SectionForm section="branding" title="Logo, photos & branding">
          <ImageField label="Logo" name="logo" current={s.logoUrl} hint="PNG/WebP with a transparent background works best. The site header is dark, so a light logo looks great." />
          <ImageField label="Hero / banner background photo" name="hero" current={s.heroImageUrl} hint="Wide landscape photo, at least 1600px wide." />
          <ImageField label="Toni’s photo (About section)" name="headshot" current={s.headshotUrl} hint="Portrait photo, around 800×1000px." />
          <Field label="Logo description (alt text for accessibility/SEO)" name="logoAlt" defaultValue={s.logoAlt} />
          <Field label="Business name" name="businessName" defaultValue={s.businessName} required />
          <Field label="Tagline" name="tagline" defaultValue={s.tagline} />
          <Field label="Coach name" name="ownerName" defaultValue={s.ownerName} />
          <div className="admin-two">
            <Field label="Main color" name="colorPrimary" type="color" defaultValue={s.colorPrimary} />
            <Field label="Accent color" name="colorAccent" type="color" defaultValue={s.colorAccent} />
          </div>
          <Field label="Announcement bar (optional)" name="announcement" defaultValue={s.announcement} hint="Shows a thin banner above the header on every page. Leave empty to hide." />
        </SectionForm>

        <SectionForm section="contact" title="Phone, email & address" description="Updates the header, footer, contact page, map and Google schema everywhere at once.">
          <div className="admin-two">
            <Field label="Main phone" name="phone" type="tel" defaultValue={s.phone} required />
            <Field label="Second phone (optional)" name="phoneSecondary" type="tel" defaultValue={s.phoneSecondary} />
            <Field label="Main email" name="email" type="email" defaultValue={s.email} required hint="Contact form messages are also sent here if email delivery is set up." />
            <Field label="Second email (optional)" name="emailSecondary" type="email" defaultValue={s.emailSecondary} />
          </div>
          <Field label="Street address" name="street" defaultValue={s.street} required />
          <div className="admin-three">
            <Field label="City" name="city" defaultValue={s.city} required />
            <Field label="State" name="state" defaultValue={s.state} required />
            <Field label="ZIP" name="zip" defaultValue={s.zip} required />
          </div>
          <Field label="Service area" name="serviceArea" defaultValue={s.serviceArea} />
          <Field label="Hours" name="hours" defaultValue={s.hours} />
          <div className="admin-two">
            <Field label="Consultation button text" name="consultationText" defaultValue={s.consultationText} />
            <Field label="Consultation button link" name="bookingUrl" defaultValue={s.bookingUrl} hint="Use the contact page (/contact-toni-ward-for-grief-coaching-support) or a Calendly-style https:// link." />
          </div>
        </SectionForm>

        <SectionForm section="social" title="Social media links" description="Leave a field empty to hide that icon. Links must start with https://">
          <div className="admin-two">
            <Field label="Facebook" name="facebook" type="url" defaultValue={s.facebook} />
            <Field label="Instagram" name="instagram" type="url" defaultValue={s.instagram} />
            <Field label="YouTube" name="youtube" type="url" defaultValue={s.youtube} />
            <Field label="TikTok" name="tiktok" type="url" defaultValue={s.tiktok} />
            <Field label="LinkedIn" name="linkedin" type="url" defaultValue={s.linkedin} />
          </div>
        </SectionForm>

        <section className="admin-card" id="messages">
          <h2>Contact form messages {unread ? <span className="badge">{unread} new</span> : null}</h2>
          {!messages.length ? <p className="admin-help">No messages yet.</p> : null}
          <ul className="msg-list">
            {messages.map((m) => (
              <li key={m.id} className={m.read ? 'read' : 'unread'}>
                <div className="msg-head">
                  <strong>{m.name}</strong> · <a href={`mailto:${m.email}`}>{m.email}</a>
                  {m.phone ? <> · <a href={`tel:${m.phone}`}>{m.phone}</a></> : null}
                  <span className="msg-meta">{m.topic} · {fmt(m.createdAt)}</span>
                </div>
                <p className="msg-body">{m.message}</p>
                <div className="msg-actions">
                  <form action={messageAction}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="op" value="toggle" />
                    <button className="linkish">{m.read ? 'Mark unread' : 'Mark read'}</button>
                  </form>
                  <form action={messageAction}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="op" value="delete" />
                    <button className="linkish danger">Delete</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

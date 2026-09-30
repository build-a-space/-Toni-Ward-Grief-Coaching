import Link from 'next/link';
import { ROUTES } from '@/lib/site';
import { POSTS } from '@/content/posts';
import { telHref, fullAddress } from '@/lib/settings';
import Icon from './Icon';

export default function Footer({ settings: s }) {
  const socials = [
    ['Facebook', s.facebook],
    ['Instagram', s.instagram],
    ['YouTube', s.youtube],
    ['TikTok', s.tiktok],
    ['LinkedIn', s.linkedin],
  ].filter(([, url]) => url);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.logoUrl} alt={s.logoAlt} width="110" height="98" loading="lazy" className="footer-logo" />
          <p className="footer-about">
            Compassionate grief coaching, widow support, online sessions and workshops — helping you find hope and purpose again after loss.
          </p>
          {socials.length ? (
            <ul className="socials">
              {socials.map(([name, url]) => (
                <li key={name}><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></li>
              ))}
            </ul>
          ) : null}
        </div>

        <div>
          <h2 className="footer-h">Services</h2>
          <ul className="footer-links">
            <li><Link href={ROUTES.services}>All Services</Link></li>
            <li><Link href={ROUTES.griefCoaching}>Grief Coaching in Berlin, MD</Link></li>
            <li><Link href={ROUTES.individual}>Individual Grief Support</Link></li>
            <li><Link href={ROUTES.widow}>Widow Support</Link></li>
            <li><Link href={ROUTES.speaking}>Public Speaking & Workshops</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="footer-h">Resources</h2>
          <ul className="footer-links">
            <li><Link href={ROUTES.resources}>Grief Recovery Tools</Link></li>
            <li><Link href={ROUTES.videos}>Videos & YouTube</Link></li>
            <li><Link href={ROUTES.membership}>Membership Area</Link></li>
            <li><Link href={ROUTES.blog}>Blog</Link></li>
            {POSTS.slice(0, 2).map((p) => (
              <li key={p.slug}><Link href={`/blog/${p.slug}`}>{p.title.split(':')[0]}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer-h">Contact</h2>
          <address className="footer-contact">
            <a href={telHref(s.phone)}><Icon name="phone" size={18} /> {s.phone}</a>
            {s.phoneSecondary ? <a href={telHref(s.phoneSecondary)}><Icon name="phone" size={18} /> {s.phoneSecondary}</a> : null}
            <a href={`mailto:${s.email}`}><Icon name="mail" size={18} /> {s.email}</a>
            {s.emailSecondary ? <a href={`mailto:${s.emailSecondary}`}><Icon name="mail" size={18} /> {s.emailSecondary}</a> : null}
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress(s))}`} target="_blank" rel="noopener noreferrer">
              <Icon name="pin" size={18} /> {fullAddress(s)}
            </a>
          </address>
          <p className="footer-small">{s.hours}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {s.businessName}. All rights reserved.</p>
        <p className="footer-small">
          Grief coaching is not a substitute for medical or mental-health treatment. In crisis? Call or text <a href="tel:988">988</a>.
        </p>
      </div>
    </footer>
  );
}

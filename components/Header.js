import Link from 'next/link';
import { NAV } from '@/lib/site';
import { telHref } from '@/lib/settings';
import MobileMenu from './MobileMenu';

export default function Header({ settings }) {
  return (
    <>
      {settings.announcement ? <div className="announcement">{settings.announcement}</div> : null}
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label={`${settings.businessName} — home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={settings.logoUrl} alt={settings.logoAlt} width="72" height="64" className="brand-logo" />
            <span className="brand-text">
              <span className="brand-name">{settings.businessName}</span>
              <span className="brand-tag">Certified Grief Coach · Berlin, MD</span>
            </span>
          </Link>

          <nav className="main-nav" aria-label="Main">
            <ul>
              {NAV.map((item) => (
                <li key={item.href} className={item.children ? 'has-children' : undefined}>
                  <Link href={item.href}>{item.label}</Link>
                  {item.children ? (
                    <ul className="dropdown">
                      {item.children.map((c) => (
                        <li key={c.href + c.label}>
                          <Link href={c.href}>{c.label}</Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-cta">
            <a className="header-phone" href={telHref(settings.phone)}>{settings.phone}</a>
            <Link className="btn btn-accent btn-sm" href={settings.bookingUrl}>Free Consultation</Link>
          </div>
          <MobileMenu nav={NAV} phone={settings.phone} phoneHref={telHref(settings.phone)} bookingUrl={settings.bookingUrl} />
        </div>
      </header>
    </>
  );
}

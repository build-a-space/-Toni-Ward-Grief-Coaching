'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileMenu({ nav, phone, phoneHref, bookingUrl }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div className="mobile-menu">
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span /><span />
      </button>
      <nav id="mobile-nav" className={`mobile-nav ${open ? 'open' : ''}`} aria-label="Mobile">
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
              {item.children ? (
                <ul>
                  {item.children.map((c) => (
                    <li key={c.href + c.label}><Link href={c.href}>{c.label}</Link></li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        <a className="btn btn-outline-light" href={phoneHref}>Call {phone}</a>
        <Link className="btn btn-accent" href={bookingUrl}>Free Consultation</Link>
      </nav>
    </div>
  );
}

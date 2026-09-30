import Link from 'next/link';
import { telHref } from '@/lib/settings';

export default function CtaBand({ settings, title = 'You don’t have to walk this road alone.' }) {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <h2>{title}</h2>
          <p>Start with a complimentary 30-minute consultation — in person in Berlin, MD or online from anywhere.</p>
        </div>
        <div className="cta-actions">
          <Link className="btn btn-accent" href={settings.bookingUrl}>{settings.consultationText}</Link>
          <a className="btn btn-outline-light" href={telHref(settings.phone)}>Call {settings.phone}</a>
        </div>
      </div>
    </section>
  );
}

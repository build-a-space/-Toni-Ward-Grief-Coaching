import { getSettings, telHref, fullAddress } from '@/lib/settings';
import { ROUTES } from '@/lib/site';
import { graph, webPageSchema, breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/Icon';

const title = 'Contact Toni Ward | Grief Coaching in Berlin, MD';
const description =
  'Contact Toni Ward for grief coaching and widow support in Berlin, MD. Call, email or send a message to book a free 30-minute consultation.';

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: ROUTES.contact },
  openGraph: { title, description, url: ROUTES.contact },
};

export default async function Contact() {
  const s = await getSettings();
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Contact', href: ROUTES.contact }];
  const mapQuery = encodeURIComponent(fullAddress(s));
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: ROUTES.contact, title, description, type: 'ContactPage' }), breadcrumbSchema(crumbs))} />
      <PageHero
        eyebrow="Contact"
        title="Contact Toni Ward"
        lead="Reaching out can be the hardest step. Call, email or send a message below — Toni will respond with care."
        breadcrumbs={crumbs}
        image={s.heroImageUrl}
      />
      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2>Send a message</h2>
            <ContactForm />
          </div>
          <aside className="contact-info">
            <h2>Get in touch</h2>
            <ul>
              <li><Icon name="phone" /> <a href={telHref(s.phone)}>{s.phone}</a></li>
              {s.phoneSecondary ? <li><Icon name="phone" /> <a href={telHref(s.phoneSecondary)}>{s.phoneSecondary}</a></li> : null}
              <li><Icon name="mail" /> <a href={`mailto:${s.email}`}>{s.email}</a></li>
              {s.emailSecondary ? <li><Icon name="mail" /> <a href={`mailto:${s.emailSecondary}`}>{s.emailSecondary}</a></li> : null}
              <li><Icon name="pin" /> <span>{fullAddress(s)}</span></li>
            </ul>
            <p><strong>Service area:</strong> {s.serviceArea}</p>
            <p><strong>Hours:</strong> {s.hours}</p>
            <div className="map">
              <iframe
                title={`Map to ${s.businessName}`}
                src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

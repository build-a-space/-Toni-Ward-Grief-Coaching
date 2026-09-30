import Link from 'next/link';
import { PAGES, SERVICE_CARDS } from '@/content/pages';
import { getSettings } from '@/lib/settings';
import { ROUTES } from '@/lib/site';
import { graph, webPageSchema, breadcrumbSchema, serviceSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import Icon from '@/components/Icon';

const title = 'Our Services | Toni Ward Grief Coaching in Berlin, MD';
const description =
  'Grief coaching, widow support, online video sessions, workshops and speaking engagements from certified grief coach Toni Ward in Berlin, MD.';

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: ROUTES.services },
  openGraph: { title, description, url: ROUTES.services },
};

export default async function Services() {
  const s = await getSettings();
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Services', href: ROUTES.services }];
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: ROUTES.services, title, description, type: 'CollectionPage' }),
          breadcrumbSchema(crumbs),
          SERVICE_CARDS.map((c) => serviceSchema({ name: c.title, description: c.text, path: PAGES[c.key].path })),
        )}
      />
      <PageHero
        eyebrow="Our Services"
        title="Grief Coaching Services in Berlin, MD"
        lead="Personalized, compassionate support for every season of grief — in person at Toni’s Berlin office or online from anywhere."
        breadcrumbs={crumbs}
        image={s.heroImageUrl}
      />
      <section className="section">
        <div className="container">
          <div className="service-rows">
            {SERVICE_CARDS.map((c) => {
              const p = PAGES[c.key];
              return (
                <article key={c.key} className="service-row">
                  <span className="service-icon"><Icon name={c.icon} size={34} /></span>
                  <div>
                    <h2>{c.title}</h2>
                    <p>{p.lead}</p>
                    <p>{c.text}</p>
                    <Link className="btn btn-outline" href={p.path}>Learn about {c.title.toLowerCase()}</Link>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="notice">
            <h2>Complimentary 30-minute consultation</h2>
            <p>
              Not sure where to start? Share what you’re going through and Toni will help you decide what kind of support fits best.{' '}
              <Link href={ROUTES.contact}>Request your consultation</Link>.
            </p>
          </div>
        </div>
      </section>
      <CtaBand settings={s} />
    </>
  );
}

import Link from 'next/link';
import { PAGES } from '@/content/pages';
import { POSTS } from '@/content/posts';
import { getSettings, telHref } from '@/lib/settings';
import { graph, webPageSchema, breadcrumbSchema, serviceSchema, faqSchema } from '@/lib/schema';
import { ROUTES } from '@/lib/site';
import JsonLd from './JsonLd';
import PageHero from './PageHero';
import Faq from './Faq';
import CtaBand from './CtaBand';
import Icon from './Icon';
import RichText from './RichText';

export function servicePageMetadata(key) {
  const p = PAGES[key];
  return {
    title: { absolute: p.metaTitle },
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: { title: p.metaTitle, description: p.description, url: p.path, type: 'website' },
  };
}

const parentFor = (key) =>
  ['resources', 'videos', 'membership'].includes(key)
    ? { name: 'Resources', href: ROUTES.resources }
    : { name: 'Services', href: ROUTES.services };

export default async function ServicePage({ pageKey }) {
  const p = PAGES[pageKey];
  const s = await getSettings();
  const parent = parentFor(pageKey);
  const crumbs = [{ name: 'Home', href: '/' }, ...(parent.href === p.path ? [] : [parent]), { name: p.eyebrow, href: p.path }];

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: p.path, title: p.metaTitle, description: p.description }),
          breadcrumbSchema(crumbs),
          serviceSchema({ name: p.h1, description: p.description, path: p.path, serviceType: p.serviceType }),
          p.faqs?.length ? faqSchema(p.faqs) : null,
        )}
      />
      <PageHero eyebrow={p.eyebrow} title={p.h1} lead={p.lead} breadcrumbs={crumbs} image={s.heroImageUrl} />

      <section className="section">
        <div className="container content-grid">
          <article className="prose">
            {p.sections.map((sec) => (
              <section key={sec.h2}>
                <h2>{sec.h2}</h2>
                {sec.body?.map((t) => <p key={t}><RichText text={t} /></p>)}
                {sec.bullets ? (
                  <ul className="check-list">
                    {sec.bullets.map((b) => (
                      <li key={b}><Icon name="check" size={18} /> <span><RichText text={b} /></span></li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {p.showVideos ? (
              <section>
                <h2>Watch on YouTube</h2>
                {s.youtube ? (
                  <p>
                    Subscribe to Toni’s channel for new videos:{' '}
                    <a href={s.youtube} target="_blank" rel="noopener noreferrer">Toni Ward Grief Coaching on YouTube</a>.
                  </p>
                ) : (
                  <p>New videos are shared regularly. <Link href={ROUTES.contact}>Contact Toni</Link> to be notified when they’re posted.</p>
                )}
                {s.tiktok ? (
                  <p>Short encouragement is also shared on <a href={s.tiktok} target="_blank" rel="noopener noreferrer">TikTok (Grief Tea)</a>.</p>
                ) : null}
              </section>
            ) : null}
          </article>

          <aside className="sidebar">
            <div className="side-card">
              <h2>Talk with Toni</h2>
              <p>Complimentary 30-minute consultation — in person or online.</p>
              <Link className="btn btn-primary btn-block" href={s.bookingUrl}>{s.consultationText}</Link>
              <a className="side-phone" href={telHref(s.phone)}><Icon name="phone" size={18} /> {s.phone}</a>
              <a className="side-phone" href={`mailto:${s.email}`}><Icon name="mail" size={18} /> {s.email}</a>
            </div>
            <div className="side-card">
              <h2>Related</h2>
              <ul className="side-links">
                {p.related.map((k) => (
                  <li key={k}><Link href={PAGES[k].path}>{PAGES[k].h1}</Link></li>
                ))}
                <li><Link href={ROUTES.blog}>Grief &amp; Healing Blog</Link></li>
              </ul>
            </div>
            <div className="side-card">
              <h2>Latest articles</h2>
              <ul className="side-links">
                {POSTS.slice(0, 4).map((post) => (
                  <li key={post.slug}><Link href={`/blog/${post.slug}`}>{post.seoTitle || post.title}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Faq faqs={p.faqs} />
      <CtaBand settings={s} />
    </>
  );
}

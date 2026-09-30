import Link from 'next/link';
import { POSTS } from '@/content/posts';
import { getSettings } from '@/lib/settings';
import { ROUTES, absoluteUrl } from '@/lib/site';
import { graph, webPageSchema, breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';

const title = 'Blog - Toni Ward Grief Coaching';
const description =
  'A gentle space to explore grief, healing and emotional wellness, guided by Toni Ward’s compassionate approach — support, insight and tools for life after loss.';

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: ROUTES.blog },
  openGraph: { title, description, url: ROUTES.blog },
};

const fmt = (d) => new Date(`${d}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default async function Blog() {
  const s = await getSettings();
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Blog', href: ROUTES.blog }];
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: ROUTES.blog, title, description, type: 'CollectionPage' }),
          breadcrumbSchema(crumbs),
          {
            '@type': 'Blog',
            name: `${s.businessName} Blog`,
            url: absoluteUrl(ROUTES.blog),
            blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: absoluteUrl(`/blog/${p.slug}`), datePublished: p.date })),
          },
        )}
      />
      <PageHero eyebrow="Blog" title="Grief & Healing Blog" lead={description} breadcrumbs={crumbs} image={s.heroImageUrl} />
      <section className="section">
        <div className="container post-grid">
          {POSTS.map((p) => (
            <article key={p.slug} className="post-card">
              <p className="post-meta">{p.category} · <time dateTime={p.date}>{fmt(p.date)}</time></p>
              <h2><Link href={`/blog/${p.slug}`}>{p.title}</Link></h2>
              <p>{p.description}</p>
              <Link className="more" href={`/blog/${p.slug}`} aria-label={`Read: ${p.title}`}>Read article →</Link>
            </article>
          ))}
        </div>
      </section>
      <CtaBand settings={s} />
    </>
  );
}

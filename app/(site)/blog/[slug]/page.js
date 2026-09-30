import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS, getPost } from '@/content/posts';
import { getSettings } from '@/lib/settings';
import { ROUTES } from '@/lib/site';
import { graph, webPageSchema, breadcrumbSchema, blogPostingSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';

export const dynamicParams = false;
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {
    title: { absolute: post.title },
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: path },
    openGraph: { type: 'article', title: post.title, description: post.description, url: path, publishedTime: post.date },
  };
}

const fmt = (d) => new Date(`${d}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

function Block({ b }) {
  if (b.h2) return <h2>{b.h2}</h2>;
  if (b.ul) return <ul>{b.ul.map((li) => <li key={li}>{li}</li>)}</ul>;
  if (b.quote) return <blockquote>{b.quote}</blockquote>;
  return <p>{b.p}</p>;
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const s = await getSettings();
  const path = `/blog/${post.slug}`;
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Blog', href: ROUTES.blog }, { name: post.title, href: path }];
  const related = post.related.map(getPost).filter(Boolean);

  return (
    <>
      <JsonLd
        data={graph(webPageSchema({ path, title: post.title, description: post.description }), breadcrumbSchema(crumbs), blogPostingSchema(post, s))}
      />
      <PageHero eyebrow={post.category} title={post.title} breadcrumbs={crumbs} image={s.heroImageUrl} />
      <section className="section">
        <div className="container content-grid">
          <article className="prose">
            <p className="post-meta">By {s.ownerName} · <time dateTime={post.date}>{fmt(post.date)}</time></p>
            {post.body.map((b, i) => <Block key={i} b={b} />)}
            <div className="notice">
              <p>
                Looking for personal support? Learn about <Link href={ROUTES.griefCoaching}>grief coaching in Berlin, MD</Link>,{' '}
                <Link href={ROUTES.widow}>widow support</Link> or <Link href={ROUTES.contact}>book a free consultation</Link>.
              </p>
            </div>
          </article>
          <aside className="sidebar">
            <div className="side-card">
              <h2>Keep reading</h2>
              <ul className="side-links">
                {related.map((r) => <li key={r.slug}><Link href={`/blog/${r.slug}`}>{r.title}</Link></li>)}
              </ul>
            </div>
            <div className="side-card">
              <h2>Services</h2>
              <ul className="side-links">
                <li><Link href={ROUTES.griefCoaching}>Grief Coaching</Link></li>
                <li><Link href={ROUTES.widow}>Widow Support</Link></li>
                <li><Link href={ROUTES.speaking}>Workshops & Speaking</Link></li>
                <li><Link href={ROUTES.resources}>Grief Resources</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand settings={s} />
    </>
  );
}

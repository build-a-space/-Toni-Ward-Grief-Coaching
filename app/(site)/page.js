import Link from 'next/link';
import { getSettings, telHref } from '@/lib/settings';
import { PAGES, SERVICE_CARDS, HOME_FAQS } from '@/content/pages';
import { POSTS } from '@/content/posts';
import { ROUTES } from '@/lib/site';
import { graph, webPageSchema, faqSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import Icon from '@/components/Icon';

export const metadata = { alternates: { canonical: '/' } };

export default async function Home() {
  const s = await getSettings();
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: '/', title: `${s.businessName} | ${s.tagline}`, description: 'Compassionate grief support in Berlin, MD.' }),
          faqSchema(HOME_FAQS),
        )}
      />

      <section className="hero" style={s.heroImageUrl ? { '--hero-img': `url("${s.heroImageUrl}")` } : undefined}>
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Certified Grief Coach · Berlin, MD & Online</p>
            <h1>Compassionate Grief Support in Berlin, MD</h1>
            <p className="lead">
              After the profound loss of her husband in 2016, Toni Ward dedicated her life to helping others navigate the journey of grief.
              Personalized, compassionate support to help you find hope and purpose again.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-accent" href={s.bookingUrl}>{s.consultationText}</Link>
              <a className="btn btn-outline-light" href={telHref(s.phone)}>Call {s.phone}</a>
            </div>
            <ul className="hero-points">
              <li><Icon name="check" size={18} /> In-person in Berlin, MD</li>
              <li><Icon name="check" size={18} /> Secure online video sessions</li>
              <li><Icon name="check" size={18} /> Faith-informed, judgment-free</li>
            </ul>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero-logo" src={s.logoUrl} alt={s.logoAlt} width="310" height="278" fetchPriority="high" />
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <p className="eyebrow center">How Toni Can Help</p>
          <h2 id="services-title" className="section-title center">Grief Support Services</h2>
          <div className="card-grid">
            {SERVICE_CARDS.map((c) => (
              <Link key={c.key} href={PAGES[c.key].path} className="service-card">
                <span className="service-icon"><Icon name={c.icon} size={30} /></span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="more">Learn more <Icon name="arrow" size={16} /></span>
              </Link>
            ))}
          </div>
          <p className="center"><Link className="btn btn-primary" href={ROUTES.services}>View All Services</Link></p>
        </div>
      </section>

      <section className="section alt" id="about" aria-labelledby="about-title">
        <div className="container about-grid">
          <div className="about-photo">
            {s.headshotUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.headshotUrl} alt={`${s.ownerName}, certified grief coach in Berlin, MD`} loading="lazy" width="480" height="560" />
            ) : (
              <div className="photo-placeholder"><Icon name="leaf" size={64} /><span>{s.ownerName}</span></div>
            )}
          </div>
          <div className="prose">
            <p className="eyebrow">Meet Your Coach</p>
            <h2 id="about-title">Meet Toni Ward</h2>
            <p>
              In 2016, Toni became a widow very suddenly at the age of 38. Feeling the full weight of grief, she found a new purpose in
              supporting the grieving community and vowed to use her experience to help others.
            </p>
            <p>
              Toni went on to earn a bachelor’s degree in Christian studies and is pursuing a Master of Science in Thanatology. She has
              supported grieving people in funeral homes, hospices and churches, and has served as a Soaring Spirits volunteer regional
              group leader.
            </p>
            <p>
              Today, as a certified grief coach specializing in the <strong>B.R.E.A.T.H.E.</strong> model, she empowers clients toward
              growth, resilience and meaning-making.
            </p>
            <Link className="btn btn-primary" href={ROUTES.griefCoaching}>About Grief Coaching</Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="steps-title">
        <div className="container">
          <h2 id="steps-title" className="section-title center">Your First Steps Toward Healing</h2>
          <ol className="steps">
            <li><h3>Reach out</h3><p>Call, email or send a message to schedule your free 30-minute consultation.</p></li>
            <li><h3>Share your story</h3><p>Toni listens, explains her approach and helps you outline your needs and goals.</p></li>
            <li><h3>Heal at your pace</h3><p>Meet in person in Berlin or online, with support tailored to your unique journey.</p></li>
          </ol>
        </div>
      </section>

      <section className="section alt" aria-labelledby="blog-title">
        <div className="container">
          <h2 id="blog-title" className="section-title center">From the Blog</h2>
          <div className="post-grid">
            {POSTS.slice(0, 3).map((p) => (
              <article key={p.slug} className="post-card">
                <p className="post-meta">{p.category}</p>
                <h3><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
                <p>{p.description}</p>
              </article>
            ))}
          </div>
          <p className="center"><Link className="btn btn-outline" href={ROUTES.blog}>Read More Articles</Link></p>
        </div>
      </section>

      <Faq faqs={HOME_FAQS} />
      <CtaBand settings={s} />
    </>
  );
}

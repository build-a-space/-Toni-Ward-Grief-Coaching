import Link from 'next/link';
import { ROUTES } from '@/lib/site';
import { getSettings } from '@/lib/settings';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default async function NotFound() {
  const s = await getSettings();
  return (
    <>
      <Header settings={s} />
      <main id="main">
        <section className="section">
          <div className="container narrow center">
            <p className="eyebrow">404</p>
            <h1>We couldn’t find that page</h1>
            <p>The page may have moved. These links may help:</p>
            <p className="btn-row">
              <Link className="btn btn-primary" href="/">Home</Link>
              <Link className="btn btn-outline" href={ROUTES.services}>Services</Link>
              <Link className="btn btn-outline" href={ROUTES.blog}>Blog</Link>
              <Link className="btn btn-outline" href={ROUTES.contact}>Contact</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer settings={s} />
    </>
  );
}

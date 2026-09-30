import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { getSettings } from '@/lib/settings';
import { graph, organizationSchema, personSchema, websiteSchema } from '@/lib/schema';

export default async function SiteLayout({ children }) {
  const s = await getSettings();
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <JsonLd data={graph(organizationSchema(s), personSchema(s), websiteSchema(s))} />
      <Header settings={s} />
      <main id="main">{children}</main>
      <Footer settings={s} />
    </>
  );
}

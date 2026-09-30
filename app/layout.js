import { Cormorant_Garamond, Lato } from 'next/font/google';
import './globals.css';
import { getSettings } from '@/lib/settings';
import { SITE_URL } from '@/lib/site';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-serif', display: 'swap' });
const sans = Lato({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-sans', display: 'swap' });

export async function generateMetadata() {
  const s = await getSettings();
  const title = `Home | ${s.businessName} | ${s.tagline}`;
  const description =
    'Toni Ward Grief Coaching in Berlin, MD offers compassionate grief coaching, widow support, online sessions, workshops and speaking. Book a free 30-minute consultation.';
  const ogImage = s.heroImageUrl || s.headshotUrl || s.logoUrl;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${s.businessName}` },
    description,
    applicationName: s.businessName,
    authors: [{ name: s.ownerName }],
    keywords: ['grief coaching Berlin MD', 'grief coach Maryland', 'widow support', 'online grief coaching', 'bereavement support Ocean City', 'grief workshops'],
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: s.businessName,
      title,
      description,
      url: '/',
      images: ogImage ? [{ url: ogImage, alt: s.businessName }] : undefined,
    },
    twitter: { card: 'summary_large_image', title, description, images: ogImage ? [ogImage] : undefined },
    robots: { index: true, follow: true, 'max-image-preview': 'large' },
    icons: { icon: s.logoUrl, apple: s.logoUrl },
    formatDetection: { telephone: true },
  };
}

export const viewport = { themeColor: '#3d2c5e', width: 'device-width', initialScale: 1 };

const HEX = /^#[0-9a-f]{3,8}$/i;

export default async function RootLayout({ children }) {
  const s = await getSettings();
  const vars = {
    ...(HEX.test(s.colorPrimary) ? { '--primary': s.colorPrimary } : {}),
    ...(HEX.test(s.colorAccent) ? { '--accent': s.colorAccent } : {}),
  };
  return (
    <html lang="en-US" className={`${serif.variable} ${sans.variable}`} style={vars}>
      <body>{children}</body>
    </html>
  );
}

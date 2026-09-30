import { SITE_URL } from '@/lib/site';

// Note: the admin path is intentionally NOT listed here (listing it would advertise it).
// It is kept out of search engines with noindex headers + meta tags instead.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

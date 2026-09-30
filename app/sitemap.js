import { ROUTES, absoluteUrl } from '@/lib/site';
import { POSTS } from '@/content/posts';

export default function sitemap() {
  const now = new Date();
  const pages = [
    [ROUTES.home, 1.0, 'weekly'],
    [ROUTES.services, 0.9, 'monthly'],
    [ROUTES.griefCoaching, 0.9, 'monthly'],
    [ROUTES.individual, 0.8, 'monthly'],
    [ROUTES.widow, 0.9, 'monthly'],
    [ROUTES.speaking, 0.7, 'monthly'],
    [ROUTES.contact, 0.8, 'yearly'],
    [ROUTES.resources, 0.7, 'monthly'],
    [ROUTES.videos, 0.6, 'monthly'],
    [ROUTES.membership, 0.5, 'monthly'],
    [ROUTES.blog, 0.7, 'weekly'],
  ].map(([p, priority, changeFrequency]) => ({ url: absoluteUrl(p), lastModified: now, changeFrequency, priority }));

  const posts = POSTS.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.updated || p.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...pages, ...posts];
}

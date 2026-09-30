import { plainText } from '@/components/RichText';
import { SITE_URL, absoluteUrl } from './site';

const orgId = `${SITE_URL}/#organization`;
const personId = `${SITE_URL}/#toni-ward`;
const websiteId = `${SITE_URL}/#website`;

const abs = (u) => (!u ? undefined : u.startsWith('http') ? u : `${SITE_URL}${u}`);

export function organizationSchema(s) {
  const sameAs = [s.facebook, s.instagram, s.youtube, s.tiktok, s.linkedin].filter(Boolean);
  return {
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': orgId,
    name: s.businessName,
    description:
      'Certified grief coaching, widow support, online video sessions, workshops and speaking engagements in Berlin, MD and throughout Maryland.',
    url: SITE_URL,
    logo: abs(s.logoUrl),
    image: abs(s.heroImageUrl || s.headshotUrl || s.logoUrl),
    telephone: `+1-${s.phone}`,
    email: s.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.street,
      addressLocality: s.city,
      addressRegion: s.state,
      postalCode: s.zip,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 38.3226, longitude: -75.2177 },
    areaServed: [
      { '@type': 'City', name: 'Berlin, MD' },
      { '@type': 'City', name: 'Ocean City, MD' },
      { '@type': 'City', name: 'Salisbury, MD' },
      { '@type': 'State', name: 'Maryland' },
    ],
    founder: { '@id': personId },
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+1-${s.phone}`,
      email: s.email,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Grief Coaching Services',
      itemListElement: [
        ['Personalized Grief Coaching', '/personalized-grief-coaching-support-berlin-md'],
        ['Individual Grief Support', '/individual-grief-counseling-support-in-berlin-md'],
        ['Widow Support Coaching', '/widow-loss-counseling-support-in-berlin-md'],
        ['Public Speaking & Workshops', '/public-speaking-workshops'],
      ].map(([name, p]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, url: absoluteUrl(p) } })),
    },
  };
}

export function personSchema(s) {
  return {
    '@type': 'Person',
    '@id': personId,
    name: s.ownerName,
    jobTitle: 'Certified Grief Coach',
    worksFor: { '@id': orgId },
    image: abs(s.headshotUrl),
    url: SITE_URL,
    knowsAbout: ['Grief coaching', 'Widow support', 'Bereavement', 'Thanatology', 'B.R.E.A.T.H.E. grief model', 'Faith-based grief support'],
    sameAs: [s.linkedin, s.facebook].filter(Boolean),
  };
}

export function websiteSchema(s) {
  return { '@type': 'WebSite', '@id': websiteId, url: SITE_URL, name: s.businessName, publisher: { '@id': orgId }, inLanguage: 'en-US' };
}

export function webPageSchema({ path, title, description, type = 'WebPage' }) {
  return {
    '@type': type,
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { '@id': websiteId },
    about: { '@id': orgId },
    inLanguage: 'en-US',
  };
}

export function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absoluteUrl(it.href) })),
  };
}

export function serviceSchema({ name, description, path, serviceType }) {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    serviceType: serviceType || name,
    description,
    url: absoluteUrl(path),
    provider: { '@id': orgId },
    areaServed: [{ '@type': 'State', name: 'Maryland' }, { '@type': 'City', name: 'Berlin, MD' }],
    availableChannel: [
      { '@type': 'ServiceChannel', name: 'In person', serviceLocation: { '@id': orgId } },
      { '@type': 'ServiceChannel', name: 'Online video session' },
    ],
  };
}

export function faqSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plainText(f.a) } })),
  };
}

export function blogPostingSchema(post, s) {
  return {
    '@type': 'BlogPosting',
    '@id': `${absoluteUrl(`/blog/${post.slug}`)}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { '@id': personId, '@type': 'Person', name: s.ownerName },
    publisher: { '@id': orgId },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: abs(post.image || s.heroImageUrl || s.logoUrl),
    keywords: post.keywords?.join(', '),
    articleSection: post.category,
    inLanguage: 'en-US',
  };
}

export function graph(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes.flat().filter(Boolean) };
}

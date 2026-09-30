export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://toniwardgriefcoaching.com').replace(/\/$/, '');

export const ADMIN_PATH = '/dashboard-4-admin-panel';

export const ROUTES = {
  home: '/',
  services: '/our-services',
  griefCoaching: '/personalized-grief-coaching-support-berlin-md',
  individual: '/individual-grief-counseling-support-in-berlin-md',
  widow: '/widow-loss-counseling-support-in-berlin-md',
  speaking: '/public-speaking-workshops',
  videos: '/toni-ward-grief-coaching-videos-and-resources',
  membership: '/exclusive-member-content-grief-support-videos',
  resources: '/grief-recovery-tools-and-community-resources',
  blog: '/blog',
  contact: '/contact-toni-ward-for-grief-coaching-support',
};

export const NAV = [
  { label: 'Home', href: ROUTES.home },
  {
    label: 'Services',
    href: ROUTES.services,
    children: [
      { label: 'Grief Coaching', href: ROUTES.griefCoaching },
      { label: 'Individual Grief Support', href: ROUTES.individual },
      { label: 'Widow Support', href: ROUTES.widow },
      { label: 'Public Speaking & Workshops', href: ROUTES.speaking },
    ],
  },
  {
    label: 'Resources',
    href: ROUTES.resources,
    children: [
      { label: 'Grief Recovery Tools', href: ROUTES.resources },
      { label: 'Videos & YouTube', href: ROUTES.videos },
      { label: 'Membership Area', href: ROUTES.membership },
    ],
  },
  { label: 'Blog', href: ROUTES.blog },
  { label: 'Contact', href: ROUTES.contact },
];

export const absoluteUrl = (p = '/') => `${SITE_URL}${p === '/' ? '' : p}` || SITE_URL;

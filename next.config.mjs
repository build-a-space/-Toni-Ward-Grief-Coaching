/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  experimental: {
    // allow logo / photo uploads from the admin dashboard
    serverActions: { bodySizeLimit: '5mb' },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: '**.public.blob.vercel-storage.com' }],
  },
  async headers() {
    return [
      {
        source: '/dashboard-4-admin-panel/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/contact', destination: '/contact-toni-ward-for-grief-coaching-support', permanent: true },
      { source: '/services', destination: '/our-services', permanent: true },
      { source: '/resources', destination: '/grief-recovery-tools-and-community-resources', permanent: true },
      { source: '/videos', destination: '/toni-ward-grief-coaching-videos-and-resources', permanent: true },
    ];
  },
};

export default nextConfig;

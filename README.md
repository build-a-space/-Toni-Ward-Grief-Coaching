# Toni Ward Grief Coaching — Website

An SEO-focused rebuild of [toniwardgriefcoaching.com](https://toniwardgriefcoaching.com), built with **Next.js 16 (Node.js)** and hosted on **Vercel**. It has a private admin dashboard.

## What's included

- **The same URLs as the live site**, so existing Google rankings carry over: `/our-services`, `/personalized-grief-coaching-support-berlin-md`, `/individual-grief-counseling-support-in-berlin-md`, `/widow-loss-counseling-support-in-berlin-md`, `/public-speaking-workshops`, `/contact-toni-ward-for-grief-coaching-support`, `/toni-ward-grief-coaching-videos-and-resources`, `/exclusive-member-content-grief-support-videos`, `/grief-recovery-tools-and-community-resources`, `/blog` and `/blog/<post>`.
- **SEO**
  - Pages are pre-rendered as static files.
  - Every page has its own title, meta description, canonical URL, Open Graph and Twitter tags.
  - Automatic `/sitemap.xml` and `/robots.txt`.
  - Heading order is correct and the markup is accessible.
- **Structured data (JSON-LD)**
  - Site-wide: `ProfessionalService`/`LocalBusiness` (address, geo, phone, service area, offer catalog), `Person` and `WebSite`.
  - Per page: `BreadcrumbList`, `Service`, `FAQPage` (matching the interactive FAQ accordions), `BlogPosting`, `ContactPage` and `CollectionPage`.
  - Phone, email and address in the schema come from the admin settings, so they always match the page.
- **Internal links**: service pages link to related pages in the sidebar, blog posts link to related posts and to services, and the footer links to every key page.
- **Contact form**
  - Includes spam protection.
  - Messages are saved to the dashboard inbox and can also be emailed via Resend.

## Admin dashboard — `/dashboard-4-admin-panel`

The dashboard is not linked anywhere on the site, and it is not listed in robots.txt (listing it there would advertise it). It sends `noindex` headers so search engines skip it, and it is password protected.

From the dashboard you can:

- Turn the **website on or off**.
  - When off, visitors see a "be back soon" page with your phone and email.
  - The page is served as HTTP 503, which tells Google the outage is temporary, so rankings are kept.
  - While you are logged in, you can still see the full site.
- Upload the **logo**, the **hero/banner photo** and **Toni's photo**.
- Edit **phone numbers, emails and address**, plus service area, hours and the consultation button text and link.
- Change the **brand colors**, business name, tagline and an optional announcement bar.
- Edit **social media links**.
- Read, mark and delete **contact form messages**.

## Deploy to Vercel

1. Import this GitHub repo in Vercel (the framework is detected as Next.js automatically).
2. In the project, go to **Storage** and connect:
   - **Upstash for Redis** (from the Marketplace). This stores settings and messages.
   - **Blob**. This stores uploaded logos and photos.

   Both add their environment variables automatically.
3. Under **Settings → Environment Variables**, add:
   - `ADMIN_USERNAME` (for example `toni`)
   - `ADMIN_PASSWORD` (long and unique)
   - `ADMIN_SESSION_SECRET` (generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `NEXT_PUBLIC_SITE_URL=https://toniwardgriefcoaching.com`
   - Optional: `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` to have form messages emailed.
4. Redeploy, add the domain, then submit `https://toniwardgriefcoaching.com/sitemap.xml` in Google Search Console.

## Local development

```bash
cp .env.example .env.local   # set ADMIN_PASSWORD etc.
npm install
npm run dev                  # http://localhost:3000
```

When Redis and Blob are not configured, local development saves settings to `./.data` and uploads to `./public/uploads`.

## Editing content

- Service and resource page text: `content/pages.js`
- Blog posts: `content/posts.js`
- Default contact info and branding: `lib/defaults.js` (anything saved in the dashboard overrides these)

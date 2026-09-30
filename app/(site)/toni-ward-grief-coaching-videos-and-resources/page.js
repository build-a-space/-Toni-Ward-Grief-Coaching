import ServicePage, { servicePageMetadata } from '@/components/ServicePage';

export const metadata = servicePageMetadata('videos');

export default function Page() {
  return <ServicePage pageKey="videos" />;
}

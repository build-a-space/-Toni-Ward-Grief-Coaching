import ServicePage, { servicePageMetadata } from '@/components/ServicePage';

export const metadata = servicePageMetadata('speaking');

export default function Page() {
  return <ServicePage pageKey="speaking" />;
}

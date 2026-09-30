import ServicePage, { servicePageMetadata } from '@/components/ServicePage';

export const metadata = servicePageMetadata('individual');

export default function Page() {
  return <ServicePage pageKey="individual" />;
}

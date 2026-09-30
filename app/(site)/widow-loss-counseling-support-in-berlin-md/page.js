import ServicePage, { servicePageMetadata } from '@/components/ServicePage';

export const metadata = servicePageMetadata('widow');

export default function Page() {
  return <ServicePage pageKey="widow" />;
}

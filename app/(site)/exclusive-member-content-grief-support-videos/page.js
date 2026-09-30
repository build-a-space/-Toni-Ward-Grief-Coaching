import ServicePage, { servicePageMetadata } from '@/components/ServicePage';

export const metadata = servicePageMetadata('membership');

export default function Page() {
  return <ServicePage pageKey="membership" />;
}

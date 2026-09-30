import ServicePage, { servicePageMetadata } from '@/components/ServicePage';

export const metadata = servicePageMetadata('resources');

export default function Page() {
  return <ServicePage pageKey="resources" />;
}

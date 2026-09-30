import ServicePage, { servicePageMetadata } from '@/components/ServicePage';

export const metadata = servicePageMetadata('griefCoaching');

export default function Page() {
  return <ServicePage pageKey="griefCoaching" />;
}

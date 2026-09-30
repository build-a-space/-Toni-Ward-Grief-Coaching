import './admin.css';

export const metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }) {
  return <div className="admin-shell">{children}</div>;
}

import NotFoundClient from '@/app/NotFoundClient';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist on this server.',
  keywords: ['404', 'not found', 'error', 'Refrut', 'page missing'],
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return <NotFoundClient />;
}
import '@/styles/Login.css';
import SignupClient from './SignupClient';
import { restrictUnauthorizedAccess } from '@/lib/session';

export const metadata = {
  title: "Signup - Refrut",
  description: "A social media platform where you can share your thoughts, ideas, and experiences with the world. Join us to connect, engage, and explore a diverse community of individuals.",
  metadataBase: new URL('https://refrut.com'),
  keywords: ['Refrut', 'Social Media', 'Community', 'Engagement', 'Connection', 'Sharing', 'Ideas', 'Experiences'],
  applicationName: 'Refrut',
  referrer: 'origin-when-cross-origin',
  openGraph: {
    images: ['/img/opengraph/image.png'],
  },
};

export default async function Signup() {
   await restrictUnauthorizedAccess();
  return (<SignupClient />);
}
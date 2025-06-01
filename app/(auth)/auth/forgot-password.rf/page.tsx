import '@/styles/Login.css';
import ForgotPasswordClient from '@/app/(auth)/auth/forgot-password.rf/ForgotPasswordClient';

export const metadata = {
  title: "Forgot Password - Refrut",
  description: "A social media platform where you can share your thoughts, ideas, and experiences with the world. Join us to connect, engage, and explore a diverse community of individuals.",
  metadataBase: new URL('https://refrut.com'),
  keywords: ['Refrut', 'Social Media', 'Community', 'Engagement', 'Connection', 'Sharing', 'Ideas', 'Experiences'],
  applicationName: 'Refrut',
  referrer: 'origin-when-cross-origin',
  openGraph: {
    images: ['/img/opengraph/image.png'],
  },
};

export default function ForgotPassword() {
  return <ForgotPasswordClient />;
}
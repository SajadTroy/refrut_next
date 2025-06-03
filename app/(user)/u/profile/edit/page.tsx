import '@/styles/Profile.css';
import EditProfileClient from '@/app/(user)/u/profile/edit/EditProfile';
import { verifySession } from '@/lib/session';

export async function generateMetadata() {

  return {
    title: `Edit Profile`,
    description: `Explore your profile and discover your posts on Refrut, a vibrant platform for ideas and connection.`,
    metadataBase: new URL('https://refrut.com'),
    keywords: ['Refrut', 'Social Media', 'Community', 'Profile', 'Your Profile', 'User Profile'],
    applicationName: 'Refrut',
    referrer: 'origin-when-cross-origin',
    openGraph: {
      title: `Your Profile`,
      description: `View your profile and your shared thoughts on Refrut.`,
      url: `https://refrut.com/u/profile`,
      images: [`/img/opengraph/profile.png`], // optionally dynamic
    },
  };
}

export default async function UserProfile() {
  const { userId } = await verifySession();
  return (<EditProfileClient userId={userId} />);
}

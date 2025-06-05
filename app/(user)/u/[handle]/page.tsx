import '@/styles/Profile.css';
import ProfileClient from './ProfileClient';
import { getUser } from './action';
import { notFound } from 'next/navigation';

type Params = Promise<{ handle: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { handle } = await params;

  let result = await getUser(handle);

  if (result.user) {
    return {
      title: `"${result.user?.name}"(@${result.user?.handle})`,
      description: `Explore @${result.user?.handle}'s profile and discover their posts on Refrut, a vibrant platform for ideas and connection.`,
      metadataBase: new URL('https://refrut.com'),
      keywords: ['Refrut', 'Social Media', 'Community', 'Profile', result.user?.handle],
      applicationName: 'Refrut',
      referrer: 'origin-when-cross-origin',
      openGraph: {
        title: `@${result.user?.handle} - Refrut`,
        description: `View @${result.user?.handle}'s profile and their shared thoughts on Refrut.`,
        url: `https://refrut.com/u/${result.user?.handle}`,
        images: [`${result.user?.profilePicture}`], // optionally dynamic
      },
    };
  } else {
    notFound();
  }
}

export default async function UserProfile({ params }: { params: Params }) {
  const { handle } = await params;

  return (<ProfileClient handle={handle} />);
}

import '@/styles/Profile.css';
import ProfileClient from './ProfileClient';

type Params = Promise<{ handle: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { handle } = await params;

  return {
    title: `@${handle} - Refrut`,
    description: `Explore @${handle}'s profile and discover their posts on Refrut, a vibrant platform for ideas and connection.`,
    metadataBase: new URL('https://refrut.com'),
    keywords: ['Refrut', 'Social Media', 'Community', 'Profile', handle],
    applicationName: 'Refrut',
    referrer: 'origin-when-cross-origin',
    openGraph: {
      title: `@${handle} - Refrut`,
      description: `View @${handle}'s profile and their shared thoughts on Refrut.`,
      url: `https://refrut.com/u/${handle}`,
      images: [`/img/opengraph/${handle}.png`], // optionally dynamic
    },
  };
}

export default async function UserProfile({ params }: { params: Params }) {
  const { handle } = await params;

  return (<ProfileClient handle={handle} />);
}

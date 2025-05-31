import '@/styles/Profile.css';
import Link from 'next/link';

type Params = Promise<{ post_id: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { post_id } = await params;

  return {
    title: `@${post_id} - Refrut`,
    description: `View post by id ${post_id} on Refrut.`,
    metadataBase: new URL('https://refrut.com'),
    keywords: ['Refrut', 'Social Media', 'Community', 'Post', post_id],
    applicationName: 'Refrut',
    referrer: 'origin-when-cross-origin',
    openGraph: {
      title: `@${post_id} - Refrut`,
      description: `View post by id ${post_id} on Refrut.`,
      url: `https://refrut.com/post/${post_id}`,
      images: [`/img/opengraph/${post_id}.png`], // optionally dynamic
    },
  };
}

export default async function PostDetails({ params }: { params: Params }) {
  const { post_id } = await params;

  return (
    <div className="profile-container">
    </div>
  );
}

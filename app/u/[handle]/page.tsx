import '@/styles/Profile.css';

type Props = {
  params: {
    handle: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { handle } = params;

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
      url: `https://refrut.com/@${handle}`,
      images: [`/img/opengraph/${handle}.png`], // optionally dynamic
    },
  };
}

export default function UserProfile({ params }: Props) {
  const { handle } = params;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          className="profile-avatar"
          src={`/img/avatars/${handle}.png`}
          alt={`@${handle}'s avatar`}
        />
        <h1>@{handle}</h1>
        <p>Welcome to @{handle}'s profile page on Refrut!</p>
      </div>

      <div className="profile-content">
        <h2>Recent Posts</h2>
        <p>No posts yet. Stay tuned!</p>
      </div>
    </div>
  );
}

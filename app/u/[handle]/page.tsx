import '@/styles/Profile.css';
import Link from 'next/link';
import { PageProps } from "next";

type Props = {
  params: {
    handle: string;
  };
};

export async function generateMetadata({ params }: Props) {
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
      url: `https://refrut.com/@${handle}`,
      images: [`/img/opengraph/${handle}.png`], // optionally dynamic
    },
  };
}

export default async function UserProfile({ params }: PageProps<{ handle: string }>) {
  const { handle } = await params;

  return (
    <div className="profile-container">
      <div className="top_profile">
        <div className="profile_header">
          <div className="profile_image">
            <img
              src={`/img/avatars/${handle}.png`}
              alt={`Profile of ${handle}`}
              className="profile_picture"
            />
          </div>
          <div className="profile_details">
            <h1 className="profile_name">{handle.toUpperCase()}
              <div className="verified">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d='M10.565 2.075c-.394.189-.755.497-1.26.928l-.079.066a2.56 2.56 0 0 1-1.58.655l-.102.008c-.662.053-1.135.09-1.547.236a3.33 3.33 0 0 0-2.03 2.029c-.145.412-.182.885-.235 1.547l-.008.102a2.56 2.56 0 0 1-.655 1.58l-.066.078c-.431.506-.74.867-.928 1.261a3.33 3.33 0 0 0 0 2.87c.189.394.497.755.928 1.26l.066.079c.41.48.604.939.655 1.58l.008.102c.053.662.09 1.135.236 1.547a3.33 3.33 0 0 0 2.029 2.03c.412.145.885.182 1.547.235l.102.008c.629.05 1.09.238 1.58.655l.079.066c.505.431.866.74 1.26.928a3.33 3.33 0 0 0 2.87 0c.394-.189.755-.497 1.26-.928l.079-.066c.48-.41.939-.604 1.58-.655l.102-.008c.662-.053 1.135-.09 1.547-.236a3.33 3.33 0 0 0 2.03-2.029c.145-.412.182-.885.235-1.547l.008-.102c.05-.629.238-1.09.655-1.58l.066-.079c.431-.505.74-.866.928-1.26a3.33 3.33 0 0 0 0-2.87c-.189-.394-.497-.755-.928-1.26l-.066-.079a2.56 2.56 0 0 1-.655-1.58l-.008-.102c-.053-.662-.09-1.135-.236-1.547a3.33 3.33 0 0 0-2.029-2.03c-.412-.145-.885-.182-1.547-.235l-.102-.008a2.56 2.56 0 0 1-1.58-.655l-.079-.066c-.505-.431-.866-.74-1.26-.928a3.33 3.33 0 0 0-2.87 0m5.208 6.617a.75.75 0 0 1 .168 1.047l-3.597 4.981a1.75 1.75 0 0 1-2.736.128l-1.506-1.72a.75.75 0 1 1 1.13-.989l1.505 1.721a.25.25 0 0 0 .39-.018l3.598-4.981a.75.75 0 0 1 1.048-.169' /></svg>
              </div>
            </h1>
            <span className="profile_handle">@{handle}</span>
          </div>
        </div>
        <div className="profile_about">
          <p className="profile_bio">
            Welcome to @{handle}'s profile! Here you can explore their posts, thoughts, and contributions to the Refrut community.
          </p>
        </div>
        <div className="profile_stats">
          <div className="stat_item">
            <span className="stat_value">123</span>
            <span className="stat_label">Posts</span>
          </div>
          <div className="stat_item">
            <span className="stat_value">456</span>
            <span className="stat_label">Followers</span>
          </div>
          <div className="stat_item">
            <span className="stat_value">789</span>
            <span className="stat_label">Following</span>
          </div>
        </div>
        <div className="profile_button">
          <button className="follow_button following">Following @{handle}</button>
        </div>
      </div>
      <div className="tabs">
        <div className="tab active">
          <Link href={`/u/${handle}`}>Posts</Link>
        </div>
        <div className="tab">
          <Link href={`/u/${handle}/replies`}>Replies</Link>
        </div>
      </div>
    </div>
  );
}

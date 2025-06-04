import '@/styles/Profile.css';
import Image from 'next/image';
import Link from 'next/link';
import { getUser, isFollowing } from '@/app/(user)/u/[handle]/action';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ProfileButton from '@/components/ProfileButton';

interface User {
  _id: string;
  name: string;
  email: string;
  handle: string;
  bio?: string;
  profilePicture?: string;
  dateOfBirth?: string;
  isVerified: boolean;
  roles: string[];
  status: string;
}

interface Post {
  _id: string;
  parentPost?: string;
  author: string;
  content: string;
  createdAt: string;    
  updatedAt: string;      
  likes: string[];
  cchildPosts: string[];
  tags: string[];
}

interface Follow {
  _id: string;
  follower: string;
  following: string;
  createdAt: string;       
  updatedAt: string;     
}

interface UserResponse {
  user?: User;
  followers?: Follow[];
  followings?: Follow[];
  posts?: Post[];
  handle?: string;
  redirect?: string; 
}

const fallbackUser: User = {
  _id: '0',
  name: 'Unknown',
  profilePicture: '/img/avatars/default.png',
  email: 'null',
  handle: 'null',
  bio: 'null',
  dateOfBirth: "null",
  isVerified: false,
  roles: [],
  status: 'inactive'
};

export default async function ProfileClient({ handle }: { handle: string }) {

  const result: UserResponse = await getUser(handle);

  const isFollowingUser = await isFollowing(handle);

  const imageSrc = result.user?.profilePicture?.startsWith('http')
    ? result.user?.profilePicture
    : '/img/avatars/default.png';

  return (
    <div className="profile-container">
      <div className="top_profile">
        <div className="profile_header">
          <div className="profile_image">
            {result.user ? (
              <img
                src={imageSrc}
                alt={`Avatar of ${result.user?.name || 'User'}`}
                width={100}
                height={100}
                className="profile_avatar"
              />
            ) : (
              <Skeleton circle={true} height={100} width={100} />
            )}
          </div>
          <div className="profile_details">
            <h1 className="profile_name">
              {result.user ? (
                <>
                  {result.user.name}
                  {result.user.roles.includes('creator') && (
                    <div className="verified">
                      <svg
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.565 2.075c-.394.189-.755.497-1.26.928l-.079.066a2.56 2.56 0 0 1-1.58.655l-.102.008c-.662.053-1.135.09-1.547.236a3.33 3.33 0 0 0-2.03 2.029c-.145.412-.182.885-.235 1.547l-.008.102a2.56 2.56 0 0 1-.655 1.58l-.066.078c-.431.506-.74.867-.928 1.261a3.33 3.33 0 0 0 0 2.87c.189.394.497.755.928 1.26l.066.079c.41.48.604.939.655 1.58l.008.102c.053.662.09 1.135.236 1.547a3.33 3.33 0 0 0 2.029 2.03c.412.145.885.182 1.547.235l.102.008c.629.05 1.09.238 1.58.655l.079.066c.505.431.866.74 1.26.928a3.33 3.33 0 0 0 2.87 0c.394-.189.755-.497 1.26-.928l-.079-.066c.48-.41.939-.604 1.58-.655l.102-.008c.662-.053 1.135-.09 1.547-.236a3.33 3.33 0 0 0 2.03-2.029c.145-.412.182-.885.235-1.547l.008-.102c.05-.629.238-1.09.655-1.58l.066-.079c.431-.505.74-.866.928-1.26a3.33 3.33 0 0 0 0-2.87c-.189-.394-.497-.755-.928-1.26l-.066-.079a2.56 2.56 0 0 1-.655-1.58l-.008-.102c-.053-.662-.09-1.135-.236-1.547a3.33 3.33 0 0 0-2.029-2.03c-.412-.145-.885-.182-1.547-.235l-.102-.008a2.56 2.56 0 0 1-1.58-.655l-.079-.066c-.505-.431-.866-.74-1.26-.928a3.33 3.33 0 0 0-2.87 0m5.208 6.617a.75.75 0 0 1 .168 1.047l-3.597 4.981a1.75 1.75 0 0 1-2.736.128l-1.506-1.72a.75.75 0 1 1 1.13-.989l1.505 1.721a.25.25 0 0 0 .39-.018l3.598-4.981a.75.75 0 0 1 1.048-.169" />
                      </svg>
                    </div>
                  )}
                </>
              ) : (
                <Skeleton width={150} />
              )}
            </h1>
            <span style={{ marginTop: '2px' }} className="profile_handle">
              {result.user ? `@${result.user.handle}` : <Skeleton width={100} />}
            </span>
          </div>
        </div>
        <div className="profile_about">
          <p className="profile_bio">
            {result.user ? result.user.bio || 'This user has not set a bio yet.' : <Skeleton width={200} />}
          </p>
        </div>
        <div className="profile_stats">
          <div className="stat_item">
            <span className="stat_value">{result.posts?.length || 0}</span>
            <span className="stat_label">Posts</span>
          </div>
          <div className="stat_item">
            <span className="stat_value">{result.followers?.length || 0}</span>
            <span className="stat_label">Followers</span>
          </div>
          <div className="stat_item">
            <span className="stat_value">{result.followings?.length || 0}</span>
            <span className="stat_label">Following</span>
          </div>
        </div>
        <ProfileButton handle={handle} user={result.user ?? fallbackUser} initialIsFollowing={isFollowingUser} />
      </div>
      <div className="tabs">
        {result.user ? (
          <>
            <div className="tab active">
              <Link href={`/u/${handle}`}>Posts</Link>
            </div>
            <div className="tab">
              <Link href={`/u/${handle}/replies`}>Replies</Link>
            </div>
          </>
        ) : (
          <>
            <div className="tab active">
              <Skeleton width={50} />
            </div>
            <div className="tab">
              <Skeleton width={50} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
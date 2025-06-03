'use client';

import '@/styles/Profile.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { logout, LogoutFormState, fetchUserProfile, FetchUserProfileState } from '@/app/(user)/u/profile/action';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  _id: string;
  parentPost?: string;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: string[];
  cchildPosts: string[];
  tags: string[];
}

interface Follow {
  _id: string;
  follower: string;
  following: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientUser {
  _id: string;
  name: string;
  email: string;
  handle: string;
  bio: string;
  profilePicture: string;
  dateOfBirth: string | null;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  lastLogin: string | null;
  roles: string[];
  status: 'active' | 'inactive' | 'banned';
}

export default function UserProfileClient({ userId }: { userId: string }) {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [followers, setFollowers] = useState<Follow[] | null>(null);
  const [followings, setFollowings] = useState<Follow[] | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [imgSrc, setImgSrc] = useState('/img/avatars/default.png');
  const [error, setError] = useState<string | null>(null);
  const [state, action, pending] = useActionState<LogoutFormState, FormData>(logout, { errors: {} });
  const router = useRouter();

  // Fetch user profile
  useEffect(() => {
    async function loadProfile() {
      const result: FetchUserProfileState = await fetchUserProfile(userId);
      if (result.success && result.user) {
        setUser(result.user);
        setFollowers(result.followers || null);
        setFollowings(result.followings || null);
        setPosts(result.posts || null);
        setImgSrc(result.user.profilePicture || '/img/avatars/default.png');
      } else {
        setError(result.errors?.general || 'Failed to load profile');
        if (result.errors?.general?.includes('Unauthorized')) {
          router.push('/auth/login');
        }
      }
    }
    loadProfile();
  }, [userId, router]);

  // Handle redirect after successful logout
  useEffect(() => {
    if (state?.success) {
      router.push('/auth/login');
    }
  }, [state, router]);

  return (
    <div className="profile-container">
      {error && (
        <div className="notification error">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}
      <div className="top_profile">
        <div className="profile_header">
          <div className="profile_image">
            {user ? (
              <Image
                src={imgSrc}
                alt={`Avatar of ${user?.name || 'User'}`}
                onError={() => setImgSrc('/img/avatars/default.png')}
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
              {user ? (
                <>
                  {user.name}
                  {user.roles.includes('creator') && (
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
              {user ? `@${user.handle}` : <Skeleton width={100} />}
            </span>
          </div>
        </div>
        <div className="profile_about">
          <p className="profile_bio">
            {user ? user.bio || 'This user has not set a bio yet.' : <Skeleton width={200} />}
          </p>
        </div>
        <div className="profile_stats">
          <div className="stat_item">
            <span className="stat_value">{posts?.length || 0}</span>
            <span className="stat_label">Posts</span>
          </div>
          <div className="stat_item">
            <span className="stat_value">{followers?.length || 0}</span>
            <span className="stat_label">Followers</span>
          </div>
          <div className="stat_item">
            <span className="stat_value">{followings?.length || 0}</span>
            <span className="stat_label">Following</span>
          </div>
        </div>
        <div className="profile_button">
          <button className="follow_button">Edit Profile</button>
          &nbsp;
          <form action={action}>
            <button
              type="submit"
              className="follow_button following"
              style={{ width: '120px' }}
              disabled={pending}
            >
              {pending ? 'Wait...' : 'Logout'}
            </button>
          </form>
          {state?.errors?.general && (
            <div className="form_text error">
              <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.general}</p>
            </div>
          )}
        </div>
      </div>
      <div className="tabs">
        {user ? (
          <>
            <div className="tab">
              <Link href={`/u/profile`}>Posts</Link>
            </div>
            <div className="tab active">
              <Link href={`/u/profile/replies`}>Replies</Link>
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
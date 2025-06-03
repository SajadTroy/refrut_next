'use client';

import '@/styles/Profile.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { followUser, isFollowing, unfollowUser } from '@/app/(user)/u/[handle]/action';
import { useEffect, useState } from 'react';

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

type ProfileButtonProps = {
  handle: string;
  user: User;
};

export default function ProfileButton({ handle, user }: ProfileButtonProps) {
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [loading, setLoading] = useState(false);

  // On mount (or when `handle` changes), check the follow status once
  useEffect(() => {
    async function checkFollowing() {
      try {
        const followingStatus: boolean = await isFollowing(handle);
        setIsFollowingUser(followingStatus);
      } catch {
        console.error('Error checking follow status.');
      }
    }
    checkFollowing();
  }, [handle]);

  // Toggle follow/unfollow without any page refresh
  const handleFollowToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!user || loading) return;
    setLoading(true);

    try {
      if (isFollowingUser) {
        const result = await unfollowUser(handle);
        if (result.success) {
          setIsFollowingUser(false);
        } else {
          alert(result.error || 'Could not unfollow.');
        }
      } else {
        const result = await followUser(handle);
        if (result.success) {
          setIsFollowingUser(true);
        } else {
          alert(result.error || 'Could not follow.');
        }
      }
    } catch {
      alert('Network or server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile_button">
      <button
        onClick={handleFollowToggle}
        disabled={loading}
        className={`follow_button ${isFollowingUser ? 'following' : ''}`}
      >
        {loading
          ? isFollowingUser
            ? 'Unfollowing…'
            : 'Following…'
          : isFollowingUser
          ? 'Unfollow'
          : 'Follow'}
      </button>
    </div>
  );
}

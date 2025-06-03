'use client';

import '@/styles/Profile.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { followUser, isFollowing, unfollowUser } from '@/app/(user)/u/[handle]/action';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  useEffect(() => {
    async function checkFollowing() {
      try {
        const followingStatus: boolean = await isFollowing(handle);
        setIsFollowingUser(followingStatus);
      } catch {
        alert('Error occurred while checking follow status.');
      }
    }
    checkFollowing();
  }, [handle]);

  const handleFollowToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // prevent form from submitting

    if (!user) return;

    try {
      if (isFollowingUser) {
        const result = await unfollowUser(handle);
        if (result.success) {
          setIsFollowingUser(false);
          router.refresh(); // re‐fetch server data
        }
      } else {
        const result = await followUser(handle);
        if (result.success) {
          setIsFollowingUser(true);
          router.refresh(); // re‐fetch server data
        }
      }
    } catch {
      alert('Error occurred while toggling follow.');
    }
  };

  return (
    <div className="profile_button">
      <form style={{ width: '100%' }}>
        <button
          onClick={handleFollowToggle}
          type="submit"
          className={`follow_button ${isFollowingUser ? 'following' : ''}`}
        >
          {isFollowingUser ? 'Unfollow' : 'Follow'}
        </button>
      </form>
    </div>
  );
}

// components/ProfileButton.tsx
'use client';

import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { followUser, unfollowUser, isFollowing } from '@/app/(user)/u/[handle]/action';
import '@/styles/Profile.css';

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
  initialIsFollowing: boolean;
};

export default function ProfileButton({ handle, user, initialIsFollowing }: ProfileButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isPending, startTransition] = useTransition();

  const handleFollowAction = async () => {
    startTransition(async () => {
      try {
        if (isFollowing) {
          const result = await unfollowUser(handle);
          if (result.success) {
            setIsFollowing(false);
          }
        } else {
          const result = await followUser(handle);
          if (result.success) {
            setIsFollowing(true);
          }
        }
      } catch (error) {
        console.error('Error updating follow status:', error);
      }
    });
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    following: {
      backgroundColor: '#4B5563',
      color: '#ffffff',
    },
    notFollowing: {
      backgroundColor: '#3B82F6',
      color: '#ffffff',
    },
  };

  return (
    <AnimatePresence>
      <motion.form
        className="profile_button"
        onSubmit={(e) => {
          e.preventDefault();
          handleFollowAction();
        }}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          type="submit"
          className={`follow_button ${isFollowing ? 'following' : ''}`}
          variants={buttonVariants}
          initial="initial"
          animate={isFollowing ? 'following' : 'notFollowing'}
          transition={{ duration: 0.2 }}
          disabled={isPending}
        >
          {isPending ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
        </motion.button>
      </motion.form>
    </AnimatePresence>
  );
}
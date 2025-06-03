'use server';

import { destroySession, getSession } from '@/lib/session';
import connectDB from '@/lib/database';
import User from '@/models/User';
import Follow from '@/models/Follow';
import Post from '@/models/Post';

export type LogoutFormState = {
  errors?: {
    general?: string;
  };
  success?: boolean;
};

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

export type FetchUserProfileState = {
  user?: {
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
  };
  followers?: Follow[];
  followings?: Follow[];
  posts?: Post[];
  errors?: {
    general?: string;
  };
  success?: boolean;
};

export async function logout(): Promise<LogoutFormState> {
  try {
    await destroySession();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { errors: { general: 'Failed to log out' } };
  }
}

export async function fetchUserProfile(userId: string): Promise<FetchUserProfileState> {
  try {
    await connectDB();

    // Get session to verify authentication
    const session = await getSession();
    if (!session || !session.userId) {
      return { errors: { general: 'Unauthorized: Please log in' } };
    }

    // Fetch user from database
    const user = await User.findById(userId).select('-password -verificationToken -resetPasswordToken');

    if (!user) {
      return { errors: { general: 'User not found' } };
    }

    if (user.status === 'banned') {
      return { errors: { general: 'This user is banned' } };
    }

    // Check if the user is viewing their own profile
    if (session.userId !== userId && user.status !== 'active') {
      return { errors: { general: 'Unauthorized: Cannot view this profile' } };
    }

    const userFollowers = await Follow.find({ following: user._id }).exec() as Follow[];
    const userFollowings = await Follow.find({ follower: user._id }).exec() as Follow[];
    const userPosts = await Post.find({ author: user._id }).exec() as Post[];

    return {
      success: true,
      followers: userFollowers,
      followings: userFollowings,
      posts: userPosts,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        handle: user.handle,
        bio: user.bio,
        profilePicture: user.profilePicture,
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.toISOString() : null,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        isVerified: user.isVerified,
        lastLogin: user.lastLogin ? user.lastLogin.toISOString() : null,
        roles: user.roles,
        status: user.status,
      },
    };
  } catch (error) {
    console.error('Fetch user profile error:', error);
    return { errors: { general: 'Failed to fetch user profile' } };
  }
}
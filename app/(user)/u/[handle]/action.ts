'use server';

import { getSession } from '@/lib/session';
import connectDB from '@/lib/database';
import User from '@/models/User';
import Follow from '@/models/Follow';
import { redirect } from 'next/navigation';
import Post from '@/models/Post';

// Define TypeScript interfaces based on Mongoose schemas
interface LoginDetail {
  ip: string;
  latitude?: number;
  longitude?: number;
  country?: string;
  region?: string;
  isp?: string;
  device?: string;
  browser?: string;
  timestamp: Date;
}

interface SocialLinks {
  x?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  handle: string;
  bio?: string;
  profilePicture?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  isVerified: boolean;
  roles: string[];
  status: string;
}

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

interface UserResponse {
  user?: User;
  followers?: Follow[];
  followings?: Follow[];
  posts?: Post[];
  handle?: string;
}

export async function getUser(handle: string): Promise<UserResponse> {
  try {
    await connectDB(); // Ensure DB connection

    if (!handle) {
      return { handle: "Required user handle." };
    }

    const publicUser = await User.findOne({ handle }).select('-password -verificationToken -resetPasswordToken -__v -resetPasswordTokenExpiry -resetPasswordToken -lastLogin -socialLinks').lean().exec() as User | null;

    if (!publicUser) {
      return { handle: "No user found" };
    }

    const userFollowers = await Follow.find({ following: publicUser._id }).exec() as Follow[];
    const userFollowings = await Follow.find({ follower: publicUser._id }).exec() as Follow[];
    const userPosts = await Post.find({ author: publicUser._id }).exec() as Post[];

    return {
      user: publicUser,
      followers: userFollowers,
      followings: userFollowings,
      posts: userPosts
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { handle: "An error occurred while fetching user data" };
  }
}
'use server';

import { getSessionUserDetails } from '@/lib/session';
import connectDB from '@/lib/database';
import User from '@/models/User';
import Follow from '@/models/Follow';
import Post from '@/models/Post';

interface User {
  _id: string;
  name: string;
  email: string;
  handle: string;
  bio?: string;
  profilePicture?: string;
  dateOfBirth?: Date;
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
  redirect?: string; // Added to indicate redirect URL
}

export async function getUser(handle: string): Promise<UserResponse> {
  try {
    await connectDB(); // Ensure DB connection

    if (!handle) {
      return { handle: "Required user handle." };
    }

    const session = await getSessionUserDetails();

    const publicUser = await User.findOne({ handle }).select('-password -verificationToken -updatedAt -createdAt -resetPasswordToken -verificationTokenExpiry -__v -resetPasswordTokenExpiry -resetPasswordToken -lastLogin -socialLinks -recentLogins').exec() as User | null;

    if (!publicUser) {
      return { handle: "No user found" };
    }

    if (publicUser._id.toString() === session.userId) {
      return { redirect: '/u/profile' };
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

export async function isFollowing(handle: string): Promise<boolean> {
  try {
    await connectDB();

    if (!handle) {
      return false;
    }

    const session = await getSessionUserDetails();
    if (!session.userId) {
      return false;
    }

    const publicUser = await User.findOne({ handle }).select('_id').exec() as User | null;
    if (!publicUser) {
      return false;
    }

    const follow = await Follow.findOne({
      follower: session.userId,
      following: publicUser._id,
    }).exec();

    return !!follow;
  } catch (error) {
    console.error('Error checking follow status:', error);
    return false;
  }
}
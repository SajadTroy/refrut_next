'use server';

import { getSessionUserDetails } from '@/lib/session';
import connectDB from '@/lib/database';
import { User, Post, Follow } from "@/models";
import { redirect } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  handle: string;
  bio?: string;
  profilePicture?: string;
  dateOfBirth?: string;     // changed from Date to string
  isVerified: boolean;
  roles: string[];
  status: string;
}

interface Post {
  _id: string;
  parentPost?: string;
  author: string;
  content: string;
  createdAt: string;        // changed from Date to string
  updatedAt: string;        // changed from Date to string
  likes: string[];
  cchildPosts: string[];
  tags: string[];
}

interface Follow {
  _id: string;
  follower: string;
  following: string;
  createdAt: string;        // changed from Date to string
  updatedAt: string;        // changed from Date to string
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

    // Fetch a “lean” JavaScript object (still has ObjectId & Date inside)
    const rawUser = await User
      .findOne({ handle: { $regex: `^${handle}$`, $options: 'i' } })
      .select(
        '-password -verificationToken -updatedAt -createdAt ' +
        '-resetPasswordToken -verificationTokenExpiry -__v ' +
        '-resetPasswordTokenExpiry -resetPasswordToken -lastLogin -socialLinks -recentLogins'
      ).exec();

    if (!rawUser) {
      return { handle: 'No user found' };
    }

    // If it's the session user, redirect
    if (rawUser._id.toString() === session.userId) {
      return { redirect: '/u/profile' };
    }


    const rawFollowers = await Follow.find({ following: rawUser._id }).exec();
    const rawFollowings = await Follow.find({ follower: rawUser._id }).exec();
    const rawPosts = await Post.find({ author: rawUser._id }).exec();

    const user: User = {
      _id: rawUser._id.toString(),
      name: rawUser.name,
      email: rawUser.email,
      handle: rawUser.handle,
      bio: rawUser.bio || undefined,
      profilePicture: rawUser.profilePicture || undefined,
      dateOfBirth: rawUser.dateOfBirth
        ? rawUser.dateOfBirth.toISOString()
        : undefined,
      isVerified: rawUser.isVerified,
      roles: Array.isArray(rawUser.roles) ? rawUser.roles.map(String) : [],
      status: rawUser.status,
    };

    // 2) Convert each Follow‐document in `rawFollowers` / `rawFollowings`:
    const followers: Follow[] = rawFollowers.map((f) => ({
      _id: f._id.toString(),
      follower: f.follower.toString(),
      following: f.following.toString(),
      createdAt: f.createdAt.toISOString(),
      updatedAt: f.updatedAt.toISOString(),
    }));

    const followings: Follow[] = rawFollowings.map((f) => ({
      _id: f._id.toString(),
      follower: f.follower.toString(),
      following: f.following.toString(),
      createdAt: f.createdAt.toISOString(),
      updatedAt: f.updatedAt.toISOString(),
    }));

    // 3) Convert each Post‐document in `rawPosts`:
    const posts: Post[] = rawPosts.map((p) => ({
      _id: p._id.toString(),
      parentPost: p.parentPost ? p.parentPost.toString() : undefined,
      author: p.author.toString(),
      content: p.content,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
      likes: Array.isArray(p.likes) ? p.likes.map(String) : [],
      cchildPosts: Array.isArray(p.cchildPosts)
        ? p.cchildPosts.map(String)
        : [],
      tags: Array.isArray(p.tags) ? p.tags.map(String) : [],
    }));

    return {
      user,
      followers,
      followings,
      posts,
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

export async function followUser(handle: string): Promise<{ success?: boolean; error?: string }> {
  try {
    await connectDB();

    if (!handle) {
      return { error: "Required user handle." };
    }

    const session = await getSessionUserDetails();
    if (!session.userId) {
      redirect('/auth/login');
    }

    const publicUser = await User.findOne({ handle }).select('_id').exec() as User | null;
    if (!publicUser) {
      return { error: "User not found." };
    }

    if (publicUser._id.toString() === session.userId) {
      return { error: "Cannot follow yourself." };
    }

    const existingFollow = await Follow.findOne({
      follower: session.userId,
      following: publicUser._id,
    }).exec();

    if (existingFollow) {
      return { error: "Already following this user." };
    }

    const follow = new Follow({
      follower: session.userId,
      following: publicUser._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await follow.save();

    return { success: true };
  } catch (error) {
    console.error('Error following user:', error);
    return { error: "An error occurred while following the user." };
  }
}

export async function unfollowUser(handle: string): Promise<{ success?: boolean; error?: string }> {
  try {
    await connectDB();

    if (!handle) {
      return { error: "Required user handle." };
    }

    const session = await getSessionUserDetails();
    if (!session.userId) {
      redirect('/auth/login');
    }

    const publicUser = await User.findOne({ handle }).select('_id').exec() as User | null;
    if (!publicUser) {
      return { error: "User not found." };
    }

    const follow = await Follow.findOneAndDelete({
      follower: session.userId,
      following: publicUser._id,
    }).exec();

    if (!follow) {
      return { error: "Not following this user." };
    }

    return { success: true };
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return { error: "An error occurred while unfollowing the user." };
  }
}
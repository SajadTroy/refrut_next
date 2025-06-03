'use server';

import { verifySession } from '@/lib/session';
import connectDB from '@/lib/database';
import { Post } from '@/models';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';

interface PublishPostResponse {
  success?: boolean;
  error?: string;
  postId?: string;
}

export async function publishPost(
  state: PublishPostResponse,
  formData: FormData
): Promise<PublishPostResponse> {
  // Verify the user is authenticated
  const session = await verifySession();
  if (!session.userId) {
    return { error: 'You must be logged in to publish a post.' };
  }

  // Extract and validate content
  const content = formData.get('content')?.toString().trim();
  if (!content) {
    return { error: 'Content is required.' };
  }
  if (content.length > 280) {
    return { error: 'Content cannot exceed 280 characters.' };
  }

  try {
    // Connect to the database
    await connectDB();

    // Create a new post
    const post = new Post({
      author: new mongoose.Types.ObjectId(session.userId),
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: [],
      childPosts: [], // Fixed typo: 'cchildPosts' → 'childPosts'
      tags: [], // Add tag extraction logic if needed
    });

    // Save the post
    const savedPost = await post.save();
    console.log('Post saved successfully:', savedPost._id); // Debugging

    // Return success response with postId
    return { success: true, postId: savedPost._id.toString() };
  } catch (error) {
    console.error('Error publishing post:', error);
    return { error: 'An error occurred while publishing the post.' };
  }
}
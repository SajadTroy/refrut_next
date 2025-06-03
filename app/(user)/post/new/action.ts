// app/new/action.ts
'use server';

import { verifySession } from '@/lib/session';
import connectDB from '@/lib/database';
import { Post } from "@/models";
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';

interface PublishPostResponse {
    success?: boolean;
    error?: string;
    postId?: string;
}

export async function publishPost(
    prevState: PublishPostResponse | null,
    formData: globalThis.FormData // Use native FormData type
): Promise<PublishPostResponse> {
    try {
        // Verify the user is authenticated
        const { userId } = await verifySession();

        // Extract and validate content
        const content = formData.get('content')?.toString().trim();
        if (!content) {
            return { error: 'Content is required.' };
        }
        if (content.length > 280) {
            return { error: 'Content cannot exceed 280 characters.' };
        }

        // Connect to the database
        await connectDB();

        // Create a new post
        const post = new Post({
            author: new mongoose.Types.ObjectId(userId),
            content,
            createdAt: new Date(),
            updatedAt: new Date(),
            likes: [],
            cchildPosts: [],
            tags: [], // Add tag extraction logic if needed
        });

        // Save the post
        await post.save();

        // Redirect to the new post's page
        redirect(`/post/${post._id}`);
    } catch (error) {
        console.error('Error publishing post:', error);
        return { error: 'An error occurred while publishing the post.' };
    }
}
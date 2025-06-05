'use server';
import { Post, User } from '@/models';


export async function getPosts() {
    let posts = await Post.find().populate('author', 'name handle profilePicture').sort({ createdAt: -1 }).exec();

    if (!posts) {
        return { error: "No posts available" };
    };

    return { posts }
};
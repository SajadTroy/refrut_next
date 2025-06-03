import '@/styles/home.css';
import Link from 'next/link';
import Image from 'next/image';
import connectDB from '@/lib/database';
import Post from '@/models/Post';
import User from '@/models/User';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

interface PostWithUser {
    post: Post;
    user: User;
}

async function fetchPosts(): Promise<{ posts?: PostWithUser[]; error?: string }> {
    try {
        await connectDB();

        // Fetch posts and populate author details
        const posts = await Post.find()
            .sort({ createdAt: -1 }) // Sort by newest first
            .populate('author', 'name handle profilePicture roles')
            .limit(20) // Limit to 20 posts for performance
            .exec();

        // Map posts to include user details
        const postsWithUser = posts.map(post => ({
            post,
            user: post.author as User,
        }));

        return { posts: postsWithUser };
    } catch (error) {
        console.error('Error fetching posts:', error);
        return { error: 'Failed to load posts' };
    }
}

export default async function HomeClient() {
    const { posts, error } = await fetchPosts();

    // Function to format time since post
    const formatTimeSince = (date: Date): string => {
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (seconds < 60) return `${seconds} seconds ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        const days = Math.floor(hours / 24);
        return `${days} day${days === 1 ? '' : 's'} ago`;
    };

    return (
        <div className="home_container">
            <div className="posts_container">
                {error ? (
                    <div className="notification error">{error}</div>
                ) : !posts || posts.length === 0 ? (
                    <div className="no_posts">No posts available.</div>
                ) : (
                    posts.map(({ post, user }) => (
                        <div key={post._id} className="post">
                            <Link href={`/u/${user.handle}`} className="post_header">
                                <div className="user_image">
                                    <Image
                                        src={user.profilePicture || `/img/avatars/default.png`}
                                        alt={`Avatar of ${user.handle}`}
                                        className="user_avatar"
                                        width={40}
                                        height={40}
                                        onError={(e) => (e.currentTarget.src = '/img/avatars/default.png')}
                                    />
                                </div>
                                <div className="user_info">
                                    <h1 className="post_author_name">
                                        {user.name}
                                        {user.roles.includes('creator') && (
                                            <div className="verified">
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M10.565 2.075c-.394.189-.755.497-1.26.928l-.079.066a2.56 2.56 0 0 1-1.58.655l-.102.008c-.662.053-1.135.09-1.547.236a3.33 3.33 0 0 0-2.03 2.029c-.145.412-.182.885-.235 1.547l-.008.102a2.56 2.56 0 0 1-.655 1.58l-.066.078c-.431.506-.74.867-.928 1.261a3.33 3.33 0 0 0 0 2.87c.189.394.497.755.928 1.26l.066.079c.41.48.604.939.655 1.58l.008.102c.053.662.09 1.135.236 1.547a3.33 3.33 0 0 0 2.029 2.03c.412.145.885.182 1.547.235l.102.008c.629.05 1.09.238 1.58.655l.079.066c.505.431.866.74 1.26.928a3.33 3.33 0 0 0 2.87 0c.394-.189.755-.497 1.26-.928l-.079-.066c.48-.41.939-.604 1.58-.655l.102-.008c.662-.053 1.135-.09 1.547-.236a3.33 3.33 0 0 0 2.03-2.029c.145-.412.182-.885.235-1.547l.008-.102c.05-.629.238-1.09.655-1.58l.066-.079c.431-.505.74-.866.928-1.26a3.33 3.33 0 0 0 0-2.87c-.189-.394-.497-.755-.928-1.26l-.066-.079a2.56 2.56 0 0 1-.655-1.58l-.008-.102c-.053-.662-.09-1.135-.236-1.547a3.33 3.33 0 0 0-2.029-2.03c-.412-.145-.885-.182-1.547-.235l-.102-.008a2.56 2.56 0 0 1-1.58-.655l-.079-.066c-.505-.431-.866-.74-1.26-.928a3.33 3.33 0 0 0-2.87 0m5.208 6.617a.75.75 0 0 1 .168 1.047l-3.597 4.981a1.75 1.75 0 0 1-2.736.128l-1.506-1.72a.75.75 0 1 1 1.13-.989l1.505 1.721a.25.25 0 0 0 .39-.018l3.598-4.981a.75.75 0 0 1 1.048-.169" />
                                                </svg>
                                            </div>
                                        )}
                                    </h1>
                                    <span className="post_author_handle">@{user.handle}</span>
                                </div>
                            </Link>
                            <Link href={`/post/${post._id}`} className="post_content">
                                <p>{post.content}</p>
                            </Link>
                            <div className="post_details">
                                <span className="post_time">{formatTimeSince(new Date(post.createdAt))}</span>
                                {/* Replace static location with dynamic data if available */}
                                <span className="location">Unknown</span>
                            </div>
                            <div className="post_actions">
                                <button className="like_button">
                                    <svg
                                        width="24"
                                        height="24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M7.75 3.5C5.127 3.5 3 5.76 3 8.547 3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79-.78-1.654-2.39-2.79-4.25-2.79" />
                                    </svg>
                                    <span className="like_count">{post.likes.length}</span>
                                </button>
                                <button className="comment_button">
                                    <Link href={`/post/${post._id}`}>
                                        <svg
                                            width="24"
                                            height="24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M3.464 16.828C2 15.657 2 14.771 2 11s0-5.657 1.464-6.828C4.93 3 7.286 3 12 3s7.071 0 8.535 1.172S22 7.229 22 11s0 4.657-1.465 5.828C19.072 18 16.714 18 12 18c-2.51 0-3.8 1.738-6 3v-3.212c-1.094-.163-1.899-.45-2.536-.96" />
                                        </svg>
                                        <span className="comment_count">{post.cchildPosts.length}</span>
                                    </Link>
                                </button>
                                <button className="flag_button red">
                                    <svg
                                        width="24"
                                        height="24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="m4.75 14 13.78-4.04c.96-.282.96-1.638 0-1.92L4.75 4m0 10V4m0 10v7m0-17V3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
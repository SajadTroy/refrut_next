// app/new/page.tsx
import { verifySession } from '@/lib/session';
import '@/styles/newPost.css';
import NewPostForm from '@/app/(user)/post/new/NewPostClient';

export async function generateMetadata() {
    return {
        title: 'New Post',
        description: 'Write new post',
        metadataBase: new URL('https://refrut.com'),
    };
}

export default async function PostDetails() {
    await verifySession(); // Ensure user is authenticated
    return (
        <div className="home_container">
            <div className="new_post_container">
                <NewPostForm />
            </div>
        </div>
    );
}
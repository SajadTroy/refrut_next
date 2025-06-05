import '@/styles/home.css';
import { verifySession } from '@/lib/session';
import PostCard from '@/components/post-card';
import { getPosts } from './action';

export const metadata = {
  title: 'Refrut',
  description:
    'A social media platform where you can share your thoughts, ideas, and experiences with the world. Join us to connect, engage, and explore a diverse community of individuals.',
  metadataBase: new URL('https://refrut.com'),
  keywords: ['Refrut', 'Social Media', 'Community', 'Engagement', 'Connection', 'Sharing', 'Ideas', 'Experiences'],
  applicationName: 'Refrut',
  referrer: 'origin-when-cross-origin',
  openGraph: {
    images: ['/img/opengraph/image.png'],
  },
};

export default async function Home() {
  const { posts, error } = await getPosts();

  // Handle error case
  if (error || !posts) {
    return (
      <main style={{ width: '100%', height: 'auto' }}>
        <div>{error || 'No posts available'}</div>
      </main>
    );
  }

  await verifySession();

  return (
    <main style={{ width: '100%', height: 'auto' }}>
      {posts.map((post) => (
        <PostCard
          key={post._id.toString()} // Use unique identifier for key
          user={{
            name: post.author.name,
            username: post.author.handle,
            avatar: post.author.profilePicture || '/placeholder.svg?height=40&width=40',
          }}
          content={post.content}
          publishedAt={new Date(post.createdAt)}
          likeCount={post.likeCount || 0}
          commentCount={post.commentCount || 0}
        />
      ))}
    </main>
  );
}
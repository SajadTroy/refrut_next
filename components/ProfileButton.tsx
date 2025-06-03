import '@/styles/Profile.css';
import { followUser, isFollowing, unfollowUser } from '@/app/(user)/u/[handle]/action';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  handle: string;
  bio?: string;
  profilePicture?: string;
  dateOfBirth?: string;
  isVerified: boolean;
  roles: string[];
  status: string;
}

type ProfileButtonProps = {
  handle: string;
  user: User;
};

export default async function ProfileButton({ handle, user }: ProfileButtonProps) {
  const isFollowingUser = await isFollowing(handle);

  async function handleFollowAction(formData: FormData) {
    'use server';
    const action = formData.get('action');

    if (action === 'follow') {
      await followUser(handle);
    } else if (action === 'unfollow') {
      await unfollowUser(handle);
    }

    revalidatePath(`/u/${handle}`);
    redirect(`/u/${handle}`);
  }

  return (
    <form action={handleFollowAction} className="profile_button">
      <input type="hidden" name="action" value={isFollowingUser ? 'unfollow' : 'follow'} />
      <button className={`follow_button ${isFollowingUser ? 'following' : ''}`} type="submit">
        {isFollowingUser ? 'Unfollow' : 'Follow'}
      </button>
    </form>
  );
}

'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { publishPost } from '@/app/(user)/post/new/action';

interface PublishPostResponse {
  success?: boolean;
  error?: string;
  postId?: string;
}

export default function NewPostForm() {
  const [state, formAction, isPending] = useActionState(publishPost, null);
  const router = useRouter();

  // Handle client-side redirect on successful post creation
  useEffect(() => {
    if (state?.success && state?.postId) {
      console.log('Redirecting to post:', state.postId); // Debugging
      router.push(`/post/${state.postId}`);
    }
  }, [state, router]);

  return (
    <div className="posting-card">
      <form id="new-post-form" action={formAction} className="posting-card__form">
        {/* Display error message if present */}
        {state?.error && (
          <div className="posting-card__error" style={{ color: 'red', marginBottom: '8px' }}>
            {state.error}
          </div>
        )}
        {/* OUTER “textbox” DIV: All visual styling goes here */}
        <div className="posting-card__textarea-wrapper">
          <textarea
            name="content"
            placeholder="What’s happening?"
            maxLength={280}
            required
            className="posting-card__textarea"
          />
        </div>

        <button
          type="submit"
          className="posting-card__button"
          disabled={isPending}
        >
          {isPending ? 'Publishing…' : 'Publish'}
        </button>
      </form>
    </div>
  );
}
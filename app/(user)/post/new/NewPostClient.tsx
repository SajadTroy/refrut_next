'use client';

import { useActionState } from 'react';
import { publishPost } from '@/app/(user)/post/new/action';

export default function NewPostForm() {
  const [state, formAction, isPending] = useActionState(publishPost, null);

  return (
    // <-- Make sure this lives inside a ".home_container" div in your page
    <div className="posting-card">
      <form
        id="new-post-form"
        action={formAction}
        className="posting-card__form"
      >
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
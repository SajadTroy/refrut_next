// app/new/NewPostForm.tsx
'use client';

import { useActionState } from 'react';
import { publishPost } from '@/app/(user)/post/new/action';

export default function NewPostForm() {
    const [state, formAction, isPending] = useActionState(publishPost, null);

    return (
        <>
            <div className="topbar">
                <button type="submit" form="new-post-form" disabled={isPending}>
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
                        <path d="m14 10-3 3m9.288-9.969a.535.535 0 0 1 .68.681l-5.924 16.93a.535.535 0 0 1-.994.04l-3.219-7.242a.54.54 0 0 0-.271-.271l-7.242-3.22a.535.535 0 0 1 .04-.993z" />
                    </svg>
                </button>
            </div>

            <form id="new-post-form" action={formAction} className="writing_box">
                <textarea
                    name="content"
                    placeholder="Write something"
                    required
                    maxLength={280}
                ></textarea>
                {state?.error && <div className="error_message">{state.error}</div>}
                <button type="submit" hidden disabled={isPending}>
                    Submit
                </button>
            </form>
        </>
    );
}
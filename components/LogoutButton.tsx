'use client';

import '@/styles/Profile.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { logout, LogoutFormState } from '@/app/(user)/u/profile/action';
import { useActionState } from 'react';
import Link from 'next/link';

export default function LogoutButton() {
    const [state, action, pending] = useActionState<LogoutFormState, FormData>(logout, { errors: {} });

    return (
        <div className="profile_button">
            <Link href={'/u/profile/edit'} className="follow_button">Edit Profile</Link>
            &nbsp;&nbsp;
            <form action={action}>
                <button
                    type="submit"
                    className="follow_button following"
                    style={{ width: '120px' }}
                    disabled={pending}
                >
                    {pending ? 'Wait...' : 'Logout'}
                </button>
            </form>
            {state?.errors?.general && (
                <div className="form_text error">
                    <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.general}</p>
                </div>
            )}
        </div>
    );
};
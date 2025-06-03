'use client';

import '@/styles/EditProfile.css';
import { getUSer, updateProfile, UpdateProfileFormState } from '@/app/(user)/u/profile/edit/action';
import { useActionState, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    name: string;
    email: string;
    handle: string;
    bio: string;
    dateOfBirth?: string;
}

export default function EditProfile({ userId }: { userId: String }) {
    const [state, action, pending] = useActionState<UpdateProfileFormState, FormData>(updateProfile, {
        errors: {},
    });
    const [user, setUser] = useState<User | null>(null);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const router = useRouter();

    // Fetch user data to pre-populate the form
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await getUSer(userId);
                if (response?.user) {
                    setUser(response.user);
                    if (response.user.dateOfBirth) {
                        const dob = new Date(response.user.dateOfBirth);
                        const day = String(dob.getDate()).padStart(2, '0');
                        const month = String(dob.getMonth() + 1).padStart(2, '0');
                        const year = dob.getFullYear();
                        setDateOfBirth(`${day}/${month}/${year}`);
                    }
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }
        fetchUser();
    }, [userId]);

    // Handle auto-slash formatting for DOB
    const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5);
        if (value.length > 10) value = value.slice(0, 10); // Limit to DD/MM/YYYY
        setDateOfBirth(value);
    };

    // Redirect on successful update
    useEffect(() => {
        if (state?.success) {
            router.push('/u/profile');
        }
    }, [state, router]);

    return (
        <div className="login_container">
            <form action={action} name="form">
                {/* Row 1: Name and Email */}
                <div className="form_row">
                    {/* Name */}
                    <div className="form_group">
                        <label htmlFor="name">
                            Full Name<span className="red">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            defaultValue={user?.name || ''}
                            required
                        />
                        <div className="form_text error">
                            {state?.errors?.name && (
                                <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.name}</p>
                            )}
                        </div>
                    </div>
                    {/* Email (Disabled) */}
                    <div className="form_group">
                        <label htmlFor="email">
                            Email<span className="red">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            defaultValue={user?.email || ''}
                            disabled
                            required
                        />
                        <div className="form_text error">
                            {state?.errors?.email && (
                                <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.email}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Row 2: Handle and Date of Birth */}
                <div className="form_row">
                    {/* Username (Handle) */}
                    <div className="form_group">
                        <label htmlFor="handle">
                            Username<span className="red">*</span>
                        </label>
                        <input
                            type="text"
                            id="handle"
                            name="handle"
                            placeholder="Enter your username"
                            defaultValue={user?.handle || ''}
                            required
                        />
                        <div className="form_text error">
                            {state?.errors?.handle && (
                                <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.handle}</p>
                            )}
                        </div>
                    </div>
                    {/* Date of Birth */}
                    <div className="form_group">
                        <label htmlFor="dateOfBirth">
                            Date of Birth (DD/MM/YYYY)
                        </label>
                        <input
                            type="text"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            placeholder="DD/MM/YYYY"
                            value={dateOfBirth}
                            onChange={handleDateOfBirthChange}
                            maxLength={10}
                        />
                        <div className="form_text error">
                            {state?.errors?.dateOfBirth && (
                                <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.dateOfBirth}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bio */}
                <div className="form_group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        placeholder="Tell us about yourself"
                        defaultValue={user?.bio || ''}
                        maxLength={160}
                        className="form_textarea"
                    />
                    <div className="form_text error">
                        {state?.errors?.bio && (
                            <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.bio}</p>
                        )}
                    </div>
                </div>

                {/* General Error */}
                <div className="form_text error">
                    {state?.errors?.general && (
                        <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.general}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="form_group">
                    <button type="submit" className="btn btn_primary" disabled={pending}>
                        {pending ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    );
}
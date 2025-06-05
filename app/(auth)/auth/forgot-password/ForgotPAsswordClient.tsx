'use client';

import '@/styles/Login.css';
import { forgotPassword, ForgotPasswordFormState } from '@/app/(auth)/auth/forgot-password/action';
import { useActionState } from 'react';

export default function ForgotPasswordClient() {
    const [state, action, pending] = useActionState<ForgotPasswordFormState, FormData>(
        forgotPassword,
        { errors: {} }
    );

    return (
        <div className="login_container">
            <form action={action} name="form">
                <div className="form_group">
                    <a href="/">
                        <img src="/img/res/logo.png" alt="Logo" />
                    </a>
                </div>
                <div className="form_group" style={{ marginTop: '20px' }}>
                    <label htmlFor="email">
                        Email<span className="red">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form_text error">
                    {state?.errors?.email && (
                        <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.email}</p>
                    )}
                    {state?.errors?.general && (
                        <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.general}</p>
                    )}
                </div>
                <div className="form_group">
                    <button type="submit" className="btn btn_primary" disabled={pending}>
                        {pending ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </div>
                <div className="form_text" style={{ marginTop: '10px' }}>
                    <p>
                        Back to <a href="/auth/login">Login</a>
                    </p>
                </div>
            </form>
        </div>
    );
}
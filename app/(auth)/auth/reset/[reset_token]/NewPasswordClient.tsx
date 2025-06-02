'use client';

import '@/styles/Login.css';
import { resetPasswordAction, ResetPasswordFormState } from './action';
import { useActionState } from 'react';

export default function NewPasswordClient({ resetToken, isValid }: { resetToken: string; isValid: boolean }) {
    const [state, action, pending] = useActionState<ResetPasswordFormState, FormData>(
        (state, formData) => resetPasswordAction(state, formData, resetToken),
        { errors: {} }
    );

    if (!isValid) {
        return <div className="error">Invalid or expired reset token</div>;
    }

    return (
        <div className="login_container">
            <form action={action} name="form">
                <div className="form_group">
                    <a href="/">
                        <img src="/img/res/logo.png" alt="Logo" />
                    </a>
                </div>
                <div className="form_group">
                    <label htmlFor="password">
                        New Password<span className="red">*</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter new password"
                        required
                    />
                </div>
                <div className="form_text error">
                    {state?.errors?.password && (
                        <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.password}</p>
                    )}
                </div>
                <div className="form_group">
                    <label htmlFor="confirmPassword">
                        Confirm Password<span className="red">*</span>
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        required
                    />
                </div>
                <div className="form_text error">
                    {state?.errors?.confirmPassword && (
                        <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.confirmPassword}</p>
                    )}
                    {state?.errors?.token && (
                        <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.token}</p>
                    )}
                    {state?.errors?.general && (
                        <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.general}</p>
                    )}
                </div>
                <div className="form_group">
                    <button type="submit" className="btn btn_primary" disabled={pending}>
                        {pending ? 'Resetting...' : 'Reset'}
                    </button>
                </div>
                <div className="form_text">
                    <p>
                        Back to <a href="/auth/login">Login</a>
                    </p>
                </div>
            </form>
        </div>
    );
}
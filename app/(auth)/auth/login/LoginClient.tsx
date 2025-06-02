'use client';

import '@/styles/Login.css';
import { login, LoginFormState } from '@/app/(auth)/auth/login/action';
import { useActionState } from 'react';

export default function LoginClient() {
    const [state, action, pending] = useActionState<LoginFormState, FormData>(login, { errors: {} });

    return (
        <div className="login_container">
            <form action={action} name='form'>
                <div className="form_group">
                    <a href="/">
                        <img src="/img/res/logo.png" alt="Logo" />
                    </a>
                </div>
                <div className="form_group">
                    <label htmlFor="email">Email<span className='red'>*</span></label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />
                </div>
                <div className="form_text error">
                    {state?.errors?.email && <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.email}</p>}
                </div>
                <div className="form_group">
                    <label htmlFor="password">Password<span className='red'>*</span></label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required />
                </div>
                <div className="form_text error">
                    {state?.errors?.password && <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.password}</p>}
                    {state?.errors?.general && <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.general}</p>}
                </div>
                <div className="form_text">
                    <p>
                        <a href="/auth/forgot-password">Forgot your password?</a>
                    </p>
                </div>
                <div className="form_group">
                    <button type="submit" className="btn btn_primary" disabled={pending}>{pending ? 'Logging in...' : 'Login'}</button>
                </div>
                <div className="form_text" style={{ marginTop: '10px' }}>
                    <p>Don't have an account? <a href="/auth/signup">Signup</a></p>
                </div>
            </form>
        </div>
    );
}
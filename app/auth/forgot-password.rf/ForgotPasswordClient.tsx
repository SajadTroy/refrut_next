'use client';
import '@/styles/Login.css';
import { useEffect } from 'react';
import { useAppContext } from '@/app/404-context';

export default function ForgotPasswordClient() {
    const { setIs404 } = useAppContext();

    useEffect(() => {
        setIs404(true);
        return () => setIs404(false);
    }, [setIs404]);
    return (
        <div className="login_container">
            <form action="/api/reset/password" method="post" name='form'>
                <div className="form_group">
                    <a href="/">
                        <img src="/img/res/logo.png" alt="Logo" />
                    </a>
                </div>
                <div className="form_group">
                    <label htmlFor="email">Email<span className='red'>*</span></label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />
                </div>
                <div className="form_group">
                    <button type="submit" className="btn btn_primary">Send Reset Link</button>
                </div>
                <div className="form_text">
                    <p>Back to <a href="/auth/login.rf">Login</a></p>
                </div>
            </form>
        </div>
    );
}
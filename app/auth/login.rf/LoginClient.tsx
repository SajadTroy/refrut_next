'use client';
import '@/styles/Login.css';
import { useEffect } from 'react';
import { useAppContext } from '@/app/404-context';

export default function SSignupClient() {
    const { setIs404 } = useAppContext();

    useEffect(() => {
        setIs404(true);
        return () => setIs404(false);
    }, [setIs404]);
    return (
        <div className="login_container">
            <form action="" method="post" name='form'>
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
                    <label htmlFor="password">Password<span className='red'>*</span></label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required />
                </div>
                <div className="form_text">
                    <p>
                        <a href="/auth/forgot-password.rf">Forgot your password?</a>
                    </p>
                </div>
                <div className="form_group">
                    <button type="submit" className="btn btn_primary">Login</button>
                </div>
                <div className="form_text">
                    <p>Don't have an account? <a href="/auth/signup.rf">Signup</a></p>
                </div>
            </form>
        </div>
    );
}
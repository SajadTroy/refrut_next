'use client';
import '@/styles/Login.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/404-context';

export default function SSignupClient() {
    const { setIs404 } = useAppContext();
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setIs404(true);
        return () => setIs404(false);
    }, [setIs404]);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await fetch('/api/user/profile', {
                    method: 'POST'});
                if (res.ok) {
                    router.replace('/u/profile');
                    return;
                }
            } catch (err) {
                console.error('Error checking login:', err);
            }
            setChecked(true); 
        };
        checkLogin();
    }, [router]);

    if (!checked) return null;

    return (
        <div className="login_container">
            <form action="/api/auth/login" method="post" name='form'>
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
'use client';
import '@/styles/Login.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/404-context';

export default function LoginClient() {
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
                    method: 'POST'
                });
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
            <form action="/api/auth/signup" method="post" name='form'>
                <div className="form_group">
                    <a href="/">
                        <img src="/img/res/logo.png" alt="Logo" />
                    </a>
                </div>
                <div className="form_group">
                    <label htmlFor="fullname">Full Name<span className='red'>*</span></label>
                    <input type="text" id="fullname" name="fullName" placeholder="Enter your full name" required />
                </div>
                <div className="form_group">
                    <label htmlFor="email">Email<span className='red'>*</span></label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />
                </div>
                <div className="form_group">
                    <label htmlFor="dateofbirth">Date of Birth<span className='red'>*</span></label>
                    <input type="text" id="dateofbirth" name="dateOfBirth" placeholder='DD/MM/YYYY' required />
                </div>
                <div className="form_text">
                    <p>By signing up, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</p>
                </div>
                <div className="form_group">
                    <button type="submit" className="btn btn_primary">Sign Up</button>
                </div>
                <div className="form_text">
                    <p>Already have an account? <a href="/auth/login.rf">Login</a></p>
                </div>
            </form>
        </div>
    );
}
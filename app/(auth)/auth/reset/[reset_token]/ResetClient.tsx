'use client';
import '@/styles/Login.css';
import { useEffect } from 'react';
import { useAppContext } from '@/app/(user)/404-context';

export default function ResetClient({ reset_token }: { reset_token: string }) {
    const { setIs404 } = useAppContext();

    useEffect(() => {
        setIs404(true);
        return () => setIs404(false);
    }, [setIs404]);
    return (
        <div className="login_container">
            <form action={`/api/reset/${reset_token}`} method="post" name='form'>
                <div className="form_group">
                    <a href="/">
                        <img src="/img/res/logo.png" alt="Logo" />
                    </a>
                </div>
                <div className="form_group">
                    <label htmlFor="password">New Password<span className='red'>*</span></label>
                    <input type="password" id="password" name="password" placeholder="Enter new password" required />
                </div>
                <div className="form_group">
                    <button type="submit" className="btn btn_primary">Reset</button>
                </div>
                <div className="form_text">
                    <p>Back to <a href="/auth/login">Login</a></p>
                </div>
            </form>
        </div>
    );
}
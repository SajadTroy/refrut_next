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
        </div>
    );
}
// app/not-found.tsx
'use client';
import '@/public/css/not-found.css';
import { useEffect } from 'react';
import { useAppContext } from '@/app/404-context';

export default function Custom404({ status = '404', message = 'The requested page was not found on this server' }) {
  const { setIs404 } = useAppContext();

  useEffect(() => {
    setIs404(true);
    return () => setIs404(false);
  }, [setIs404]);
  
  return (
    <div className="children_not">
      <div data-body>
        <a href="/" aria-label="GrovixLab">
          <span className="logo" id='logo' />
        </a>
        <p>
          <b>{status}.</b> <ins>That's an error.</ins>
        </p>
        <p>
          {message}. <ins>That's all we know.</ins>
        </p>
      </div>
    </div>
  );
}
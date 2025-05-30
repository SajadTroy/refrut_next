// app/client-layout.tsx
'use client';
import Navigation from '@/components/Navigation';
import { ReactNode } from 'react';
import { useAppContext } from '@/app/404-context';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { is404 } = useAppContext();

  console.log('ClientLayout rendered, is404:', is404);

  return (
    <div className="children">
      {is404 ? children : <Navigation>{children}</Navigation>}
    </div>
  );
}
// app/layout.tsx
import '@/styles/global.css';
import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import { headers } from 'next/headers';
import { checkAuthStatus } from '@/lib/session';

export const metadata = {
  title: 'Piecom',
  description: 'Your social platform',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  let isAuthenticated = false;
  try {
    isAuthenticated = await checkAuthStatus();
  } catch (err) {
    console.error('Error in checkAuthStatus():', err);
    isAuthenticated = false;
  }

  const rawHeaders = await headers();
  const invokedPath = rawHeaders.get('x-invoke-path') || '/';
  const pathname = new URL(invokedPath, 'http://example.com').pathname;

  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Piecom" />
        <meta name="theme-color" content="#fff" />
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
        />
      </head>
      <body>
        <Navigation isAuthenticated={isAuthenticated} pathname={pathname}>
          {children}
        </Navigation>
      </body>
    </html>
  );
}

// app/layout.tsx
import '@/styles/global.css';
import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import { headers } from 'next/headers';
import { checkAuthStatus } from '@/lib/session';

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
  // Read the custom header set by middleware
  const pathname = rawHeaders.get('x-custom-pathname') || '/';

  console.log('All headers:', Object.fromEntries(rawHeaders.entries()));
  console.log('Pathname:', pathname);

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
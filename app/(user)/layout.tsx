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
  const allHeaders = Object.fromEntries(rawHeaders.entries());

  // Try x-custom-pathname first (if middleware is added later)
  let pathname = allHeaders['x-custom-pathname'] || null;

  // Fallback to referer
  if (!pathname && allHeaders['referer']) {
    try {
      const url = new URL(allHeaders['referer']);
      // Ensure referer hostname matches current host to avoid external referers
      if (url.hostname === allHeaders['host']) {
        pathname = url.pathname;
      } else {
        console.warn('Referer hostname mismatch:', url.hostname, 'vs', allHeaders['host']);
        pathname = '/';
      }
    } catch (error) {
      console.error('Error parsing referer:', error);
      pathname = '/';
    }
  } else if (!pathname) {
    console.warn('x-custom-pathname and referer not set or invalid, defaulting to "/"');
    pathname = '/';
  }

  console.log('Final pathname:', pathname);

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
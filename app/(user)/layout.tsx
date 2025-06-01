// app/layout.tsx
'use client';
import '@/styles/global.css';
import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';

export default function RootLayout({ children }: { children: ReactNode }) {
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
        <Navigation>{children}</Navigation>
      </body>
    </html>
  );
}
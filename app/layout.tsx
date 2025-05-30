// app/layout.tsx
'use client';
import '@/public/css/global.css';
import { ReactNode } from 'react';
import { AppProvider } from '@/app/404-context';
import ClientLayout from '@/app/client-layout';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Piecom" />
        <meta name="theme-color" content="#000" />
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
        />
      </head>
      <body>
        <AppProvider>
          <ClientLayout>{children}</ClientLayout>
        </AppProvider>
      </body>
    </html>
  );
}
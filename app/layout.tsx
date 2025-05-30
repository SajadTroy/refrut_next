'use client';
import '@/public/css/global.css';
import Navigation from '@/components/Navigation';
import { ReactNode, isValidElement } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  let is404 = false;

  try {
    const props: any = isValidElement(children) ? children.props : null;
    const notFoundElements = props?.notFound;

    if (Array.isArray(notFoundElements)) {
      for (const element of notFoundElements) {
        if (
          typeof element === 'object' &&
          element?._owner?.name === 'Custom404'
        ) {
          is404 = true;
          break;
        }
      }
    }
  } catch (err) {
    console.error('Error detecting 404:', err);
  }

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
        <div className="children">
          {is404 ? children : <Navigation>{children}</Navigation>}
        </div>
      </body>
    </html>
  );
}

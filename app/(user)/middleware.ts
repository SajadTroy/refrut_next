// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // Set a custom header with the pathname
  response.headers.set('x-custom-pathname', request.nextUrl.pathname);
  console.log('Middleware set x-custom-pathname:', request.nextUrl.pathname);
  return response;
}

// Apply middleware to all routes except static assets and API routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon1.png|manifest.json).*)'],
};
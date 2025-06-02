'use server';

import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'bakabaka');
const isProd = process.env.NODE_ENV === 'production';

// Cookie configuration
const cookie = {
    name: 'session',
    options: {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax' as const,
        path: '/',
    },
    duration: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
};

interface SessionPayload extends JWTPayload {
    userId: string;
}

// Encrypt the session payload into a JWT
async function encrypt(payload: SessionPayload): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(Date.now() + cookie.duration)
        .sign(secret);
}

// Decrypt and verify the JWT
async function decrypt(token: string | undefined): Promise<SessionPayload | null> {
    if (!token) return null;

    try {
        const { payload } = await jwtVerify<SessionPayload>(token, secret);
        return payload;
    } catch (err) {
        console.error('JWT verification failed:', err);
        return null;
    }
}

// Create a session and set the cookie
export async function createSession(userId: string, shouldRedirect: boolean = true) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid userId');
    }

    const expires = new Date(Date.now() + cookie.duration);
    const session = await encrypt({ userId });

    await (await cookies()).set({
        name: cookie.name,
        value: session,
        ...cookie.options,
        expires,
    });

    if (shouldRedirect) {
        redirect('/u/profile');
    }
}

export async function getSession() {
  const token = (await cookies()).get(cookie.name)?.value;
  return await decrypt(token);
}

// Verify the current session
export async function verifySession() {
    const token = (await cookies()).get(cookie.name)?.value;
    const session = await decrypt(token);

    if (!session?.userId) {
        redirect('/auth/login');
    }

    return { userId: session.userId };
}

// Check if user is authorized and redirect to /u/profile if they are
export async function restrictUnauthorizedAccess(shouldRedirect: boolean = true) {
    const token = (await cookies()).get(cookie.name)?.value;
    const session = await decrypt(token);

    if (session?.userId && shouldRedirect) {
        redirect('/u/profile');
    }

    return { isAuthorized: !!session?.userId, userId: session?.userId || null };
}

// Destroy the session
export async function destroySession() {
    await (await cookies()).set({
        name: cookie.name,
        value: '',
        ...cookie.options,
        expires: new Date(0),
    });
    redirect('/auth/login');
}
'use server';

import { loginUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createSession } from '@/lib/session';

export type LoginFormState = {
    errors?: {
        email?: string;
        password?: string;
        general?: string;
    };
    success?: boolean;
    userId?: string;
};

export async function login(
    state: LoginFormState,
    formData: FormData
): Promise<LoginFormState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    const result = await loginUser(email, password, ip, userAgent);

    if (result.success) {
        await createSession(result.userId as string);
        return { errors: {}, success: true, userId: result.userId };;
    }

    return {
        errors: {
            email: result.email,
            password: result.password,
            general: result.general,
        },
    };
}
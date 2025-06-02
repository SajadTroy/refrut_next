'use server';

import { loginUser } from '@/lib/auth';
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

export async function login(state: LoginFormState, formData: FormData): Promise<LoginFormState> {
    const result = await loginUser(formData.get('email') as string, formData.get('password') as string);

    if (!result) {
        return {
            errors: {
                general: 'Unexpected error occurred during login',
            },
        };
    }

    if (result.success) {
        await createSession(result.userId as string);
        return { errors: {}, success: true, userId: result.userId };
    }

    return {
        errors: {
            email: result.email,
            password: result.password,
            general: result.general,
        },
    };
}
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

const login = async (state: LoginFormState, formData: FormData): Promise<LoginFormState | undefined> => {
    let result = await loginUser(formData.get('email') as string, formData.get('password') as string);
    if (result.success) {
        await createSession(result.userId as string);
        return { errors: {}, success: true };
    }

    return {
        errors: {
            email: result.email,
            password: result.password,
            general: result.general
        }
    };
}

export { login };
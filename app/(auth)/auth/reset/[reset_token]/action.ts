'use server';

import { resetPassword } from '@/lib/auth';
import { redirect } from 'next/navigation';

export type ResetPasswordFormState = {
    errors?: {
        password?: string;
        confirmPassword?: string;
        token?: string;
        general?: string;
    };
    success?: boolean;
};

export async function resetPasswordAction(
    state: ResetPasswordFormState,
    formData: FormData,
    resetToken: string
): Promise<ResetPasswordFormState> {
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
        return { errors: { confirmPassword: 'Passwords do not match' } };
    }

    const result = await resetPassword(resetToken, password);

    if (result.success) {
        redirect('/auth/login?reset-password=success');
    }

    return {
        errors: {
            password: result.password,
            token: result.token,
            general: result.general,
        },
    };
}
'use server';

import { requestPasswordReset } from '@/lib/auth';
import { redirect } from 'next/navigation';

export type ForgotPasswordFormState = {
  errors?: {
    email?: string;
    general?: string;
  };
  success?: boolean;
};

export async function forgotPassword(
  state: ForgotPasswordFormState,
  formData: FormData
): Promise<ForgotPasswordFormState> {
  const email = formData.get('email') as string;
  const result = await requestPasswordReset(email);

  if (result.success) {
    redirect('/auth/login?forgot-password=success');
  }

  return {
    errors: {
      email: result.email,
      general: result.general,
    },
  };
}
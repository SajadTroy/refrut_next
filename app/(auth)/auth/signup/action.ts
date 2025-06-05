'use server';

import { signupUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export type SignupFormState = {
  errors?: {
    fullName?: string;
    email?: string;
    password?: string;
    dateOfBirth?: string;
    general?: string;
  };
  success?: boolean;
};

export async function signup(
  state: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const result = await signupUser(
    formData.get('fullName') as string,
    formData.get('email') as string,
    formData.get('password') as string,
    formData.get('dateOfBirth') as string
  );

  if (result.success) {
    redirect('/auth/login?signup=success');
  }

  return {
    errors: {
      fullName: result.fullName,
      email: result.email,
      dateOfBirth: result.dateOfBirth,
      general: result.general,
    },
  };
}
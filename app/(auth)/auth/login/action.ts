'use server';

import { loginUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export type LoginFormState = {
  errors?: {
    email?: string;
    password?: string;
    general?: string;
  };
  success?: boolean;
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
    redirect('/u/profile');
  }

  return {
    errors: {
      email: result.email,
      password: result.password,
      general: result.general,
    },
  };
}
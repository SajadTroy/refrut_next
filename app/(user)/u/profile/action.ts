'use server';

import { destroySession } from '@/lib/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type LogoutFormState = {
  errors?: {
    general?: string;
  };
  success?: boolean;
};

export async function logout(): Promise<LogoutFormState> {
  try {
    await destroySession();

    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { errors: { general: 'Failed to log out' } };
  }
}
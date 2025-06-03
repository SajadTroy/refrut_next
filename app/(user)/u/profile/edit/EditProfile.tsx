'use client';

import '@/styles/Login.css';
import { signup, SignupFormState } from '@/app/(auth)/auth/signup/action';
import { useActionState, useState } from 'react';

export default function EdiProfile({ userId }: { userId: String }) {
  const [state, action, pending] = useActionState<SignupFormState, FormData>(signup, { errors: {} });

  return (
    <div className="login_container">
      <form action={action} name="form">
        <div className="form_group">
          <label htmlFor="fullName">
            Full Name<span className="red">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form_text error">
          {state?.errors?.fullName && (
            <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.fullName}</p>
          )}
        </div>
        <div className="form_group">
          <label htmlFor="email">
            Email<span className="red">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form_text error">
          {state?.errors?.email && (
            <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.email}</p>
          )}
        </div>
        <div className="form_text error">
          {state?.errors?.general && (
            <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.general}</p>
          )}
        </div>
        <div className="form_group">
          <button type="submit" className="btn btn_primary" disabled={pending}>
            {pending ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
}
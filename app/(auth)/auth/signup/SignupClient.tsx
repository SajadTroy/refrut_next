'use client';

import '@/styles/Login.css';
import { signup, SignupFormState } from '@/app/(auth)/auth/signup/action';
import { useActionState } from 'react';

export default function SignupClient() {
  const [state, action, pending] = useActionState<SignupFormState, FormData>(signup, { errors: {} });

  return (
    <div className="login_container">
      <form action={action} name="form">
        <div className="form_group">
          <a href="/">
            <img src="/img/res/logo.png" alt="Logo" />
          </a>
        </div>
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
        <div className="form_group">
          <label htmlFor="dateOfBirth">
            Date of Birth<span className="red">*</span>
          </label>
          <input
            type="text"
            id="dateOfBirth"
            name="dateOfBirth"
            placeholder="DD/MM/YYYY"
            required
          />
        </div>
        <div className="form_text error">
          {state?.errors?.dateOfBirth && (
            <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.dateOfBirth}</p>
          )}
          {state?.errors?.general && (
            <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.general}</p>
          )}
        </div>
        <div className="form_text">
          <p>
            By signing up, you agree to our <a href="/terms">Terms of Service</a> and{' '}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </div>
        <div className="form_group">
          <button type="submit" className="btn btn_primary" disabled={pending}>
            {pending ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>
        <div className="form_text" style={{ marginTop: '10px' }}>
          <p>
            Already have an account? <a href="/auth/login">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}
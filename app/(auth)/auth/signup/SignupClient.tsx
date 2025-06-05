'use client';

import '@/styles/Login.css';
import { signup, SignupFormState } from '@/app/(auth)/auth/signup/action';
import { useActionState, useState } from 'react';

export default function SignupClient() {
  const [state, action, pending] = useActionState<SignupFormState, FormData>(signup, { errors: {} });
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // Allow only digits
    if (value.length > 8) value = value.slice(0, 8); // Limit to 8 digits (DDMMYYYY)

    let formatted = '';
    if (value.length > 0) {
      formatted = value.slice(0, 2); // DD
      if (value.length > 2) {
        formatted += '/' + value.slice(2, 4); // DD/MM
        if (value.length > 4) {
          formatted += '/' + value.slice(4, 8); // DD/MM/YYYY
        }
      }
    }

    setDateOfBirth(formatted);
  };

  return (
    <div className="login_container">
      <form action={action} name="form">
        <div className="form_group">
          <a href="/">
            <img src="/img/res/logo.png" alt="Logo" />
          </a>
        </div>
        <div className="form_group" style={{ marginTop: '20px' }}>
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
          <label htmlFor="password">
            Password<span className="red">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="form_text">
          <p style={{ color: 'gray', fontSize: '14px', marginTop: '3px' }}>Password must contain at least one letter, one number, and be longer than 6 characters.</p>
        </div>
        <div className="form_text error">
          {state?.errors?.password && (
            <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.password}</p>
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
            value={dateOfBirth}
            onChange={handleDateChange}
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
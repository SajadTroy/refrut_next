import '@/styles/Login.css';
import { loginUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: "Login - Refrut",
  description: "A social media platform where you can share your thoughts, ideas, and experiences with the world. Join us to connect, engage, and explore a diverse community of individuals.",
  metadataBase: new URL('https://refrut.com'),
  keywords: ['Refrut', 'Social Media', 'Community', 'Engagement', 'Connection', 'Sharing', 'Ideas', 'Experiences'],
  applicationName: 'Refrut',
  referrer: 'origin-when-cross-origin',
  openGraph: {
    images: ['/img/opengraph/image.png'],
  },
};

export default async function Login() {
  return (
  <div className="login_container">
    <form action={async (formData) => {
      'use server';
      let { error } = await loginUser(formData.get('email') as string, formData.get('password') as string);
      error ? alert(error) : redirect('/u/profile');
    }} name='form'>
      <div className="form_group">
        <a href="/">
          <img src="/img/res/logo.png" alt="Logo" />
        </a>
      </div>
      <div className="form_group">
        <label htmlFor="email">Email<span className='red'>*</span></label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required />
      </div>
      <div className="form_group">
        <label htmlFor="password">Password<span className='red'>*</span></label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required />
      </div>
      <div className="form_text">
        <p>
          <a href="/auth/forgot-password">Forgot your password?</a>
        </p>
      </div>
      <div className="form_group">
        <button type="submit" className="btn btn_primary">Login</button>
      </div>
      <div className="form_text">
        <p>Don't have an account? <a href="/auth/signup">Signup</a></p>
      </div>
    </form>
  </div>
  );
}
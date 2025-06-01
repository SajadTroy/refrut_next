import { signupUser } from '@/lib/auth';
import '@/styles/Login.css';
import { redirect } from 'next/navigation';

export const metadata = {
  title: "Signup - Refrut",
  description: "A social media platform where you can share your thoughts, ideas, and experiences with the world. Join us to connect, engage, and explore a diverse community of individuals.",
  metadataBase: new URL('https://refrut.com'),
  keywords: ['Refrut', 'Social Media', 'Community', 'Engagement', 'Connection', 'Sharing', 'Ideas', 'Experiences'],
  applicationName: 'Refrut',
  referrer: 'origin-when-cross-origin',
  openGraph: {
    images: ['/img/opengraph/image.png'],
  },
};

export default async function Signup() {
  return (
    <div className="login_container">
      <form action={async (formData) => {
        'use server';
        let { error } = await signupUser(formData.get('fullName') as string, formData.get('email') as string, formData.get('dateOfBirth') as string);
        error ? alert(error) : (alert('Signup successful! Please check your email to verify your account.'), redirect('/auth/login'));
      }} name='form'>
        <div className="form_group">
          <a href="/">
            <img src="/img/res/logo.png" alt="Logo" />
          </a>
        </div>
        <div className="form_group">
          <label htmlFor="fullname">Full Name<span className='red'>*</span></label>
          <input type="text" id="fullname" name="fullName" placeholder="Enter your full name" required />
        </div>
        <div className="form_group">
          <label htmlFor="email">Email<span className='red'>*</span></label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>
        <div className="form_group">
          <label htmlFor="dateofbirth">Date of Birth<span className='red'>*</span></label>
          <input type="text" id="dateofbirth" name="dateOfBirth" placeholder='DD/MM/YYYY' required />
        </div>
        <div className="form_text">
          <p>By signing up, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</p>
        </div>
        <div className="form_group">
          <button type="submit" className="btn btn_primary">Sign Up</button>
        </div>
        <div className="form_text">
          <p>Already have an account? <a href="/auth/login">Login</a></p>
        </div>
      </form>
    </div>
  );
}
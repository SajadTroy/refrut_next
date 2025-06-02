import '@/styles/Login.css';

export default function ForgotPasswordClient() {
  return (
    <div className="login_container">
      <form action="/api/reset/password" method="post" name='form'>
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
          <button type="submit" className="btn btn_primary">Send Reset Link</button>
        </div>
        <div className="form_text">
          <p>Back to <a href="/auth/login">Login</a></p>
        </div>
      </form>
    </div>
  );
}
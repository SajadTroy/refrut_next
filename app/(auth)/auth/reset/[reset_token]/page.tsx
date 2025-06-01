import '@/styles/Profile.css';
import connectDB from '@/lib/database';
import User from '@/models/User';

type Params = Promise<{ reset_token: string }>;

export async function generateMetadata({ params }: { params: Params }) {
    const { reset_token } = await params;

    return {
        title: `Reset Password - Refrut`,
        description: `Use the link below to reset your password.`,
        metadataBase: new URL('https://refrut.com'),
        keywords: ['Refrut', 'Social Media', 'Community', 'Profile', reset_token],
        applicationName: 'Refrut',
        referrer: 'origin-when-cross-origin',
        openGraph: {
            title: `Reset Password - Refrut`,
            description: `Use the link below to reset your password.`,
            url: `https://refrut.com/reset/${reset_token}`,
            images: [`/img/opengraph/reset.png`], // optionally dynamic
        },
    };
}

export default async function ResetPassword({ params }: { params: Params }) {
    const { reset_token } = await params;

    if (!reset_token) {
        return <div className="error">Invalid reset token</div>;
    }

    console.log("Reset token:", reset_token);


    await connectDB();
    const user = await User.findOne({
        resetPasswordToken: reset_token,
        resetPasswordTokenExpiry: { $gt: new Date() },
        isVerified: true,
        status: "active"
    });

    if (!user) {
        return <div className="error">Invalid reset token</div>;
    }

    return (
        <div className="login_container">
            <form action={`/api/reset/${reset_token}`} method="post" name='form'>
                <div className="form_group">
                    <a href="/">
                        <img src="/img/res/logo.png" alt="Logo" />
                    </a>
                </div>
                <div className="form_group">
                    <label htmlFor="password">New Password<span className='red'>*</span></label>
                    <input type="password" id="password" name="password" placeholder="Enter new password" required />
                </div>
                <div className="form_group">
                    <button type="submit" className="btn btn_primary">Reset</button>
                </div>
                <div className="form_text">
                    <p>Back to <a href="/auth/login">Login</a></p>
                </div>
            </form>
        </div>
    );
}

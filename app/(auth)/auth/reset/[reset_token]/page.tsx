import '@/styles/Login.css';
import connectDB from '@/lib/database';
import User from '@/models/User';
import NewPasswordClient from './NewPasswordClient';

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
            images: [`/img/opengraph/reset.png`],
        },
    };
}

export default async function ResetPassword({ params }: { params: Params }) {
    const { reset_token } = await params;

    if (!reset_token) {
        return <div className="error">Invalid reset token</div>;
    }

    await connectDB();
    const user = await User.findOne({
        resetPasswordToken: reset_token,
        resetPasswordTokenExpiry: { $gt: new Date() },
        isVerified: true,
        status: 'active',
    });

    return <NewPasswordClient resetToken={reset_token} isValid={!!user} />;
}
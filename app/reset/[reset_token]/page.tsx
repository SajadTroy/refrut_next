'use client';
import '@/styles/Profile.css';
import ResetClient from '@/app/reset/[reset_token]/ResetClient';
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

    await connectDB();
    const user = await User.findOne({
        resetPasswordToken: reset_token,
        resetPasswordTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
        return <div className="error">Invalid reset token</div>;
    }

    return (<ResetClient reset_token={reset_token} />);
}

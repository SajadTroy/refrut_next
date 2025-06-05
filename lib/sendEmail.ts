import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailUser {
    name: string;
    email: string;
    token?: string;
    tokenExpiry?: Date;
    dateOfBirth?: Date;
    handle?: string;
    _id: string;
    baseUrl: string;
    ip?: string;
    latitude?: number;
    longitude?: number;
    country?: string;
    region?: string;
    isp?: string;
    device?: string;
    browser?: string;
    loginTime?: Date;
}

export default async function sendEmail(
    user: EmailUser,
    type: 'signup' | 'password-reset' | 'password-reset-confirmation' | 'new-login' | 'verification-success'
): Promise<void> {
    let subject: string;
    let message: string;

    if (type === 'signup') {
        if (!user.token || !user.tokenExpiry) {
            throw new Error('Token and expiry are required for signup email');
        }
        const expiry = new Date(user.tokenExpiry);
        const formattedExpiry = `${expiry
            .getHours()
            .toString()
            .padStart(2, '0')}:${expiry.getMinutes().toString().padStart(2, '0')}:${expiry
                .getSeconds()
                .toString()
                .padStart(2, '0')}-${expiry.getDate().toString().padStart(2, '0')}:${(expiry.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}:${expiry.getFullYear()}`;
        const verificationLink = `${user.baseUrl}/api/verify/${user.token}`;
        subject = 'Account Verification';
        message = `Hello <strong>${user.name}</strong>,<br> your account was created successfully. You need to verify your account using this link: <strong><a href="${verificationLink}">${verificationLink}</a></strong>. This link will expire on: <strong>${formattedExpiry}.</strong>`;
    } else if (type === 'password-reset') {
        if (!user.token || !user.tokenExpiry) {
            throw new Error('Token and expiry are required for password reset email');
        }
        const expiry = new Date(user.tokenExpiry);
        const formattedExpiry = `${expiry
            .getHours()
            .toString()
            .padStart(2, '0')}:${expiry.getMinutes().toString().padStart(2, '0')}:${expiry
                .getSeconds()
                .toString()
                .padStart(2, '0')}-${expiry.getDate().toString().padStart(2, '0')}:${(expiry.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}:${expiry.getFullYear()}`;
        const resetLink = `${user.baseUrl}/auth/reset/${user.token}`; // Fixed typo: 'auuth' to 'auth'
        subject = 'Password Reset Link';
        message = `Hello <strong>${user.name}</strong>,<br> You requested a password reset. Please use the following link to reset your password: <strong><a href="${resetLink}">${resetLink}</a></strong>. This link will expire on: <strong>${formattedExpiry}</strong>.<br>If you did not request this, please contact our support team immediately.`;
    } else if (type === 'password-reset-confirmation') {
        subject = 'Your Password Has Been Reset';
        message = `Hello <strong>${user.name}</strong>,<br> The password for your account with the handle <strong>@${user.handle}</strong> has been reset. If this was not you, please contact our support team immediately.`;
    } else if(type == 'verification-success') {
        subject = 'Account Verified Successfully';
        message = `Hello <strong>${user.name}</strong>,<br>Your account has been verified successfully. You can now login using your email and the password you created during signup.`;
    } else {
        // new-login
        if (!user.ip || !user.loginTime) {
            throw new Error('IP and login time are required for new login email');
        }
        const loginTime = new Date(user.loginTime);
        const formattedTime = `${loginTime
            .getHours()
            .toString()
            .padStart(2, '0')}:${loginTime.getMinutes().toString().padStart(2, '0')}:${loginTime
                .getSeconds()
                .toString()
                .padStart(2, '0')} on ${loginTime.getDate().toString().padStart(2, '0')}/${(loginTime.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}/${loginTime.getFullYear()}`;
        subject = 'New Login Detected';
        message = `Hello <strong>${user.name}</strong>,<br> A new login to your account with the handle <strong>@${user.handle}</strong> was detected.<br><br>` +
            `Details:<br>` +
            `- Time: <strong>${formattedTime}</strong><br>` +
            `- IP Address: <strong>${user.ip}</strong><br>` +
            (user.latitude && user.longitude ? `- Location: <strong>Lat ${user.latitude}, Lon ${user.longitude}</strong><br>` : '') +
            (user.country ? `- Country: <strong>${user.country}</strong><br>` : '') +
            (user.region ? `- Region: <strong>${user.region}</strong><br>` : '') +
            (user.isp ? `- ISP: <strong>${user.isp}</strong><br>` : '') +
            (user.device ? `- Device: <strong>${user.device}</strong><br>` : '') +
            (user.browser ? `- Browser: <strong>${user.browser}</strong><br>` : '') +
            `<br>If this was not you, please secure your account immediately by resetting your password or contacting our support team.`;
    }

    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
            .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px; }
            .content { font-size: 16px; color: #333333; line-height: 1.6; text-align: left; }
            .content p { margin: 10px 0; }
            .footer { text-align: center; font-size: 12px; color: #888888; padding: 20px; }
            .footer img { margin-top: 10px; height: 20px; }
        </style>
    </head>
    <body>
        <table class="container" align="center">
            <tr>
                <td class="content">
                    <p>${message}</p>
                    <p>This email has been automatically generated. If you find any attachments or links, please avoid them.</p>
                    <p>Warm regards,<br><strong>Team Refrut</strong></p>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    <img src="https://refrut.vercel.app/img/res/logo.png" alt="Refrut">
                    <p>© Refrut. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;

    try {
        await resend.emails.send({
            from: `"Refrut" <refrut@lufta.in>`,
            to: user.email,
            subject,
            html: htmlTemplate,
        });

        console.log(`Email sent successfully to ${user.email} for ${type}`);
    } catch (error) {
        console.error(`Error sending ${type} email:`, error);
        throw error;
    }
}
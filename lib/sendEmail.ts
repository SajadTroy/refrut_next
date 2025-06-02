import nodemailer from 'nodemailer';

export interface EmailUser {
    name: string;
    email: string;
    token: string;
    tokenExpiry: Date;
    dateOfBirth?: Date;
    handle?: string;
    _id: string;
    baseUrl: string;
}

export default async function sendEmail(
    user: EmailUser,
    type: 'signup' | 'password-reset'
): Promise<void> {
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

    const link =
        type === 'signup'
            ? `${user.baseUrl}/api/verify/${user.token}`
            : `${user.baseUrl}/reset/${user.token}`;
    const subject = type === 'signup' ? 'Account Verification' : 'Password Reset Link';
    const message =
        type === 'signup'
            ? `Hello <strong>${user.name}</strong>,<br> your account was created successfully. You need to verify your account using this link: <strong><a href="${link}">${link}</a></strong>. This link will expire on: <strong>${formattedExpiry}.</strong>`
            : `Hello <strong>${user.name}</strong>,<br> You requested a password reset. Please use the following link to reset your password: <strong><a href="${link}">${link}</a></strong>. This link will expire on: <strong>${formattedExpiry}</strong>.<br>If you did not request this, please contact our support team immediately.`;

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
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: true, // true for 465
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Refrut" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject,
            html: htmlTemplate,
        });

        console.log(`Email sent successfully to ${user.email} for ${type}`);
    } catch (error) {
        console.error(`Error sending ${type} email:`, error);
        throw error; // Let the caller handle the error
    }
}
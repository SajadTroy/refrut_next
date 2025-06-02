import connectDB from "@/lib/database";
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from 'next';
import generate from 'generate-password';
import nodemailer from 'nodemailer';

export interface User {
    name: string;
    email: string;
    resetPasswordToken: string;
    resetPasswordTokenExpiry: Date;
    dateOfBirth: Date;
    handle: string;
    _id: string;
    baseUrl: string;
}

export const sendEmail = async (user: User) => {
    const expiry = new Date(user.resetPasswordTokenExpiry);
    const formattedExpiry = `${expiry.getHours().toString().padStart(2, '0')}:${expiry.getMinutes().toString().padStart(2, '0')}:${expiry.getSeconds().toString().padStart(2, '0')}-${expiry.getDate().toString().padStart(2, '0')}:${(expiry.getMonth() + 1).toString().padStart(2, '0')}:${expiry.getFullYear()}`;

    const resetLink = `${user.baseUrl}/reset/${user.resetPasswordToken}`;
    const message = `Hello <strong>${user.name}</strong>,<br> your account has been created successfully. This is the URL to reset your password: <strong><a href="${resetLink}">${resetLink}</a></strong>. This link will expire on: <strong>${formattedExpiry}.</strong>`;

    // HTML email template
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
                    <img src=src="https://refrut.vercel.app/img/res/logo.png" alt="Piecom Logo">
                    <p>© Refrut. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: true, // true for 465, false for 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Refrut" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: 'Account Created Successfully',
            html: htmlTemplate,
        });

        console.log('Email sent successfully to', user.email);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "GET") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        const { verification_token } = req.query;

        if (!verification_token) {
            return res.status(400).json({ error: "Invalid verification token" });
        }

        await connectDB();

        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const host = req.headers.host;
        const baseUrl = `${protocol}://${host}`;
        console.log("Base URL:", baseUrl);

        const user = await User.findOne({
            verificationToken: verification_token,
            verificationTokenExpiry: { $gt: new Date() },
            isVerified: false
        });

        if (!user) {
            return res.status(404).json({ error: "Verification token not found or expired" });
        }

        user.isVerified = true;
        user.status = "active";
        user.updatedAt = new Date();
        user.verificationToken = null;
        user.verificationTokenExpiry = null;

        // Generate a new reset password token
        user.resetPasswordToken = generate.generate({
            length: 32,
            numbers: true,
            symbols: false,
            uppercase: true,
            lowercase: true
        });

        user.resetPasswordTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

        await user.save();

        await sendEmail({
            name: user.name,
            email: user.email,
            resetPasswordToken: user.resetPasswordToken,
            resetPasswordTokenExpiry: user.resetPasswordTokenExpiry,
            dateOfBirth: user.dateOfBirth,
            handle: user.handle,
            _id: user._id.toString(),
            baseUrl: baseUrl
        });

        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Account verified successfully. A password reset link has been sent to your email.">
  <title>Account Verified</title>
  <style>
  @font-face {
    font-family: "Ahrefs";
    src: url('/fonts/ahrefs-regular.ttf');
}

@font-face {
    font-family: "Gilroy-Medium";
    src: url('/fonts/gilroy/Gilroy-Medium.ttf');
}

@font-face {
    font-family: "Gilroy-ExtraBold";
    src: url('/fonts/gilroy/Gilroy-ExtraBold.ttf');
}

@font-face {
    font-family: "Gilroy-Bold";
    src: url('/fonts/gilroy/Gilroy-Bold.ttf');
}

@font-face {
    font-family: "Gilroy-Light";
    src: url('/fonts/gilroy/Gilroy-Light.ttf');
}

@font-face {
    font-family: "Gilroy-Heavy";
    src: url('/fonts/gilroy/Gilroy-Heavy.ttf');
}
    body {
      background: white;
      font-family: "Ahrefs";
      display: flex;
      justify-content: start;
      align-items: start;
      height: 100vh;
      margin: 0;
      padding: 2rem;
    }
    .container {
      max-width: 600px;
      text-align: left;
    }
    h2 {
      color:  #d91824;
      margin-bottom: 1rem;
    }
    p {
      color: #333;
      font-size: 1rem;
      line-height: 1.5;
    }
    strong {
      color: #000;
    }
    a.button {
    color:  #d91824;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>✅ Account Verified Successfully!</h2>
    <p>A password reset link has been sent to your email: <strong>${user.email}</strong>.</p>
    <p>Please check your inbox and spam folder. If you do not receive the email, please contact support.</p>
    <a href="/auth/login" class="button">Go to Login</a>
  </div>
</body>
</html>`);
    } catch (error) {
        console.error("Verification error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
import connectDB from "@/lib/database";
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';

export interface User {
    name: string;
    email: string;
    dateOfBirth: Date;
    handle: string;
    _id: string;
    baseUrl: string;
}

export const sendEmail = async (user: User) => {
    const message = `Hello <strong>${user.name}</strong>,<br> The password for your account with the handle <strong>@${user.handle}</strong> has been reset. If this was not you, please contact our support team immediately.`;

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
                    <img src="https://i.postimg.cc/tgZ4LQdn/logo.png" alt="Piecom Logo">
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
            subject: 'Your Password Has Been Reset',
            html: htmlTemplate,
        });

        console.log('Email sent successfully to', user.email);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        const { reset_token } = req.query;
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ error: "Invalid password" });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }

        if (!reset_token) {
            return res.status(400).json({ error: "Invalid reset token" });
        }

        await connectDB();

        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const host = req.headers.host;
        const baseUrl = `${protocol}://${host}`;
        console.log("Base URL:", baseUrl);

        const user = await User.findOne({
            resetPasswordToken: reset_token,
            resetPasswordTokenExpiry: { $gt: new Date() },
            isVerified: true,
            status: "active"
        });

        if (!user) {
            return res.status(404).json({ error: "Reset token not found or expired" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        user.resetPasswordToken = null;
        user.resetPasswordTokenExpiry = null;

        await user.save();

        await sendEmail({
            name: user.name,
            email: user.email,
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
  <meta name="description" content="Your password has been successfully reset.">
  <title>Password Reset</title>
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
      color: #d91824;
      margin-bottom: 1rem;
    }
    p {
      color: #333;
      font-size: 1rem;
      line-height: 1.5;
    }
    a.button {
      color: #d91824;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🔒 Password Reset Successful!</h2>
    <p>You can now log in with your new password.</p>
    <a href="/login" class="button">Go to Login</a>
  </div>
</body>
</html>`);
    } catch (error) {
        console.error("Verification error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
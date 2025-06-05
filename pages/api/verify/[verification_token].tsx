import connectDB from "@/lib/database";
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from 'next';
import sendEmail from '@/lib/sendEmail';

export interface User {
    name: string;
    email: string;
    dateOfBirth: Date;
    handle: string;
    _id: string;
    baseUrl: string;
}

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

        await user.save();

        await sendEmail({
            name: user.name,
            email: user.emai,
            dateOfBirth: user.dateOfBirth,
            handle: user.handle,
            _id: user._id.toString(),
            baseUrl,
        }, 'verification-success');

        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Account verified successfully. You can now login with your email and password.">
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
        <p>Your account has been verified. You can now login using your email: <strong>${user.email}</strong> and the password you created during signup.</p>
        <p>Click the button below to proceed to the login page.</p>
        <a href="/auth/login" class="button">Go to Login</a>
      </div>
    </body>
    </html>`);
    } catch (error) {
        console.error("Verification error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
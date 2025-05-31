import connectDB from "@/lib/database";
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from 'next';
import generate from 'generate-password';
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';

export interface User {
    name: string;
    email: string;
    verificationToken: string;
    verificationTokenExpiry: Date;
    dateOfBirth: Date;
    handle: string;
    password: string;
    _id: string;
    baseUrl: string;
}

export const sendEmail = async (user: User) => {
    const expiry = new Date(user.verificationTokenExpiry);
    const formattedExpiry = `${expiry.getHours().toString().padStart(2, '0')}:${expiry.getMinutes().toString().padStart(2, '0')}:${expiry.getSeconds().toString().padStart(2, '0')}-${expiry.getDate().toString().padStart(2, '0')}:${(expiry.getMonth() + 1).toString().padStart(2, '0')}:${expiry.getFullYear()}`;

    const verificationLink = `${user.baseUrl}/verify/${user.verificationToken}`;
    const message = `Hello <strong>${user.name}</strong>,<br> your account was created successfully. You need to verify your account using this link: <strong><a href="${verificationLink}">${verificationLink}</a></strong>. This link will expire on: <strong>${formattedExpiry}.</strong>`;

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
            subject: 'Account Verification',
            html: htmlTemplate,
        });

        console.log('Email sent successfully to', user.email);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectDB();
        const { fullName, email, dateOfBirth } = await req.body;

        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const host = req.headers.host;
        const baseUrl = `${protocol}://${host}`;
        console.log("Base URL:", baseUrl);

        const password = generate.generate({
            length: 10,
            numbers: true,
            symbols: true,
            uppercase: true,
            lowercase: true
        });
        console.log("Generated password:", password);
        const verificationToken = generate.generate({
            length: 32,
            numbers: true,
            uppercase: true,
            lowercase: true
        });
        console.log("Generated verification token:", verificationToken);
        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
        console.log("Verification token expiry:", verificationTokenExpiry);
        if (!fullName) {
            return res.status(400).json({ error: "Full name is required" });
        }
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        if (!dateOfBirth) {
            return res.status(400).json({ error: "Date of birth is required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        const dateOfBirthRegex = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/YYYY format
        if (!dateOfBirthRegex.test(dateOfBirth)) {
            return res.status(400).json({ error: "Invalid date of birth format" });
        }
        // Convert dateOfBirth to Date object
        const [day, month, year] = dateOfBirth.split('/').map(Number);
        const dob = new Date(year, month - 1, day);
        if (isNaN(dob.getTime())) {
            return res.status(400).json({ error: "Invalid date of birth" });
        }
        console.log("Parsed date of birth:", day, month, year);
        const bannedUser = await User.findOne({ email, status: "banned" });
        if (bannedUser) {
            return res.status(403).json({ error: "User is banned" });
        }
        const user = await User.findOne({ email, status: "active", isVerified: true });
        if (user) {
            return res.status(409).json({ error: "User already exists" });
        }
        const inactiveUser = await User.findOne({ email, status: "inactive", isVerified: false });
        const handle = email.split('@')[0] + generate.generate({
            length: 4,
            numbers: true,
            symbols: false,
            uppercase: false,
            lowercase: false
        });
        console.log("Generated handle: @", handle);
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!inactiveUser) {
            const newUser = new User({
                name: fullName,
                email,
                password: hashedPassword,
                dateOfBirth: dob,
                handle,
                verificationToken,
                verificationTokenExpiry
            });
            await newUser.save();
            await sendEmail({
                name: fullName,
                email,
                verificationToken,
                verificationTokenExpiry,
                dateOfBirth: dob,
                handle,
                password: hashedPassword,
                _id: newUser._id.toString(),
                baseUrl
            });
            return res.redirect('/auth/login.rf');
        } else {
            inactiveUser.name = fullName;
            inactiveUser.password = hashedPassword;
            inactiveUser.dateOfBirth = dob;
            inactiveUser.handle = handle;
            inactiveUser.verificationToken = verificationToken;
            inactiveUser.verificationTokenExpiry = verificationTokenExpiry;
            await inactiveUser.save();
            await sendEmail({
                name: fullName,
                email,
                verificationToken,
                verificationTokenExpiry,
                dateOfBirth: dob,
                handle,
                password: hashedPassword,
                _id: inactiveUser._id.toString(),
                baseUrl
            });
            return res.redirect('/auth/login.rf');
        }
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
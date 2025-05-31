import connectDB from "@/lib/database";
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from 'next';
import generate from 'generate-password';
import bcrypt from "bcryptjs";
import emailjs from '@emailjs/browser';

emailjs.init(process.env.PUBLIC_KEY!);

const sendEmail = async (user: any) => {
    const expiry = new Date(user.verificationTokenExpiry);
    const formattedExpiry = `${expiry.getHours().toString().padStart(2, '0')}:${expiry.getMinutes().toString().padStart(2, '0')}:${expiry.getSeconds().toString().padStart(2, '0')}-${expiry.getDate().toString().padStart(2, '0')}:${(expiry.getMonth() + 1).toString().padStart(2, '0')}:${expiry.getFullYear()}`;
    const templateParams = {
        to_email: user.email,
        to_name: user.name,
        subject: "Account Verification",
        message: `Hello ${user.name}, your account was created successfully. You need to verify your account using this link: http://localhost:3000/verify/u/${user.verificationToken}. This link will expire on: ${formattedExpiry}.`
    };
    try {
        const result = await emailjs.send('service_tdmc8o6', 'template_15fyf7p', templateParams);
        console.log('Email sent successfully:', result);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectDB();
        const { fullName, email, dateOfBirth } = await req.body;
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
            symbols: true,
            uppercase: true,
            lowercase: true
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
            sendEmail(newUser);
            return res.status(201).json({ message: "User registered successfully", userId: newUser._id });
        } else {
            inactiveUser.name = fullName;
            inactiveUser.password = hashedPassword;
            inactiveUser.dateOfBirth = dob;
            inactiveUser.handle = handle;
            inactiveUser.verificationToken = verificationToken;
            inactiveUser.verificationTokenExpiry = verificationTokenExpiry;
            await inactiveUser.save();
            sendEmail(inactiveUser);
            return res.status(201).json({ message: "User registered successfully", userId: inactiveUser._id });
        }
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
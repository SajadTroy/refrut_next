'use server';
import connectDB from "@/lib/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import generate from 'generate-password';
import { sendEmailSignup } from "@/lib/sendEmail";
import { cookies } from 'next/headers';

export type LoginResState = {
    email?: string;
    password?: string;
    general?: string;
    success?: boolean;
    userId?: string;
};

export async function loginUser(email: string, password: string): Promise<LoginResState | undefined> {
    try {
        await connectDB();
        const cookieStore = await cookies();

        if (!email || !password) {
            return ({ email: "Email required", password: "Password required" });
        }
        const user = await User.findOne({ email, status: "active", isVerified: true });
        const bannedUser = await User.findOne({ email, status: "banned" });
        if (bannedUser) {
            return ({ email: "User is banned" });
        }
        if (!user) {
            return ({ email: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return ({ password: "Invalid password"});
        }
        // Optionally, update last login time
        user.lastLogin = new Date();
        await user.save();

        // const token = await jwt.sign({
        //     userId: user._id,
        //     email: user.email
        // }, secret);

        // cookieStore.set('token', token, { secure: isProd });

        return ({ success: true, userId: user._id.toString() });
    } catch (error) {
        console.error("Login error:", error);
        return ({ general: "Internal server error" });
    }
}

export async function signupUser(fullName: string, email: string, dateOfBirth: string) {
    try {
        await connectDB();
        const cookieStore = await cookies();

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
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
            lowercase: true,
            symbols: false
        });
        console.log("Generated verification token:", verificationToken);

        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
        console.log("Verification token expiry:", verificationTokenExpiry);

        if (!fullName) {
            return ({ error: "Full name is required" });
        }
        if (!email) {
            return ({ error: "Email is required" });
        }
        if (!dateOfBirth) {
            return ({ error: "Date of birth is required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return ({ error: "Invalid email format" });
        }

        const dateOfBirthRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateOfBirthRegex.test(dateOfBirth)) {
            return ({ error: "Invalid date of birth format" });
        }

        const [day, month, year] = dateOfBirth.split('/').map(Number);
        const dob = new Date(year, month - 1, day);
        if (isNaN(dob.getTime())) {
            return ({ error: "Invalid date of birth" });
        }
        console.log("Parsed date of birth:", day, month, year);

        const bannedUser = await User.findOne({ email, status: "banned" });
        if (bannedUser) {
            return ({ error: "User is banned" });
        }

        const user = await User.findOne({ email, status: "active", isVerified: true });
        if (user) {
            return ({ error: "User already exists" });
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
            await sendEmailSignup({
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

            return ({
                error: null, message: 'Signup successful! Please check your email to verify your account.'
            });
        } else {
            inactiveUser.name = fullName;
            inactiveUser.password = hashedPassword;
            inactiveUser.dateOfBirth = dob;
            inactiveUser.handle = handle;
            inactiveUser.verificationToken = verificationToken;
            inactiveUser.verificationTokenExpiry = verificationTokenExpiry;
            await inactiveUser.save();
            await sendEmailSignup({
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

            return ({
                error: null, message: 'Signup successful! Please check your email to verify your account.'
            });
        }
    } catch (error) {
        console.error("Signup error:", error);
        return ({ error: "Internal server error" });
    }
}

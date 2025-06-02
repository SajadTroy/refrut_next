'use server';
import connectDB from "@/lib/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import generate from 'generate-password';
import { sendEmailSignup } from "@/lib/sendEmail";

export type LoginResState = {
    email?: string;
    password?: string;
    general?: string;
    success?: boolean;
    userId?: string;
};

export type SignupResState = {
    fullName?: string;
    email?: string;
    dateOfBirth?: string;
    general?: string;
    success?: boolean;
};

export async function loginUser(email: string, password: string): Promise<LoginResState | undefined> {
    try {
        await connectDB();

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
            return ({ password: "Invalid password" });
        }

        // Optionally, update last login time
        user.lastLogin = new Date();
        await user.save();

        return ({ success: true, userId: user._id.toString() });
    } catch (error) {
        console.error("Login error:", error);
        return ({ general: "Internal server error" });
    }
}

export async function signupUser(
    fullName: string,
    email: string,
    dateOfBirth: string
): Promise<SignupResState> {
    try {
        await connectDB();

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const password = generate.generate({
            length: 10,
            numbers: true,
            symbols: true,
            uppercase: true,
            lowercase: true,
        });

        const verificationToken = generate.generate({
            length: 32,
            numbers: true,
            uppercase: true,
            lowercase: true,
            symbols: false,
        });

        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

        if (!fullName) {
            return { fullName: 'Full name is required' };
        }
        if (!email) {
            return { email: 'Email is required' };
        }
        if (!dateOfBirth) {
            return { dateOfBirth: 'Date of birth is required' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { email: 'Invalid email format' };
        }

        const dateOfBirthRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateOfBirthRegex.test(dateOfBirth)) {
            return { dateOfBirth: 'Invalid date of birth format' };
        }

        const [day, month, year] = dateOfBirth.split('/').map(Number);
        const dob = new Date(year, month - 1, day);
        if (isNaN(dob.getTime())) {
            return { dateOfBirth: 'Invalid date of birth' };
        }

        const bannedUser = await User.findOne({ email, status: 'banned' });
        if (bannedUser) {
            return { email: 'User is banned' };
        }

        const user = await User.findOne({ email, status: 'active', isVerified: true });
        if (user) {
            return { email: 'User already exists' };
        }

        const inactiveUser = await User.findOne({ email, status: 'inactive', isVerified: false });
        const handle = email.split('@')[0] + generate.generate({
            length: 4,
            numbers: true,
            symbols: false,
            uppercase: false,
            lowercase: false,
        });

        const hashedPassword = await bcrypt.hash(password, 10);
        if (!inactiveUser) {
            const newUser = new User({
                name: fullName,
                email,
                password: hashedPassword,
                dateOfBirth: dob,
                handle,
                verificationToken,
                verificationTokenExpiry,
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
                baseUrl,
            });

            return { success: true };
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
                baseUrl,
            });

            return { success: true };
        }
    } catch (error) {
        console.error('Signup error:', error);
        return { general: 'Internal server error' };
    }
}
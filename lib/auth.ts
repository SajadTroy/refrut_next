'use server';

import connectDB from '@/lib/database';
import { User } from "@/models";
import bcrypt from 'bcryptjs';
import generate from 'generate-password';
import sendEmail from '@/lib/sendEmail';
import { UAParser } from 'ua-parser-js';
import fetch from 'node-fetch';

interface IpApiResponse {
    latitude?: number;
    longitude?: number;
    country_name?: string;
    region?: string;
    org?: string;
    error?: boolean;
    reason?: string;
}

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

export type PasswordResetState = {
    email?: string;
    general?: string;
    success?: boolean;
};

export type ResetPasswordState = {
    password?: string;
    confirmPassword?: string;
    token?: string;
    general?: string;
    success?: boolean;
};

async function getLocationData(ip: string): Promise<{
    latitude?: number;
    longitude?: number;
    country?: string;
    region?: string;
    isp?: string;
}> {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        if (!response.ok) {
            throw new Error('Failed to fetch location data');
        }
        const data = (await response.json()) as IpApiResponse;
        return {
            latitude: data.latitude,
            longitude: data.longitude,
            country: data.country_name,
            region: data.region,
            isp: data.org,
        };
    } catch (error) {
        console.error('Error fetching location data:', error);
        return {};
    }
}

async function getDeviceData(userAgent: string): Promise<{
    device?: string;
    browser?: string;
}> {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    return {
        device: result.device.model || result.os.name || 'Unknown',
        browser: result.browser.name || 'Unknown',
    };
}

export async function loginUser(
    email: string,
    password: string,
    ip: string,
    userAgent: string
): Promise<LoginResState> {
    try {
        await connectDB();

        if (!email || !password) {
            return { email: 'Email required', password: 'Password required' };
        }

        const user = await User.findOne({ email, status: 'active', isVerified: true });
        const bannedUser = await User.findOne({ email, status: 'banned' });

        if (bannedUser) {
            return { email: 'User is banned' };
        }
        if (!user) {
            return { email: 'User not found' };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { password: 'Invalid password' };
        }

        const loginTime = new Date();
        const locationData = await getLocationData(ip);
        const deviceData = await getDeviceData(userAgent);

        const loginDetails = {
            ip,
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            country: locationData.country,
            region: locationData.region,
            isp: locationData.isp,
            device: deviceData.device,
            browser: deviceData.browser,
            timestamp: loginTime,
        };

        // Check if this is a new login
        const isNewLogin = !user.recentLogins.some(
            (login: any) =>
                login.ip === ip &&
                login.device === deviceData.device &&
                login.browser === deviceData.browser &&
                login.country === locationData.country
        );

        // Update recent logins (limit to 5)
        user.recentLogins.unshift(loginDetails);
        if (user.recentLogins.length > 5) {
            user.recentLogins = user.recentLogins.slice(0, 5);
        }

        user.lastLogin = loginTime;
        await user.save();

        // Send new login notification if it's a new login
        if (isNewLogin) {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            await sendEmail(
                {
                    name: user.name,
                    email: user.email,
                    handle: user.handle,
                    _id: user._id.toString(),
                    baseUrl,
                    ip,
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                    country: locationData.country,
                    region: locationData.region,
                    isp: locationData.isp,
                    device: deviceData.device,
                    browser: deviceData.browser,
                    loginTime,
                },
                'new-login'
            );
        }

        return { success: true, userId: user._id.toString() };
    } catch (error) {
        console.error('Login error:', error);
        return { general: 'Internal server error' };
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
            await sendEmail({
                name: fullName,
                email,
                token: verificationToken,
                tokenExpiry: verificationTokenExpiry,
                dateOfBirth: dob,
                handle,
                _id: newUser._id.toString(),
                baseUrl,
            }, 'signup');

            return { success: true };
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
                token: verificationToken,
                tokenExpiry: verificationTokenExpiry,
                dateOfBirth: dob,
                handle,
                _id: inactiveUser._id.toString(),
                baseUrl,
            }, 'signup');

            return { success: true };
        }
    } catch (error) {
        console.error('Signup error:', error);
        return { general: 'Internal server error' };
    }
}

export async function requestPasswordReset(email: string): Promise<PasswordResetState> {
    try {
        await connectDB();

        if (!email) {
            return { email: 'Email is required' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { email: 'Invalid email format' };
        }

        const user = await User.findOne({ email, status: 'active', isVerified: true });
        if (!user) {
            return { email: 'User not found' };
        }

        const bannedUser = await User.findOne({ email, status: 'banned' });
        if (bannedUser) {
            return { email: 'User is banned' };
        }

        const resetPasswordToken = generate.generate({
            length: 32,
            numbers: true,
            symbols: false,
            uppercase: true,
            lowercase: true,
        });

        const resetPasswordTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordTokenExpiry = resetPasswordTokenExpiry;
        await user.save();

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        await sendEmail(
            {
                name: user.name,
                email: user.email,
                token: resetPasswordToken,
                tokenExpiry: resetPasswordTokenExpiry,
                _id: user._id.toString(),
                baseUrl,
            },
            'password-reset'
        );

        return { success: true };
    } catch (error) {
        console.error('Password reset error:', error);
        return { general: 'Internal server error' };
    }
}

export async function resetPassword(
    resetToken: string,
    password: string
): Promise<ResetPasswordState> {
    try {
        await connectDB();

        if (!resetToken) {
            return { token: 'Invalid reset token' };
        }
        if (!password) {
            return { password: 'Password is required' };
        }
        if (password.length < 8) {
            return { password: 'Password must be at least 8 characters long' };
        }

        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordTokenExpiry: { $gt: new Date() },
            isVerified: true,
            status: 'active',
        });

        if (!user) {
            return { token: 'Reset token not found or expired' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordTokenExpiry = null;
        await user.save();

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        await sendEmail(
            {
                name: user.name,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                handle: user.handle,
                _id: user._id.toString(),
                baseUrl,
            },
            'password-reset-confirmation'
        );

        return { success: true };
    } catch (error) {
        console.error('Password reset error:', error);
        return { general: 'Internal server error' };
    }
}
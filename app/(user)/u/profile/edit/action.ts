'use server';

import { verifySession } from '@/lib/session';
import connectDB from '@/lib/database';
import { User } from '@/models';
import mongoose from 'mongoose';

export interface UpdateProfileFormState {
    errors?: {
        name?: string;
        handle?: string;
        dateOfBirth?: string;
        bio?: string;
        general?: string;
        email?: string;
    };
    success?: boolean;
}

export async function getUSer(userId: String) {
    try {
        const user = await User.findById(userId).select('-password -verificationToken -resetPasswordToken');

        return {
            user: {
                name: user.name,
                handle: user.handle,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                bio: user.bio
            }
        }
    } catch (error) {

    }
}

export async function updateProfile(
    state: UpdateProfileFormState,
    formData: FormData
): Promise<UpdateProfileFormState> {
    // Verify the user is authenticated
    const session = await verifySession();
    if (!session.userId) {
        return { errors: { general: 'You must be logged in to update your profile.' } };
    }

    // Extract and validate form data
    const name = formData.get('name')?.toString().trim();
    const handle = formData.get('handle')?.toString().trim();
    const dateOfBirth = formData.get('dateOfBirth')?.toString().trim();
    const bio = formData.get('bio')?.toString().trim();

    const errors: UpdateProfileFormState['errors'] = {};

    if (!name || name.length < 2) {
        errors.name = 'Name must be at least 2 characters long.';
    }
    if (!handle || handle.length < 3) {
        errors.handle = 'Username must be at least 3 characters long.';
    }
    if (dateOfBirth && !/^\d{2}\/\d{2}\/\d{4}$/.test(dateOfBirth)) {
        errors.dateOfBirth = 'Date of birth must be in MM/DD/YYYY format.';
    }
    if (bio && bio.length > 160) {
        errors.bio = 'Bio cannot exceed 160 characters.';
    }

    // Check for duplicate handle
    try {
        await connectDB();
        const existingUser = await User.findOne({ handle, _id: { $ne: session.userId } });
        if (existingUser) {
            errors.handle = 'This username is already taken.';
        }
    } catch (error) {
        console.error('Error checking handle:', error);
        return { errors: { general: 'An error occurred while checking the username.' } };
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    try {
        // Connect to the database
        await connectDB();

        // Parse dateOfBirth to Date object if provided
        let parsedDateOfBirth = null;
        if (dateOfBirth) {
            const [month, day, year] = dateOfBirth.split('/').map(Number);
            parsedDateOfBirth = new Date(year, month - 1, day);
            if (isNaN(parsedDateOfBirth.getTime())) {
                return { errors: { dateOfBirth: 'Invalid date of birth.' } };
            }
        }

        // Update the user
        const updatedUser = await User.findByIdAndUpdate(
            session.userId,
            {
                name,
                handle,
                dateOfBirth: parsedDateOfBirth,
                bio,
                updatedAt: new Date(),
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return { errors: { general: 'Failed to update profile.' } };
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating profile:', error);
        return { errors: { general: 'An error occurred while updating the profile.' } };
    }
}
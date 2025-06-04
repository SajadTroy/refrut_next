// components/EditProfile.tsx
'use client';

import { useState, useEffect, useActionState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getUSer, updateProfile, UpdateProfileFormState } from '@/app/(user)/u/profile/edit/action';
import '@/styles/EditProfile.css';

// Define interface for the user data returned by getUSer
interface ProfileUser {
  name: string;
  email: string;
  handle: string;
  bio?: string; // bio can be undefined based on getUSer
  dateOfBirth?: string | Date; // Allow Date or string
}

type EditProfileProps = {
  userId: string;
  initialUser: ProfileUser | null;
};

export default function EditProfile({ userId, initialUser }: EditProfileProps) {
  const [state, action, isPending] = useActionState<UpdateProfileFormState, FormData>(updateProfile, {
    errors: {},
  });
  const [user, setUser] = useState<ProfileUser | null>(initialUser);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const router = useRouter();

  // Fetch user data only if initialUser is not provided (fallback)
  useEffect(() => {
    if (!initialUser) {
      async function fetchUser() {
        try {
          const response = await getUSer(userId);
          if (response?.user) {
            setUser(response.user);
            if (response.user.dateOfBirth) {
              const dob = new Date(response.user.dateOfBirth);
              const day = String(dob.getDate()).padStart(2, '0');
              const month = String(dob.getMonth() + 1).padStart(2, '0');
              const year = dob.getFullYear();
              setDateOfBirth(`${day}/${month}/${year}`);
            }
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
      fetchUser();
    } else if (initialUser?.dateOfBirth) {
      const dob = new Date(initialUser.dateOfBirth);
      const day = String(dob.getDate()).padStart(2, '0');
      const month = String(dob.getMonth() + 1).padStart(2, '0');
      const year = dob.getFullYear();
      setDateOfBirth(`${day}/${month}/${year}`);
    }
  }, [userId, initialUser]);

  // Handle auto-slash formatting for DOB
  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5);
    if (value.length > 10) value = value.slice(0, 10); // Limit to DD/MM/YYYY
    setDateOfBirth(value);
  };

  // Redirect on successful update
  useEffect(() => {
    if (state?.success) {
      router.push('/u/profile');
    }
  }, [state, router]);

  // Animation variants
  const formVariants = {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const inputVariants = {
    initial: { opacity: 1, x: 0 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.1 } },
    hover: { scale: 1 },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1 },
    tap: { scale: 1 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="login_container"
        variants={formVariants}
        initial="initial"
        animate="animate"
      >
        <motion.form action={action} name="form">
          {/* Row 1: Name and Email */}
          <motion.div className="form_row" variants={inputVariants} initial="initial" animate="animate">
            {/* Name */}
            <motion.div className="form_group" variants={inputVariants} whileHover="hover">
              <label htmlFor="name">
                Full Name<span className="red">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                defaultValue={user?.name || ''}
                required
              />
              <div className="form_text error">
                {state?.errors?.name && (
                  <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.name}</p>
                )}
              </div>
            </motion.div>
            {/* Email (Disabled) */}
            <motion.div className="form_group" variants={inputVariants} whileHover="hover">
              <label htmlFor="email">
                Email<span className="red">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                defaultValue={user?.email || ''}
                disabled
                required
              />
              <div className="form_text error">
                {state?.errors?.email && (
                  <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.email}</p>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Row 2: Handle and Date of Birth */}
          <motion.div className="form_row" variants={inputVariants} initial="initial" animate="animate">
            {/* Username (Handle) */}
            <motion.div className="form_group" variants={inputVariants} whileHover="hover">
              <label htmlFor="handle">
                Username<span className="red">*</span>
              </label>
              <input
                type="text"
                id="handle"
                name="handle"
                placeholder="Enter your username"
                defaultValue={user?.handle || ''}
                required
              />
              <div className="form_text error">
                {state?.errors?.handle && (
                  <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.handle}</p>
                )}
              </div>
            </motion.div>
            {/* Date of Birth */}
            <motion.div className="form_group" variants={inputVariants} whileHover="hover">
              <label htmlFor="dateOfBirth">
                Date of Birth (DD/MM/YYYY)
              </label>
              <input
                type="text"
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="DD/MM/YYYY"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
                maxLength={10}
              />
              <div className="form_text error">
                {state?.errors?.dateOfBirth && (
                  <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.dateOfBirth}</p>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Bio */}
          <motion.div className="form_group" variants={inputVariants} initial="initial" animate="animate" whileHover="hover">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself"
              defaultValue={user?.bio || ''}
              maxLength={160}
              className="form_textarea"
            />
            <div className="form_text error">
              {state?.errors?.bio && (
                <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.bio}</p>
              )}
            </div>
          </motion.div>

          {/* General Error */}
          <div className="form_text error">
            {state?.errors?.general && (
              <p style={{ color: 'red', fontSize: '14px' }}>{state.errors.general}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.div
            className="form_group"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <button type="submit" className="btn btn_primary" disabled={isPending}>
              {isPending ? 'Updating...' : 'Update'}
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}
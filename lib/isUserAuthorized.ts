// lib/auth.ts
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';
import User from '@/models/User';

export interface ClientUser {
  _id: string;
  name: string;
  email: string;
  handle: string;
  bio: string;
  profilePicture: string;
  dateOfBirth: string | null;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  lastLogin: string | null;
  roles: string[]; // e.g., ['user', 'admin']
  status: 'active' | 'inactive' | 'banned';
  socialLinks: {
    x: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    github: string;
  };
}

const secret = process.env.JWT_SECRET || 'bakabaka';

export function withUser(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token' });
    }

    try {
      const decoded = await jwt.verify(token, secret) as { userId: string };
      if (!decoded) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
      if (!decoded.userId) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
      const user = await User.findById(decoded.userId).select('-password  -verificationToken -verificationTokenExpires -__v -passwordResetToken -passwordResetExpires');
      if (!user) {
        return res.status(403).json({ error: 'Forbidden: User not found' });
      }
      if (user.status === 'banned') {
        return res.status(403).json({ error: 'Forbidden: User is banned' });
      }
      if (user.status === 'inactive') {
        return res.status(403).json({ error: 'Forbidden: User not found' });
      }
      // Attach user to request object
      (req as any).user = user as ClientUser;

      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
  };
}

import connectDB from "@/lib/database";
import type { NextApiRequest, NextApiResponse } from 'next';
import { withUser } from "@/lib/isUserAuthorized";

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

export default withUser(async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method not allowed" });
        }
        await connectDB();
        const user = (req as any).user as ClientUser;

        return res.status(200).json({ user });
    } catch (error) {
        console.error("Verification error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
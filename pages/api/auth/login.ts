import connectDB from "@/lib/database";
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'bakabaka';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    const isProd = process.env.NODE_ENV === 'production';
    await connectDB();
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await User.findOne({ email, status: "active", isVerified: true });
    const bannedUser = await User.findOne({ email, status: "banned" });
    if (bannedUser) {
      return res.status(403).json({ error: "User is banned" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    // Optionally, update last login time
    user.lastLogin = new Date();
    await user.save();

    const token = await jwt.sign({
      userId: user._id,
      email: user.email
    }, secret);

    res.setHeader('Cache-Control', 'public, max-age=7776000, immutable');

    res.setHeader(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; ${isProd ? 'Secure;' : ''} SameSite=Strict; Max-Age=7776000`
    );

    return res.redirect(302, `/u/profile`);
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
} 
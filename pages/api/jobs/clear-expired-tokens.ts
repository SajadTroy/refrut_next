// /pages/api/jobs/clear-expired-tokens.ts

import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/database";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();

    const now = new Date();

    const result = await User.updateMany(
      {
        $or: [
          { verificationTokenExpiry: { $lt: now } },
          { resetPasswordTokenExpiry: { $lt: now } },
        ]
      },
      {
        $set: {
          verificationToken: null,
          verificationTokenExpiry: null,
          resetPasswordToken: null,
          resetPasswordTokenExpiry: null,
        }
      }
    );

    return res.status(200).json({
      message: "Expired tokens cleared.",
      matched: result.matchedCount,
      modified: result.modifiedCount
    });

  } catch (error) {
    console.error("Token cleanup error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

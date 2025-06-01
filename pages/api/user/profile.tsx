import connectDB from "@/lib/database";
import type { NextApiRequest, NextApiResponse } from 'next';
import { withUser } from "@/lib/isUserAuthorized";

export default withUser(async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method not allowed" });
        }
        await connectDB();
        const user = (req as any).user;

        return res.status(200).json({ user });
    } catch (error) {
        console.error("Verification error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
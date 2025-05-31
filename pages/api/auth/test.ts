import type { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Simulate a test response
    const testResponse = {
      message: "This is a test endpoint",
      status: "success"
    };

    return res.status(200).json(testResponse);
  } catch (error) {
    console.error("Test endpoint error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
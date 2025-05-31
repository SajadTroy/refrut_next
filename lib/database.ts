import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: Error) {
    if (error instanceof TypeError) {
           console.error("Network error:", error.message);
       } else if (error instanceof Error) {
           console.error("An error occurred:", error.message);
       } else {
           console.error("An unexpected error occurred:", error);
       }
    process.exit(1);
  }
};

export default connectDB;

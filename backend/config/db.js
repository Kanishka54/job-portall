// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ MONGODB_URI is not defined in environment variables.");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Fail faster if cannot connect
      socketTimeoutMS: 45000,         // Keep socket open for longer operations
    });

    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error("Reason:", error.message);
    console.error(
      "⚠ Possible causes:\n" +
      "  1. IP not whitelisted in MongoDB Atlas.\n" +
      "  2. Incorrect MONGODB_URI or credentials.\n" +
      "  3. Network/firewall restrictions."
    );
    process.exit(1);
  }
};

export default connectDB;

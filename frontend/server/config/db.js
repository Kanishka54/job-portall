import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/frontend`);
    console.log("✅ Database Connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Optional: stop the server if DB fails
  }
};

export default connectDB;

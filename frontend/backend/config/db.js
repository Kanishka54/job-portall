import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Just use the URI directly (database name already included)
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
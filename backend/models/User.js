import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    unique: true,
    sparse: true // Allows null/undefined values, only enforces uniqueness when present
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      // Password is only required if clerkId is not present (manual signup)
      return !this.clerkId;
    },
    minlength: [6, "Password must be at least 6 characters"]
  },
  resume: {
    type: String,
    default: "" // Optional field
  },
  image: {
    type: String,
    required: [true, "Profile image is required"]
  },
  authProvider: {
    type: String,
    enum: ['clerk', 'manual'],
    default: function() {
      return this.clerkId ? 'clerk' : 'manual';
    }
  }
}, { timestamps: true });

// Index for better performance
userSchema.index({ clerkId: 1 });
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);
export default User;
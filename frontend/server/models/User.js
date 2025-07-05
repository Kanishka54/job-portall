import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String }, // optional, no `required: true`
  image: { type: String, required: true }
});

// Corrected model name and schema reference
const User = mongoose.model('User', userSchema);

export default User;

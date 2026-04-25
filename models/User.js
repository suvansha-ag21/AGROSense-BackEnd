import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
  userId: String,
  password: String,

  // ✅ NEW FARM DETAILS
  farmName: String,
  location: String,
  cropType: String,
  landSize: Number
});

export default mongoose.model("User", userSchema);

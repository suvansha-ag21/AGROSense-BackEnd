import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  userId: String, // "ALL" or specific farmer
  message: String,
  type: String, // weather / soil / admin
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Alert", alertSchema);
import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  userId: String,
  password: String,

  farmName: String,
  location: String,
  cropType: String,
  landSize: Number
});

export default mongoose.model("Farmer", farmerSchema);
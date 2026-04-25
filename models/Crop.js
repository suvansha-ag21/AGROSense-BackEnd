import mongoose from 'mongoose';
const CropSchema = new mongoose.Schema({
  userId: String,   // ✅ IMPORTANT
  name: String,
  idealMoisture: Number,
  idealTemp: Number
});
export default mongoose.model("Crop", CropSchema);
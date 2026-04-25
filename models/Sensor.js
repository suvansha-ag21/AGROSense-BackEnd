import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  userId: String,
  temperature: Number,
  humidity: Number,
  soilMoisture: Number,
  phLevel: Number,
  rainStatus: String,
  location: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Sensor", sensorSchema);
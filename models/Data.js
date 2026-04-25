import mongoose from "mongoose";

const schema = new mongoose.Schema({
  farmerId:String,
  temperature:Number,
  humidity:Number,
  soilMoisture:Number,
  date:{type:Date,default:Date.now}
});

export default mongoose.model("Data",schema);
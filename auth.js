import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

import Farmer from "../models/Farmer.js";
const router = express.Router();



router.post("/register", async (req, res) => {
  try {
    const { userId, password, farmName, location, cropType, landSize } = req.body;

    if (!userId || !password) {
      return res.status(400).json({ success:false, message: "Required fields missing" });
    }
      if(!password || password.length < 6){
    return res.status(400).json({
      success:false,
      message:"Password must be at least 6 characters"
    });
  }
    const existing = await Farmer.findOne({ userId });
    if (existing) {
      return res.status(400).json({ success:false, message: "Farmer exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const farmer = new Farmer({
      userId,
      password: hashed,
      farmName,
      location,
      cropType,
      landSize
    });

    await farmer.save();

    // ✅ CREATE INITIAL SENSOR DATA
    await Sensor.create({
      userId,
      temperature: 30,
      humidity: 50,
      soilMoisture: 40,
      timestamp: new Date()
    });

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success:false });
  }
});
router.post("/login", async (req, res) => {

  console.log("BODY:", req.body);

  const { email, userId, password } = req.body;

  if(!email && !userId){
    return res.status(400).json({ message: "Email or UserId required" });
  }

  if(!password){
    return res.status(400).json({ message: "Password required" });
  }

  try {

    // ADMIN LOGIN
    if(email){
      const admin = await Admin.findOne({ email });

      if(admin && admin.password === password){
        return res.json({
          success: true,
          role: "admin",
          token: "admin-token"
        });
      }
    }

    // FARMER LOGIN
// FARMER LOGIN
if(userId){
  const farmer = await Farmer.findOne({ userId });

  if(!farmer){
    return res.status(401).json({ message: "Farmer not found" });
  }

  const isMatch = await bcrypt.compare(password, farmer.password);

  if(isMatch){
    return res.json({
      success: true,
      role: "farmer",
      userId
    });
  }else{
    return res.status(401).json({ message: "Wrong password" });
  }
}

    res.status(401).json({ success:false });

  } catch(err){
    console.log(err);
    res.status(500).json({ message:"Server error" });
  }
});



import Sensor from "../models/Sensor.js";

router.post("/create-farmer", async (req, res) => {
  try {
    const { userId, password, farmName, location, cropType, landSize } = req.body;

    if(!userId || !password){
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existing = await Farmer.findOne({ userId });
    if(existing){
      return res.status(400).json({ message: "Farmer exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const farmer = new Farmer({
      userId,
      password: hashed,
      farmName,
      location,
      cropType,
      landSize
    });

    await farmer.save();

    // ✅ ADD DEFAULT SENSOR DATA
    await Sensor.create({
      userId,
      temperature: Math.floor(Math.random()*10)+25,
      humidity: Math.floor(Math.random()*40)+40,
      soilMoisture: Math.floor(Math.random()*50)+20,
      timestamp: new Date()
    });

    res.json({ success: true });

  } catch(err){
    console.log(err);
    res.status(500).json({ message:"Error" });
  }
});
router.put("/update-farmer/:id", async (req, res) => {
  try{
    const updated = await Farmer.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      { new: true }
    );

    res.json({ success:true, updated });

  }catch(err){
    res.status(500).json({ error:"Update failed" });
  }
});
router.delete("/delete-farmer/:id", async (req, res) => {
  try{

    await Farmer.deleteOne({ userId: req.params.id });
    await Sensor.deleteMany({ userId: req.params.id });

    res.json({ success:true });

  }catch(err){
    res.status(500).json({ error:"Delete failed" });
  }
});
export default router;

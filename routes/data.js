import express from "express";
import Sensor from "../models/Sensor.js";
import Farmer from "../models/Farmer.js";
import Crop from "../models/Crop.js";

const router = express.Router();

// ✅ 1. FARMER PROFILE
router.get("/farmer/:userId", async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ userId: req.params.userId });

    if (!farmer) {
      return res.status(404).json({ error: "Farmer not found" });
    }

    res.json(farmer);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ 2. UPDATE FARMER
router.put("/farmer/:userId", async (req, res) => {
  try {
    console.log("👉 UPDATE HIT");
    console.log("PARAM:", req.params.userId);
    console.log("BODY:", req.body);

    const updated = await Farmer.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true },
    );

    console.log("UPDATED:", updated);

    res.json({ success: true });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

// ✅ 3. ALL FARMERS (MAIN FIXED ROUTE)
router.get("/all", async (req, res) => {
  try {
    const users = await Farmer.find();

    const sensors = await Sensor.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$userId",
          temperature: { $first: "$temperature" },
          humidity: { $first: "$humidity" },
          soilMoisture: { $first: "$soilMoisture" },
        },
      },
    ]);

    const result = [];

    for (const u of users) {
      const sensor = sensors.find((s) => String(s._id) === String(u.userId));

      const crops = await Crop.find({ userId: u.userId });

      result.push({
        userId: u.userId,
        farmName: u.farmName,
        location: u.location,
        landSize: u.landSize,
        crops: crops.map((c) => c.name),

        temperature: sensor?.temperature || 0,
        humidity: sensor?.humidity || 0,
        soilMoisture: sensor?.soilMoisture || 0,
      });
    }

    console.log("FINAL RESULT:", result);

    res.json(result);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ 4. SENSOR DATA BY USER
router.get("/:userId", async (req, res) => {
  try {
    const data = await Sensor.find({ userId: req.params.userId }).sort({
      timestamp: -1,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

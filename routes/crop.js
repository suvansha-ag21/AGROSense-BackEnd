import express from "express";
import Crop from "../models/Crop.js";

const router = express.Router();


// ✅ GET crops of a specific farmer
router.get("/:userId", async (req, res) => {
  try {
    const crops = await Crop.find({ userId: req.params.userId });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch crops" });
  }
});


// ✅ ADD crop (linked to farmer)
router.post("/", async (req, res) => {
  try {
    const { userId, name, idealMoisture, idealTemp } = req.body;

    if (!userId || !name) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const crop = new Crop({
      userId,
      name,
      idealMoisture,
      idealTemp
    });

    await crop.save();

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Add failed" });
  }
});


// ✅ GET single crop (for edit)
router.get("/single/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ error: "Crop not found" });
    }

    res.json(crop);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ UPDATE crop
router.put("/:id", async (req, res) => {
  try {
    await Crop.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});


// ✅ DELETE crop
router.delete("/:id", async (req, res) => {
  try {
    await Crop.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
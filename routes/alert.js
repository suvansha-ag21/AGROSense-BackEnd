import express from "express";
import Alert from "../models/Alert.js";

const router = express.Router();

// 🔴 CREATE ALERT (ADMIN)
router.post("/create", async (req, res) => {
  try{
    const { userId, message, type } = req.body;

    const alert = new Alert({
      userId: userId || "ALL",
      message,
      type
    });

    await alert.save();

    res.json({ success:true });

  }catch(err){
    res.status(500).json({ error:"Alert failed" });
  }
});

// 🟢 GET ALERTS FOR FARMER
router.get("/:userId", async (req, res) => {
  try{
    const alerts = await Alert.find({
      $or: [
        { userId: req.params.userId },
        { userId: "ALL" }
      ]
    }).sort({ createdAt:-1 });

    res.json(alerts);

  }catch(err){
    res.status(500).json({ error:"Fetch failed" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Alert.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success:false, error:"Alert not found" });
    }

    res.json({ success:true });

  } catch (err) {
    console.log("Delete Alert Error:", err);
    res.status(500).json({ success:false, error:"Server error" });
  }
});
export default router;
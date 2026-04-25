import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/:city", async (req, res) => {
  try{
    const key = process.env.WEATHER_API_KEY;
    const city = req.params.city || "Delhi";

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`
    );

    console.log("✅ Weather API working");
    res.json(response.data);

  }catch(err){
    console.log("❌ WEATHER ERROR:", err.response?.data || err.message);

    res.status(500).json({
      error: err.response?.data || err.message
    });
  }
});

export default router;
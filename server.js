import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";
import voiceRoutes from "./routes/voice.js";
import weatherRoutes from "./routes/weather.js";

dotenv.config();

const app = express();

// ✅ IMPORTANT MIDDLEWARE (ORDER MATTERS)
app.use(cors());
app.use(express.json()); // MUST be before routes

// ✅ DEBUG REQUESTS (very useful)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
import cropRoutes from "./routes/crop.js";

app.use("/api/crops", cropRoutes);
// ✅ DB CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("✅ DB Connected"))
.catch(err=>console.log("❌ DB Error:", err));

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/voice", voiceRoutes);
app.use("/api/weather", weatherRoutes);
import alertRoutes from "./routes/alert.js";

app.use("/api/alerts", alertRoutes);
// ✅ TEST ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Server Working ✅");
});

// ✅ START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on port ${PORT}`);
});
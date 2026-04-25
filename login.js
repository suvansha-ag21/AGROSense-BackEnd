import Admin from "../models/Admin.js";
import Sensor from "../models/Sensor.js";

router.post("/login", async (req, res) => {

  console.log("BODY:", req.body);

  const { email, userId, password } = req.body;

  // ❌ prevent empty request
  if(!email && !userId){
    return res.status(400).json({ message: "Email or UserId required" });
  }

  if(!password){
    return res.status(400).json({ message: "Password required" });
  }

  try {

    // 🔴 ADMIN
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

    // 🟢 FARMER
    if(userId){
      const farmer = await Sensor.findOne({ userId });

      if(farmer){
        return res.json({
          success: true,
          role: "farmer",
          userId
        });
      }
    }

    res.status(401).json({ success:false });

  } catch(err){
    console.log(err);
    res.status(500).json({ message:"Server error" });
  }
});
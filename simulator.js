import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// connect DB
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("✅ DB Connected for Simulator"))
.catch(err=>console.log(err));

const users = ["F001","F002","F003","F004"];

// wait for DB then start simulation
mongoose.connection.once("open", () => {

  setInterval(async ()=>{

    const userId = users[Math.floor(Math.random()*users.length)];

    try{
      await mongoose.connection.collection("sensors").insertOne({
        userId,
        temperature: Math.floor(Math.random()*15)+25,
        humidity: Math.floor(Math.random()*50)+20,
        soilMoisture: Math.floor(Math.random()*60),
        timestamp:new Date()
      });

      console.log("📡 Live data for", userId);

    }catch(err){
      console.log(err);
    }

  },3000);

});
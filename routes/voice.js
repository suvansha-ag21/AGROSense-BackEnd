import express from "express";

const router = express.Router();

// 🌱 Data in BOTH languages
const data = [
  {
    keywords: ["water", "irrigation", "पानी"],
    reply_en: "Water crops in early morning or evening to reduce evaporation.",
    reply_hi: "फसलों को सुबह या शाम पानी दें ताकि पानी कम बर्बाद हो।"
  },
  {
    keywords: ["fertilizer", "खाद"],
    reply_en: "Use organic fertilizer like compost for better soil health.",
    reply_hi: "मिट्टी की सेहत के लिए जैविक खाद का उपयोग करें।"
  },
  {
    keywords: ["pest", "insects", "कीड़े"],
    reply_en: "Use neem oil spray to control pests naturally.",
    reply_hi: "कीड़ों को नियंत्रित करने के लिए नीम तेल का उपयोग करें।"
  },
  {
    keywords: ["summer", "गर्मी"],
    reply_en: "Best summer crops are maize, bajra, and vegetables.",
    reply_hi: "गर्मी में मक्का, बाजरा और सब्जियां उगाना बेहतर होता है।"
  },
  {
    keywords: ["rain", "बारिश"],
    reply_en: "Ensure proper drainage to avoid waterlogging.",
    reply_hi: "पानी जमा होने से बचने के लिए सही जल निकासी रखें।"
  },
  {
    keywords: ["soil", "मिट्टी"],
    reply_en: "Test soil regularly to maintain nutrients.",
    reply_hi: "मिट्टी की जांच नियमित रूप से करें।"
  },
  {
    keywords: ["wheat", "गेहूं"],
    reply_en: "Wheat grows best in cool climate with moderate irrigation.",
    reply_hi: "गेहूं ठंडे मौसम में और मध्यम पानी के साथ अच्छा उगता है।"
  },
  {
    keywords: ["rice", "धान"],
    reply_en: "Rice requires standing water and warm weather.",
    reply_hi: "धान के लिए पानी भरा रहना और गर्म मौसम जरूरी है।"
  },
  {
    keywords: ["price", "market", "कीमत"],
    reply_en: "Check mandi prices before selling your crops.",
    reply_hi: "फसल बेचने से पहले मंडी की कीमत जरूर जांचें।"
  },
  {
    keywords: ["weather", "मौसम"],
    reply_en: "Check weather before irrigation or pesticide use.",
    reply_hi: "सिंचाई या दवा डालने से पहले मौसम देखें।"
  }
];

// 🔍 Function to detect Hindi
function isHindi(text) {
  return /[\u0900-\u097F]/.test(text); // Unicode range for Hindi
}

// ✅ POST route
router.post("/", (req, res) => {
  try {
    const query = req.body.query?.toLowerCase();

    if (!query) {
      return res.status(400).json({ reply: "No query provided" });
    }

    const hindi = isHindi(query);

    let reply = hindi
      ? "माफ करें, मैं समझ नहीं पाया।"
      : "Sorry, I did not understand.";

    for (let item of data) {
      for (let key of item.keywords) {
        if (query.includes(key)) {
          reply = hindi ? item.reply_hi : item.reply_en;
          break;
        }
      }
    }

    res.json({ reply });

  } catch (err) {
    console.log("VOICE ERROR:", err);
    res.status(500).json({ reply: "Server error" });
  }
});

// ✅ GET route for testing
router.get("/", (req, res) => {
  res.send("Voice API working 🚀");
});

export default router;
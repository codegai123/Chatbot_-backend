// server.js
const express = require("express");
const fetch = require("node-fetch"); // to call the AI API
const cors = require("cors"); // allows frontend to talk to backend
const app = express();

app.use(cors());
app.use(express.json());

// Replace this with your actual API key
const API_KEY = "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";

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Example call to an AI API (like OpenAI)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    res.json({ reply: botReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error contacting AI" });
  }
});

app.listen(3000, () => console.log("Backend running on port 3000"));